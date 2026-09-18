# Backend & Compliance Checklist — Kenton County Commonwealth's Attorney (Rob Sanders)

Status key: [x] done · [~] pending (builds after homepage approval) · [ ] manual

_Status after building all content pages — 2026-09-18. Policy pages and the cookie banner were deferred at the client's request._

## Auto-built by the skill (verify these rendered)

- [~] **Privacy Policy** — page at `/privacy` — **deferred** (needs legal name, email, effective date)
- [~] **Accessibility Statement** — page at `/accessibility` — **deferred**
- [~] **Cookie Policy** — page at `/cookies` — **deferred**
- [~] **Cookie consent banner** — **deferred**. No GA/GTM is installed yet, so
      nothing currently sets tracking cookies. Build before adding analytics.
- [x] **llms.txt** — `/llms.txt`, lists key pages (add policy links when built)
- [x] **robots.txt** — `app/robots.ts`; allows all crawlers incl. GPTBot, ClaudeBot,
      PerplexityBot, Google-Extended; references the sitemap
- [x] **sitemap.xml** — `app/sitemap.ts`; all pages, staff bios, and 89 news posts

## Manual setup (human does these in Google — skill cannot)

- [ ] **Google Analytics** — create property, paste Measurement ID into the
      site's analytics config. Must be wired through the consent banner
      so it only fires after consent.
- [ ] **Google Tag Manager** — create container, paste GTM container ID.
      Also gated by consent.
- [ ] **Google Search Console** — verify the property (via DNS or the
      verification meta tag), then submit the sitemap.xml URL.

## Notes for handoff
- The three Google items require dashboard access and account setup, so they
  stay manual by design. The skill leaves clearly-marked config slots for the
  GA Measurement ID and GTM container ID so paste-in is the only step.
- Consent gating will be wired so that, once the IDs are pasted, GA/GTM
  respect the banner automatically. Do not add GA/GTM via a raw `<script>` tag
  that bypasses the consent gate.
- **Needs input before policy pages:** legal entity name, contact email, and
  effective date for the policy templates.
- **Flag for review:** this is a government office site, so the generic
  accessibility statement template should get human/legal review.
