import html, json, re, subprocess, datetime, os
APP='/Users/jasshep/projects/kenton-prosecutor site/kenton-prosecutor'
IDS="4zk4yGu 49foTRL 3QSdRM0 4tXrXtC 4ctbZ3q 47EHI00 4kXKFOF 4nuIgLw 4obiTim".split()
MONTHS='January February March April May June July August September October November December'.split()
SEAL='6721d687-0107-475c-896c-96e10de0680e'
os.makedirs(f'{APP}/public/images/press', exist_ok=True)

BLOCK = r'p|div|td|tr|table|h[1-6]|li|ul|ol|br'


def lines_of(s):
    """Text blocks. Block tags end a line; inline tags (e.g. the <sup> in
    "2<sup>nd</sup> Degree") are dropped so sentences stay intact."""
    s = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', s, flags=re.S)
    s = re.sub(rf'</?(?:{BLOCK})\b[^>]*>', '\n', s)
    s = re.sub(r'<[^>]+>', '', s)
    s = html.unescape(s).replace('\u200b', '').replace('\ufeff', '')
    out = []
    for l in s.split('\n'):
        l = re.sub(r'\s+', ' ', l).strip()
        if l:
            out.append(l)
    return out


DROP=re.compile(r"^(FOR IMMEDIATE RELEASE|\*+ ?FOR IMMEDIATE RELEASE ?\*+|Unsubscribe|Update Profile|Constant Contact Data Notice|Commonwealth's Attorney Office|1840 Simon Kenton|Suite 2300|Covington, KY 41011|Sent by|Try email marketing|This email was sent|Privacy Policy|US|\|)$", re.I)

def slugify(t):
    return re.sub(r'-+','-',re.sub(r'[^a-z0-9]+','-',t.lower())).strip('-')[:90]

posts=json.load(open(f'{APP}/content/posts.json'))
existing={p['slug'] for p in posts}
added=[]
for i in IDS:
    raw=open(f'cc_{i}.html', encoding='utf8', errors='ignore').read()
    ls=[l for l in lines_of(raw) if not DROP.match(l)]
    seen=set(); ordered=[]
    for l in ls:
        if l in seen: continue
        seen.add(l); ordered.append(l)
    # rejoin "CITY" datelines with the sentence that follows
    merged=[]
    for l in ordered:
        if merged and l.startswith('- ') and len(merged[-1])<40 and merged[-1].isupper():
            merged[-1]=merged[-1].rstrip('-').strip()+' '+l
        else:
            merged.append(l)
    title=next(l for l in merged if 20<len(l)<170)
    body=[b for b in merged if len(b)>80 and b!=title
          and not b.startswith('For additional information')]
    dates=[datetime.date(int(m.group(3)), MONTHS.index(m.group(1))+1, int(m.group(2)))
           for m in re.finditer(r'(%s)\s+(\d{1,2}),\s*(20\d\d)'%'|'.join(MONTHS), ' '.join(body))]
    dates=[d for d in dates if d<=datetime.date(2026,9,21)]
    date=str(max(dates)) if dates else None
    slug=slugify(title)
    assert slug not in existing, slug
    # per-release photo = the non-seal image
    img=None
    for u in re.findall(r'<img[^>]+src="(https://files\.constantcontact\.com[^"]+)"', raw):
        if SEAL in u: continue
        name=f"{slug[:60]}.jpg"
        if subprocess.run(['curl','-sfL',u,'-o',f'{APP}/public/images/press/{name}']).returncode==0:
            img=f'/images/press/{name}'
        break
    html_body=''.join(f'<p>{html.escape(p, quote=False)}</p>' for p in body)
    html_body+=(f'<p><em>For additional information, contact Rob Sanders at '
                f'(859) 292-6580 or <a href="mailto:rsanders@prosecutors.ky.gov">rsanders@prosecutors.ky.gov</a>. '
                f'<a href="https://conta.cc/{i}" target="_blank" rel="noopener">View the original release</a>.</em></p>')
    excerpt=re.sub(r'^[A-Z ]+-\s*','',body[0])[:260].rsplit(' ',1)[0]+'…'
    added.append(dict(slug=slug, date=date, title=title, excerpt=excerpt,
                      categories=['Media/Press Releases','Press Room'],
                      image=img, html=html_body))
    print(f"{date}  {slug[:58]:60s} paras={len(body)} img={'y' if img else 'n'}")
posts=added+posts
posts.sort(key=lambda p: p['date'], reverse=True)
json.dump(posts, open(f'{APP}/content/posts.json','w'), indent=1, ensure_ascii=False)
print('total posts:', len(posts))
