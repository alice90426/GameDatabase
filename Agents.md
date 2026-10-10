# Project Positioning

This is a **professional portfolio for hiring managers and recruiters** (game math / probability engineer roles). Freelance and studio collaboration is a secondary audience.

The site is no longer a storefront for selling game models. Game data is **evidence of capability**, not a product catalog.

Primary question every page must answer within ~10 seconds:
"Can this person design, validate and document slot math models at production level?"

## Key Facts and Numbers

- Experience level is what matters, not exact counts. Use floor-style figures with a plus sign: "9+ years", "65+ shipped commercial games".
- Do NOT list the names or IDs of shipped games, and do not mark individual games as shipped (copyright / confidentiality). Only the aggregate number may appear.
- The game catalog grows over time. Never hardcode catalog figures (game count, RTP range, etc.) in copy; compute them from `src/data/games.json` (see `getGameStats()` in `src/lib/games.ts`). In i18n strings use a `{count}` placeholder.
- Catalog entries include shipped projects and offline research games. Describe the catalog as "playable models"; do not call all of it "commercial" or "shipped".
- Other claims that may be stated: projects have passed GLI and BMM certification; 1 billion simulation rounds per model with RTP error below 0.1%; 5+ years of cross-country freelance work.

## Content Areas

### Games
Purpose: Prove hands-on capability with real, inspectable data.
Audience: Hiring managers who want to verify depth; clients evaluating quality.
Focus:
- Summary stats at the top, computed from data (count, RTP range)
- Model catalog with RTP, Hit Rate, Volatility, Max Win, board and line mechanic
- Simulation data and game specification documents as proof of method
- Playable demos
- Do NOT frame as "buy these models"; a short "work with me" link is enough

### Research
Purpose: Show analytical thinking on existing games.
Audience: Recruiters, hiring managers, readers evaluating analysis ability.
Games = models and data I created or prepared.
Research = analysis, observations and notes about other existing games.
Focus:
- Playtest notes, mechanic analysis, probability observations, reward system analysis
- Slot and non-slot research
- Featured notes first, then filterable list; each note needs a quick takeaway

### Services
Purpose: Secondary page for freelance / studio collaboration.
Audience: Studios, clients, partners.
Focus:
- Slot math model design, probability analysis, simulation validation, specification documents
- Deliverables, process, FAQ
Do not present frontend development or playable prototype development as a service.
Do not make this the main message of the site.

### About
Purpose: Let recruiters evaluate the person quickly.
Audience: Recruiters and hiring managers.
Focus:
- Role, years of experience, key outcomes (shipped games, certifications)
- Concise career timeline
- CV download, LinkedIn, email as the primary actions
- External resources: Blogger, Notion, GitHub, itch.io
- One contact block only; no long resume text

### Home
A short hiring-oriented summary: positioning, key numbers, selected work, featured research, one contact block.
Do not repeat the full process section that already lives in Services.

## Navigation

Home
Games
Research
Services
About

Tutorial articles and tools are reached from Home, Research and Services, not from the main navigation.

## Design Principles

- Professional
- Technical
- Data-driven
- Concise
- Mobile friendly
- Dark professional style
- Key takeaway first, detail second
- Say each claim once per page; avoid repeating the same stats across sections

Avoid:
- Publishing step-by-step methodology or case studies that teach the work for free; playable demos and data are the explanation, not walkthroughs
- Exposing demo URLs as standalone pages or deep links; demos open inside the site only
- Casino advertisement style
- Excessive animations
- Long resume pages
- Skill progress bars
- Selling language ("buy", "purchase", pricing tables)
- Presenting demos or frontend development as the main service

## Language

All user-facing copy lives in `src/lib/i18n.ts` for both `zh` and `en`. Change both together and keep numbers identical.
