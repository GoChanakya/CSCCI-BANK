import type { L } from "@/lib/types";

/** UI chrome strings (nav, buttons, labels). Page copy lives in the CMS. */
export const t = {
  home: { en: "Home", mr: "मुख्यपृष्ठ" },
  about: { en: "About Us", mr: "आमच्याविषयी" },
  mission: { en: "Our Mission", mr: "आमचे ध्येय" },
  vision: { en: "Our Vision", mr: "आमचे उद्दिष्ट" },
  chairman: { en: "Chairman's Message", mr: "अध्यक्षांचा संदेश" },
  board: { en: "Board of Directors", mr: "संचालक मंडळ" },
  achievements: { en: "Achievements", mr: "यशोगाथा" },
  gallery: { en: "Gallery", mr: "छायाचित्र दालन" },
  schemes: { en: "Schemes", mr: "योजना" },
  depositSchemes: { en: "Deposit Schemes", mr: "ठेव योजना" },
  loanSchemes: { en: "Loan Schemes", mr: "कर्ज योजना" },
  services: { en: "Services & Fees", mr: "सेवा व शुल्क" },
  downloads: { en: "Downloads", mr: "डाउनलोड" },
  privacy: { en: "Privacy Policy", mr: "गोपनीयता धोरण" },
  accessibility: { en: "Accessibility / Assisted Services", mr: "सुलभता व सहाय्यक सेवा" },
  appDownload: { en: "App Download", mr: "अ‍ॅप डाउनलोड" },
  securedAssets: { en: "Info of Secured Assets", mr: "तारण मालमत्ता माहिती" },
  annualReports: { en: "Annual Reports", mr: "वार्षिक अहवाल" },
  contact: { en: "Contact Us", mr: "संपर्क" },

  memberLogin: { en: "Member Enquiry", mr: "सभासद चौकशी" },
  becomeMember: { en: "Become a Member", mr: "सभासद व्हा" },
  enquire: { en: "Enquire about this scheme", mr: "या योजनेबद्दल चौकशी करा" },
  knowMore: { en: "Know more", mr: "अधिक माहिती" },
  eligibility: { en: "Eligibility", mr: "पात्रता" },
  rate: { en: "Return / interest", mr: "परतावा / व्याज" },
  rateOnRequest: {
    en: "Current rate available at the society office",
    mr: "सध्याचा दर पतसंस्थेच्या कार्यालयात उपलब्ध",
  },
  toBeAnnounced: { en: "To be announced", mr: "लवकरच जाहीर होईल" },
  awaitingClientData: {
    en: "This information will be published once confirmed by the society.",
    mr: "ही माहिती पतसंस्थेकडून निश्चित झाल्यावर प्रसिद्ध केली जाईल.",
  },

  officeHours: { en: "Office hours", mr: "कार्यालयीन वेळ" },
  helpline: { en: "Helpline", mr: "हेल्पलाइन" },
  headOffice: { en: "Head Office", mr: "मुख्य कार्यालय" },
  departments: { en: "Departments", mr: "विभाग" },
  name: { en: "Name", mr: "नाव" },
  email: { en: "Email", mr: "ईमेल" },
  phone: { en: "Phone", mr: "दूरध्वनी" },
  whatsapp: { en: "Message us on WhatsApp", mr: "व्हॉट्सअ‍ॅपवर संदेश पाठवा" },
  findUs: { en: "Search our office on Google Maps", mr: "गुगल मॅपवर आमचे कार्यालय शोधा" },
  search: { en: "Search", mr: "शोधा" },

  footerAbout: { en: "About", mr: "संस्थेविषयी" },
  footerMembers: { en: "Members", mr: "सभासद" },
  footerSupport: { en: "Support", mr: "मदत" },
  footerLegal: { en: "Legal", mr: "कायदेशीर" },

  coreValues: { en: "Our Core Values", mr: "आमची मूल्ये" },
  transparency: { en: "Transparency", mr: "पारदर्शकता" },
  transparencyBody: {
    en: "Accounts, rates and decisions are placed before members in plain language, every year.",
    mr: "हिशोब, दर व निर्णय दरवर्षी सभासदांसमोर सोप्या भाषेत मांडले जातात.",
  },
  trust: { en: "Trust", mr: "विश्वास" },
  trustBody: {
    en: "Money raised from teachers is lent back to teachers, and stays within the community.",
    mr: "शिक्षकांकडून जमा झालेला निधी शिक्षकांनाच दिला जातो व समुदायातच राहतो.",
  },
  credibility: { en: "Credibility", mr: "विश्वासार्हता" },
  credibilityBody: {
    en: "The society is registered and audited under the co-operative societies framework.",
    mr: "पतसंस्था सहकारी संस्था कायद्यांतर्गत नोंदणीकृत असून लेखापरीक्षणाधीन आहे.",
  },
  oneness: { en: "Oneness", mr: "एकजूट" },
  onenessBody: {
    en: "One member, one vote — the society belongs equally to everyone who joins it.",
    mr: "एक सभासद, एक मत — पतसंस्था प्रत्येक सभासदाची समान मालकीची आहे.",
  },

  chatGreeting: {
    en: "Namaskar! Let me know if you have any questions.",
    mr: "नमस्कार! काही प्रश्न असल्यास जरूर विचारा.",
  },
  chatAsk: { en: "I have a question", mr: "मला प्रश्न विचारायचा आहे" },
  chatNo: { en: "No, thanks", mr: "नको, धन्यवाद" },

  enquiryTitle: { en: "Member enquiry", mr: "सभासद चौकशी" },
  enquiryIntro: {
    en: "Verify your mobile number and our manager will call you back. Nothing is opened online — this only starts a conversation.",
    mr: "आपला मोबाइल क्रमांक पडताळा, आमचे व्यवस्थापक आपल्याला संपर्क करतील. ऑनलाइन काहीही उघडले जात नाही — ही केवळ चौकशी आहे.",
  },
  phoneLabel: { en: "Mobile number", mr: "मोबाइल क्रमांक" },
  sendOtp: { en: "Send OTP", mr: "ओटीपी पाठवा" },
  otpLabel: { en: "Enter the 6-digit OTP", mr: "६ अंकी ओटीपी टाका" },
  verify: { en: "Verify", mr: "पडताळा" },
  yourName: { en: "Your name", mr: "आपले नाव" },
  interestedIn: { en: "Interested in", mr: "कशाबद्दल चौकशी" },
  noteLabel: { en: "Anything else (optional)", mr: "इतर काही (ऐच्छिक)" },
  submit: { en: "Submit enquiry", mr: "चौकशी पाठवा" },
  thanks: {
    en: "Thank you. Our manager has your details and will contact you.",
    mr: "धन्यवाद. आपली माहिती व्यवस्थापकांपर्यंत पोहोचली आहे, ते आपल्याशी संपर्क करतील.",
  },
  close: { en: "Close", mr: "बंद करा" },
} satisfies Record<string, L>;
