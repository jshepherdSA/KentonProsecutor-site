# Backend & Compliance Checklist — Kenton County Commonwealth's Attorney (Rob Sanders)

Status key: [x] done · [~] pending (builds after homepage approval) · [ ] manual

_Status as of the homepage gate — 2026-09-18._

## Auto-built by the skill (verify these rendered)

- [~] **Privacy Policy** — page at `/privacy`, linked in footer (footer link in place; page builds after approval)
- [~] **Accessibility Statement** — page at `/accessibility`, linked in footer (footer link in place)
- [~] **Cookie Policy** — page at `/cookies`, linked in footer (footer link in place)
- [~] **Cookie consent banner** — functional: blocks GA/GTM until consent,
      suppresses on decline, remembers choice; "Cookie settings" footer link
- [~] **llms.txt** — at site root, lists key pages + policies
- [~] **robots.txt** — exists AND allows AI crawlers (GPTBot, ClaudeBot,
      PerplexityBot, Google-Extended) plus normal search crawlers
- [~] **sitemap.xml** — generated, referenced in robots.txt

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
