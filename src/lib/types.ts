/** Bilingual string. Marathi is first-class, not an afterthought. */
export type L = { en: string; mr: string };

export type Lang = "en" | "mr";

/**
 * Any value the client has not supplied yet is stored as `null` and never
 * rendered on the public site (requirements doc, s.6: "Do not launch any page
 * with placeholder financial or contact data visible to the public").
 */
export type Pending<T> = T | null;

export type Scheme = {
  id: string;
  kind: "deposit" | "loan";
  name: L;
  description: L;
  eligibility: Pending<L>;
  /** e.g. "6.50% p.a." — hidden entirely until the client supplies it. */
  rate: Pending<string>;
  icon: string;
  order: number;
  active: boolean;
};

export type Service = {
  id: string;
  title: L;
  description: L;
  imageUrl: string;
  order: number;
  active: boolean;
};

export type FeeRow = {
  id: string;
  service: L;
  fee: Pending<string>;
  conditions: Pending<L>;
};

export type BoardMember = {
  id: string;
  name: string;
  designation: L;
  photoUrl: Pending<string>;
  order: number;
};

export type Achievement = {
  id: string;
  year: string;
  title: L;
  description: L;
};

export type GalleryItem = {
  id: string;
  url: string;
  caption: L;
  eventTag: string;
  order: number;
};

export type DocCategory =
  | "annual-report"
  | "policy"
  | "secured-assets"
  | "other";

export type DocumentItem = {
  id: string;
  title: L;
  category: DocCategory;
  fileUrl: Pending<string>;
  year: Pending<string>;
};

export type Banner = {
  id: string;
  imageUrl: string;
  heading: L;
  subheading: L;
  order: number;
};

export type Lead = {
  id: string;
  name: string;
  phone: string;
  schemeInterest: string;
  note?: string;
  createdAt: string;
  status: "new" | "contacted" | "closed";
};

/** One row of the departments/contact directory, grouped by role on the page. */
export type DirectoryContact = {
  id: string;
  role: L;
  name: Pending<string>;
  email: Pending<string>;
  phone: Pending<string>;
};

/** Free-text blocks the manager edits (mission, vision, chairman's message…). */
export type TextBlock = {
  slug: string;
  label: string;
  heading: L;
  body: L;
};

export type OrgProfile = {
  name: L;
  shortName: L;
  tagline: L;
  registrationNo: Pending<string>;
  state: string;
  registrarAddress: Pending<L>;
  address: Pending<L>;
  phone: Pending<string>;
  helpline: Pending<string>;
  whatsapp: Pending<string>;
  email: Pending<string>;
  fax: Pending<string>;
  gst: Pending<string>;
  pan: Pending<string>;
  officeHours: L;
  mapQuery: Pending<string>;
  appAndroidUrl: Pending<string>;
  appIosUrl: Pending<string>;
};

export type SiteContent = {
  org: OrgProfile;
  banners: Banner[];
  schemes: Scheme[];
  services: Service[];
  fees: FeeRow[];
  board: BoardMember[];
  achievements: Achievement[];
  gallery: GalleryItem[];
  documents: DocumentItem[];
  directory: DirectoryContact[];
  blocks: TextBlock[];
};
