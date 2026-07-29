/**
 * Long-form SERP-calibrated content for product pages.
 * One file per product slug; rendered by ProductPageContent between
 * the benefits grid and the FAQ section.
 */

export interface ProductContentSection {
  /** Question-led H2, each a distinct entity */
  h: string;
  /** Paragraphs of body copy */
  body: string[];
}

export interface ProductLongForm {
  /** Opening paragraphs rendered under the section heading */
  intro: string[];
  /** 6-8 question-led sections */
  sections: ProductContentSection[];
  /** Replacement FAQ set answering the People Also Ask questions */
  faqs?: Array<{ q: string; a: string }>;
}
