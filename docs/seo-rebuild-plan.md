# Tradesman Finance SEO Rebuild Plan

_Generated 2026-07-29. Data sources: Google Search Console export (Mar-Jun 2026), DataForSEO Google Ads volume (UK, loc 2826), live SERP pulls (seo/briefs/, seo/entities/)._

## Diagnosis: why the site gets no traffic

**Totals (last 3 months): 149 clicks, 54,710 impressions, ~7 referring domains.**

1. **The site is built around keywords that do not exist.** Verified UK monthly volumes:
   - "tradesman finance" 10, "finance for tradesmen" 10, "tradesman loans" 10
   - "electrician finance" 0, "plumber finance" 0, "roofer finance" 0, "landscaper finance" 0
   - "plumber business loan" 10, "electrician business loan" 10
   - "equipment finance manchester" 0, "business loans cambridge" 0
   The 11,700 trade-by-town pages (e.g. /trades/locations/bedfordshire/dunstable/plumber) target
   permutations of these zero-volume terms.

2. **Intent mismatch on the programmatic pages.** GSC shows the location pages surfacing for
   service-intent queries ("certified locksmith downham market", "demolition contractors berkhamsted",
   "commercial air conditioning walton on the naze") where a finance page can never satisfy the click.
   96 of 149 clicks came from these pages, mostly accidental.

3. **Authority cannot support the index.** 7 referring domains (mostly podcast directories) spread
   across 12,000+ near-duplicate pages. Crawl budget and internal PageRank are diluted to nothing.

4. **The real demand is in product terms the site ranks poorly for:**
   | Keyword | UK vol/mo | CPC | Current position |
   |---|---|---|---|
   | van finance | 6,600 | £15.30 | not ranking |
   | start up business loans | 6,600 | £12.59 | not ranking |
   | hire purchase | 5,400 | £7.34 | not ranking |
   | invoice finance | 1,900 | £91.41 | ~38 |
   | asset finance | 1,900 | £46.62 | not ranking |
   | unsecured business loans | 1,600 | £94.22 | not ranking |
   | merchant cash advance | 1,300 | £42.32 | new page |
   | invoice factoring | 1,300 | £144.77 | not ranking |
   | sole trader business loan | 880 | £20.32 | not ranking |
   | tool finance / tools on finance | 1,180 | £2.52 | ~21-29 |
   | boiler finance | 720 | £25.10 | ~23 (via town pages) |
   | scaffolding finance | 110 | £28.85 | ~60 |

## Architecture recommendation (Benner entity methodology)

The site is a pure pSEO play with no physical premises, so under the "true statement" rule the
homepage is correctly optimised for the United Kingdom entity. The error is downstream: the
sub-page decision rule says location sub-pages are only built where (a) real query demand exists and
(b) the parent page fails to rank for it. Here neither condition holds; the location layer was built
first and demand never checked.

**Recommended actions (require sign-off, see below):**

1. **Retire the trade-by-town layer (~11,700 pages).** 410 (or noindex then remove) every
   /trades/locations/[county]/[town]/[trade] page. They target zero-volume queries, attract
   mismatched impressions, and dilute the site.
2. **Retire or consolidate the town index pages (~590).** Same logic. Redirect to the county page.
3. **Keep, for now, the ~50 county pages** as a thin national-coverage layer (they carry the
   "UK-wide" entity signal), or fold them into a single locations page. Optional.
4. **Keep the 20 trade pages** (/trades/electrician etc.). Zero-volume head terms, but they are the
   audience-segmentation layer and support long-tail "van finance for electricians" style queries.
5. **Concentrate the site on the product layer**, rebuilt to SERP-calibrated briefs (this rebuild).
6. **Grow the equipment/brand layer.** GSC already shows real impressions for "makita finance"
   (344 impressions), "festool finance uk" (219), "power tools on finance" (126), "scaffolding
   finance" (306). Brand/equipment finance pages are the site's proven organic surface.
7. **Later, once authority exists:** a small set of "business loans [major city]" pages (20-70/mo
   each for the top 10 cities) is the only location build the data supports.

## Content calibration (DataForSEO engine)

Briefs and consensus term sets generated per money page in `seo/briefs/` and `seo/entities/`:

| Page | Target keyword | Ranker median words | Long-form target |
|---|---|---|---|
| / (home) | finance for tradesmen | ~800 | light touch, already ranks 1-2 |
| /products/vehicle-finance | van finance | 1,882 | 1,400-1,900 added |
| /products/equipment-finance | tool finance | ~2,900 | 1,400-1,900 added |
| /products/business-loans | sole trader business loan | ~1,900 | 1,600-2,200 added |
| /products/invoice-finance | invoice finance | ~3,100 | 1,800-2,400 added |
| /products/asset-finance | asset finance | ~2,200 | 1,600-2,200 added |
| /products/merchant-cash-advance | merchant cash advance | ~3,200 | 1,800-2,400 added |
| /products/cashflow-finance | business cash advance | ~2,100 | 1,400-1,900 added |

Long-form content lives in `src/data/product-content/<slug>.ts` and renders as a question-led H2
guide section on each product page, with FAQ sets answering the live People Also Ask questions.

## The link problem (content cannot fix this alone)

7 referring domains is the binding constraint. Every competitor in the briefs (iwoca, SME Loans,
Merchant Savvy, Kandoo) has hundreds. The content rebuild raises the ceiling; digital PR / link
building raises the floor. Recommend running the journalist-outreach / backlink programmes already
in the portfolio against this domain next.
