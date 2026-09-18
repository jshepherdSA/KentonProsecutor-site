"""Pull kentonprosecutor.org pages + posts via WP REST API, sanitize HTML,
rewrite links to new routes, localize PDFs/images. Writes into the Next app."""
import html, json, os, re, subprocess, sys, urllib.parse
from html.parser import HTMLParser

APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36'
API = 'https://kentonprosecutor.org/wp-json/wp/v2'
os.makedirs(f'{APP}/content', exist_ok=True)
os.makedirs(f'{APP}/public/docs', exist_ok=True)
os.makedirs(f'{APP}/public/images/wp', exist_ok=True)


def fetch(url, out=None):
    args = ['curl', '-sfL', '-A', UA, url]
    if out:
        return subprocess.run(args + ['-o', out]).returncode == 0
    return subprocess.run(args, capture_output=True).stdout


def jget(path):
    return json.loads(fetch(f'{API}/{path}'))


# ---------------------------------------------------------------- routing
ROUTES = {
    '': '/',
    'rob-sanders-home': '/',
    'rob-sanders-home/welcome-to-the-online-office-of-the-kenton-county-commonwealths-attorney': '/about',
    'about': '/about',
    'about/rob-sanders': '/about/rob-sanders',
    'about/staff': '/about/staff',
    'about/contact': '/contact',
    'contact': '/contact',
    'victims-advocate': '/about/victims-advocate',
    'about/victims-advocate': '/about/victims-advocate',
    'about/stephanie-watson': '/about/victims-advocate',
    'detective': '/about/staff',
    'services': '/services',
    'resources': '/resources',
    'resources/law-enforcement-resources': '/resources/law-enforcement',
    'resources/victimrights': '/resources/victim-rights',
    'resources/victim-resources': '/resources/victim-resources',
    'victim-resources': '/resources/victim-resources',
    'resources/student-and-job-opportunities': '/resources/student-and-job-opportunities',
    'resources/student-and-job-opportunities/extern-hall-of-fame': '/resources/hall-of-fame',
    'resources/links': '/resources/links',
    'resources/subpoenas': '/resources/subpoenas',
    'resources/faqs': '/resources/faqs',
    'resources/videos': '/resources/videos',
    'news': '/news',
    'news/newsletter-issues': '/news/newsletter-issues',
    'open-records-policy': '/open-records-policy',
}
POST_SLUGS = set()
STAFF_WITH_BIOS = {'emily-arnzen', 'casey-burns', 'maria-wentz', 'mike-westling'}
ASSETS = {}  # remote url -> local path


def localize_asset(url):
    """Download a wp-content upload and return its local public path."""
    u = url.replace('http://', 'https://')
    if u in ASSETS:
        return ASSETS[u]
    name = urllib.parse.unquote(u.rsplit('/', 1)[-1])
    ext = name.rsplit('.', 1)[-1].lower()
    if ext == 'pdf':
        local = f'/docs/{name}'
        ok = fetch(u, f'{APP}/public{local}')
    else:
        full = re.sub(r'-\d+x\d+(\.\w+)$', r'\1', u)  # prefer original size
        fname = re.sub(r'-\d+x\d+(\.\w+)$', r'\1', name)
        local = f'/images/wp/{fname}'
        ok = fetch(full, f'{APP}/public{local}') or fetch(u, f'{APP}/public{local}')
    ASSETS[u] = local if ok else url  # remote fallback; featured() drops non-local
    if not ok:
        print('  ! asset failed', url, file=sys.stderr)
    return ASSETS[u]


def rewrite_href(href):
    h = html.unescape(href.strip())
    if h.startswith('mailto:') or h.startswith('tel:') or h.startswith('#'):
        return h
    if re.match(r'^[\w.+-]+@[\w-]+\.[\w.]+$', h):  # bare email in href
        return 'mailto:' + h
    m = re.match(r'^https?://(www\.)?kentonprosecutor\.org(/.*)?$', h)
    if not m:
        return h
    path = (m.group(2) or '/').split('#')[0].split('?')[0]
    if '/wp-content/uploads/' in path:
        return localize_asset(h)
    key = path.strip('/')
    if key in ROUTES:
        return ROUTES[key]
    if key.startswith('about/staff/'):
        # Only current staff with real bios get pages; former staff → listing.
        return '/' + key if key.split('/')[-1] in STAFF_WITH_BIOS else '/about/staff'
    if key.startswith('category/') or key.startswith('tag/') or key.startswith('author/'):
        return '/news'
    slug = key.split('/')[-1]
    if slug in POST_SLUGS:
        return f'/news/{slug}'
    print('  ? unmapped link', h, file=sys.stderr)
    return '/'


# ---------------------------------------------------------------- sanitizer
KEEP = {'p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'sup',
        'sub', 'br', 'table', 'thead', 'tbody', 'tr', 'td', 'th', 'blockquote',
        'img', 'iframe', 'hr'}
ALIAS = {'b': 'strong', 'i': 'em'}
VOID = {'br', 'img', 'hr'}


class Clean(HTMLParser):
    def __init__(self, hmap):
        super().__init__(convert_charrefs=False)
        self.out, self.stack, self.hmap, self.skip = [], [], hmap, 0

    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'):
            self.skip += 1
            return
        a = dict(attrs)
        tag = ALIAS.get(tag, tag)
        if tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
            tag = self.hmap.get(tag, 'h4')
        if tag not in KEEP:
            return
        attr = ''
        if tag == 'a':
            if not a.get('href'):
                return
            href = rewrite_href(a['href'])
            ext = href.startswith('http')
            attr = f' href="{html.escape(href)}"' + (' target="_blank" rel="noopener"' if ext else '')
        elif tag == 'img':
            src = a.get('src', '')
            if 'kentonprosecutor.org/wp-content/uploads' in src:
                src = localize_asset(src)
            elif not src.startswith('http'):
                return
            cls = ' class="float-right"' if 'alignright' in a.get('class', '') else (
                ' class="float-left"' if 'alignleft' in a.get('class', '') else '')
            attr = f' src="{html.escape(src)}" alt="{html.escape(html.unescape(a.get("alt", "")))}" loading="lazy"{cls}'
        elif tag == 'iframe':
            src = a.get('src', '')
            m = re.search(r'youtube\.com/embed/([\w-]+)', src)
            if not m:
                return
            self.out.append(f'<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/{m.group(1)}?rel=0" title="Video" allowfullscreen loading="lazy"></iframe></div>')
            return
        elif tag in ('td', 'th') and a.get('colspan'):
            attr = f' colspan="{a["colspan"]}"'
        self.out.append(f'<{tag}{attr}>')
        if tag not in VOID:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.skip = max(0, self.skip - 1)
            return
        tag = ALIAS.get(tag, tag)
        if tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
            tag = self.hmap.get(tag, 'h4')
        if tag in self.stack:
            while self.stack:
                t = self.stack.pop()
                self.out.append(f'</{t}>')
                if t == tag:
                    break

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)

    def handle_data(self, d):
        if not self.skip:
            self.out.append(d)

    def handle_entityref(self, n):
        self.out.append(f'&{n};')

    def handle_charref(self, n):
        self.out.append(f'&#{n};')


def sanitize(raw):
    levels = sorted(set(re.findall(r'<h([1-6])', raw)))
    hmap = {f'h{l}': ['h2', 'h3', 'h4', 'h4', 'h4', 'h4'][i] for i, l in enumerate(levels)}
    c = Clean(hmap)
    c.feed(raw)
    c.close()
    out = ''.join(c.out) + ''.join(f'</{t}>' for t in reversed(c.stack))
    out = out.replace('&nbsp;', ' ').replace(' ', ' ')
    # drop empty blocks / stray <br> at block edges
    for _ in range(3):
        out = re.sub(r'<(p|h2|h3|h4|li|strong|em|a)>(\s|<br>)*</\1>', '', out)
        out = re.sub(r'<p>(\s|<br>)+', '<p>', out)
        out = re.sub(r'(\s|<br>)+</p>', '</p>', out)
    out = re.sub(r'\n{2,}', '\n', out).strip()
    return out


def text(h):
    return html.unescape(re.sub(r'<[^>]+>', '', h)).strip()


# ---------------------------------------------------------------- run
posts_raw = jget('posts?per_page=100&_embed=wp:featuredmedia')
POST_SLUGS.update(p['slug'] for p in posts_raw)
cats = {c['id']: html.unescape(c['name']) for c in jget('categories?per_page=100')}
pages_raw = jget('pages?per_page=100&_embed=wp:featuredmedia')


def featured(p):
    try:
        local = localize_asset(p['_embedded']['wp:featuredmedia'][0]['source_url'])
        return local if local.startswith('/') else None
    except (KeyError, IndexError, TypeError):
        return None


pages = {}
for p in pages_raw:
    pages[p['slug']] = {
        'slug': p['slug'],
        'parent': p['parent'],
        'order': p['menu_order'],
        'title': text(p['title']['rendered']),
        'image': featured(p),
        'html': sanitize(p['content']['rendered']),
    }
    print('page', p['slug'], len(pages[p['slug']]['html']))
json.dump(pages, open(f'{APP}/content/pages.json', 'w'), indent=1, ensure_ascii=False)

posts = []
for p in posts_raw:
    posts.append({
        'slug': p['slug'],
        'date': p['date'][:10],
        'title': re.sub(r'\s+', ' ', text(p['title']['rendered'])),
        'excerpt': re.sub(r'\s*(\[&hellip;\]|…|\.\.\.)\s*$', '…', re.sub(r'\s+', ' ', text(p['excerpt']['rendered']))),
        'categories': [cats.get(c, '') for c in p['categories'] if cats.get(c) and cats.get(c) != 'Blog'],
        'image': featured(p),
        'html': sanitize(p['content']['rendered']),
    })
posts.sort(key=lambda x: x['date'], reverse=True)
json.dump(posts, open(f'{APP}/content/posts.json', 'w'), indent=1, ensure_ascii=False)
print(len(pages), 'pages;', len(posts), 'posts;', len(ASSETS), 'assets')
