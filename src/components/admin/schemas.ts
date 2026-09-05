import type { Field } from "@/components/admin/Editor";

/** Field definitions per collection — the whole CMS is driven from here. */

export const bannerFields: Field[] = [
  { key: "imageUrl", label: "Banner image", type: "image", hint: "Wide photo, at least 1600×900." },
  { key: "heading", label: "Heading", type: "bilingual" },
  { key: "subheading", label: "Sub-heading", type: "bilingual" },
];

export const schemeFields: Field[] = [
  {
    key: "kind",
    label: "Type",
    type: "select",
    options: [
      { value: "deposit", label: "Deposit scheme" },
      { value: "loan", label: "Loan scheme" },
    ],
  },
  { key: "name", label: "Scheme name", type: "bilingual" },
  { key: "description", label: "Description", type: "bilingual-long", hint: "Two to four plain sentences." },
  { key: "eligibility", label: "Eligibility", type: "bilingual", hint: "Who can apply. Leave blank to hide." },
  {
    key: "rate",
    label: "Interest / return rate",
    type: "text",
    clientSupplied: true,
    hint: 'e.g. "6.50% p.a." — while blank, the website says the rate is available at the office.',
  },
  { key: "active", label: "Show on website", type: "boolean" },
];

export const serviceFields: Field[] = [
  { key: "title", label: "Service name", type: "bilingual" },
  { key: "description", label: "Description", type: "bilingual-long" },
  { key: "imageUrl", label: "Photo", type: "image" },
  { key: "active", label: "Show on website", type: "boolean" },
];

export const feeFields: Field[] = [
  { key: "service", label: "Service", type: "bilingual" },
  { key: "fee", label: "Fee", type: "text", clientSupplied: true, hint: 'e.g. "₹250 per year"' },
  { key: "conditions", label: "Conditions", type: "bilingual" },
];

export const boardFields: Field[] = [
  { key: "name", label: "Name", type: "text", clientSupplied: true },
  { key: "designation", label: "Designation", type: "bilingual" },
  { key: "photoUrl", label: "Photograph", type: "image" },
];

export const achievementFields: Field[] = [
  { key: "year", label: "Year", type: "text" },
  { key: "title", label: "Title", type: "bilingual" },
  { key: "description", label: "Description", type: "bilingual-long" },
];

export const galleryFields: Field[] = [
  { key: "url", label: "Photograph", type: "image" },
  { key: "caption", label: "Caption", type: "bilingual", hint: "Also used as the image alt text." },
  { key: "eventTag", label: "Event / album", type: "text", hint: "Photos with the same album name group together." },
];

export const documentFields: Field[] = [
  { key: "title", label: "Document title", type: "bilingual" },
  {
    key: "category",
    label: "Category",
    type: "select",
    options: [
      { value: "annual-report", label: "Annual report" },
      { value: "policy", label: "Policy" },
      { value: "secured-assets", label: "Info of secured assets" },
      { value: "other", label: "Other" },
    ],
  },
  { key: "year", label: "Year", type: "text", hint: 'e.g. "2025-26"' },
  {
    key: "fileUrl",
    label: "PDF file",
    type: "pdf",
    clientSupplied: true,
    hint: "Use a text PDF, not a scan, wherever the original allows it. Documents with no file are not listed on the website.",
  },
];

export const blockFields: Field[] = [
  { key: "heading", label: "Heading", type: "bilingual" },
  { key: "body", label: "Text", type: "bilingual-long", hint: "Leave a blank line between paragraphs." },
];

export const orgFields: Field[] = [
  { key: "name", label: "Institution name", type: "bilingual" },
  { key: "tagline", label: "Tagline", type: "bilingual" },
  {
    key: "registrationNo",
    label: "Registration number",
    type: "text",
    clientSupplied: true,
    hint: "Appears in the statutory disclosure on every page.",
  },
  { key: "state", label: "State", type: "text", hint: "Used in the disclosure — Co-operative Societies Act of this state." },
  { key: "registrarAddress", label: "Registrar's address", type: "bilingual-long", clientSupplied: true },
  { key: "address", label: "Head office address", type: "bilingual-long", clientSupplied: true },
  { key: "phone", label: "Office phone", type: "text", clientSupplied: true },
  { key: "helpline", label: "Helpline number", type: "text", clientSupplied: true },
  { key: "whatsapp", label: "WhatsApp number", type: "text", clientSupplied: true, hint: "10 digits, no +91. Enables the WhatsApp buttons." },
  { key: "email", label: "Email", type: "text", clientSupplied: true },
  { key: "fax", label: "Fax", type: "text", clientSupplied: true },
  { key: "gst", label: "GST number", type: "text", clientSupplied: true },
  { key: "pan", label: "PAN", type: "text", clientSupplied: true },
  { key: "officeHours", label: "Office hours", type: "bilingual-long" },
  { key: "mapQuery", label: "Map search text", type: "text", hint: "What the map should search for by default, e.g. the office address." },
  { key: "appAndroidUrl", label: "Google Play link", type: "text", clientSupplied: true },
  { key: "appIosUrl", label: "App Store link", type: "text", clientSupplied: true },
];
