import type { SiteContent } from "@/lib/types";

/**
 * Seed content. Every financial figure and contact detail is `null` on purpose —
 * the client supplies these through the CMS before go-live. Copy deliberately
 * avoids the word "bank": this is a credit co-operative society, not an
 * RBI-licensed bank (requirements doc, s.2).
 */
export const seed: SiteContent = {
  org: {
    name: {
      en: "Chhatrapati Shivaji Co-operative Credit Institution",
      mr: "छत्रपती शिवाजी सहकारी पतसंस्था",
    },
    shortName: { en: "CSCCI", mr: "पतसंस्था" },
    tagline: {
      en: "A teachers' credit co-operative serving Kolhapur",
      mr: "कोल्हापूरातील शिक्षकांची सहकारी पतसंस्था",
    },
    registrationNo: null,
    state: "Maharashtra",
    registrarAddress: null,
    address: null,
    phone: null,
    helpline: "1800 000 0000",
    whatsapp: null,
    email: null,
    fax: null,
    gst: null,
    pan: null,
    officeHours: {
      en: "Monday to Saturday, 10:00 am – 5:30 pm. Closed on the second and fourth Saturday and on public holidays.",
      mr: "सोमवार ते शनिवार, सकाळी १०:०० ते सायं ५:३०. दुसरा व चौथा शनिवार आणि सार्वजनिक सुट्ट्या बंद.",
    },
    mapQuery: null,
    appAndroidUrl: null,
    appIosUrl: null,
  },

  banners: [
    {
      id: "b1",
      imageUrl: "/img/banner-founder.svg",
      heading: {
        en: "In the spirit of Chhatrapati Shivaji Maharaj",
        mr: "छत्रपती शिवाजी महाराजांच्या प्रेरणेने",
      },
      subheading: {
        en: "Self-reliance, trust and service to the teaching community.",
        mr: "स्वावलंबन, विश्वास आणि शिक्षक बांधवांची सेवा.",
      },
      order: 1,
    },
    {
      id: "b2",
      imageUrl: "/img/banner-mission.svg",
      heading: { en: "Our Mission", mr: "आमचे ध्येय" },
      subheading: {
        en: "Affordable credit and disciplined savings for every member.",
        mr: "प्रत्येक सभासदासाठी परवडणारे कर्ज आणि शिस्तबद्ध बचत.",
      },
      order: 2,
    },
    {
      id: "b3",
      imageUrl: "/img/banner-vision.svg",
      heading: { en: "Our Vision", mr: "आमचे उद्दिष्ट" },
      subheading: {
        en: "A financially secure teaching community in Kolhapur district.",
        mr: "कोल्हापूर जिल्ह्यातील आर्थिकदृष्ट्या सक्षम शिक्षक समुदाय.",
      },
      order: 3,
    },
  ],

  schemes: [
    {
      id: "s-savings",
      kind: "deposit",
      name: { en: "Savings Deposit Scheme", mr: "बचत ठेव योजना" },
      description: {
        en: "A day-to-day savings scheme for members, designed to build a regular saving habit with easy deposits and withdrawals at the society office.",
        mr: "सभासदांसाठी दैनंदिन बचत योजना. नियमित बचतीची सवय लागावी यासाठी पतसंस्थेच्या कार्यालयात सहज ठेव व रक्कम काढण्याची सोय.",
      },
      eligibility: {
        en: "Open to all enrolled members of the society.",
        mr: "पतसंस्थेच्या सर्व नोंदणीकृत सभासदांसाठी खुली.",
      },
      rate: null,
      icon: "piggy",
      order: 1,
      active: true,
    },
    {
      id: "s-recurring",
      kind: "deposit",
      name: { en: "Recurring Deposit Scheme", mr: "रिकरिंग ठेव योजना" },
      description: {
        en: "A fixed amount is deposited every month for a chosen term. At maturity the member receives the full deposited amount together with the accrued return.",
        mr: "ठरलेल्या मुदतीसाठी दर महिन्याला ठराविक रक्कम भरली जाते. मुदतीअंती जमा रक्कम व त्यावरील परतावा सभासदास मिळतो.",
      },
      eligibility: {
        en: "Members choosing a term of 12 months or more.",
        mr: "१२ महिने किंवा अधिक मुदत निवडणाऱ्या सभासदांसाठी.",
      },
      rate: null,
      icon: "calendar",
      order: 2,
      active: true,
    },
    {
      id: "s-monthly-income",
      kind: "deposit",
      name: {
        en: "Monthly Income Deposit Scheme",
        mr: "मासिक प्राप्ती ठेव योजना",
      },
      description: {
        en: "A lump-sum deposit that pays the member a return every month, suited to retired members and households that prefer a predictable monthly inflow.",
        mr: "एकरकमी ठेवीवर दरमहा परतावा दिला जातो. निवृत्त सभासद व दरमहा निश्चित रक्कम अपेक्षित असणाऱ्या कुटुंबांसाठी उपयुक्त.",
      },
      eligibility: null,
      rate: null,
      icon: "coins",
      order: 3,
      active: true,
    },
    {
      id: "l-quick",
      kind: "loan",
      name: { en: "Quick-Approval Member Loan", mr: "त्वरित मंजुरी सभासद कर्ज" },
      description: {
        en: "A short-term personal loan for members against their own deposits and salary undertaking, sanctioned quickly with minimal paperwork.",
        mr: "सभासदाच्या स्वतःच्या ठेवी व पगार हमीवर दिले जाणारे अल्पमुदत वैयक्तिक कर्ज. कमी कागदपत्रांत जलद मंजुरी.",
      },
      eligibility: {
        en: "Members in continuous good standing, with the required guarantors.",
        mr: "सातत्याने नियमित असलेले सभासद, आवश्यक जामीनदारांसह.",
      },
      rate: null,
      icon: "bolt",
      order: 4,
      active: true,
    },
    {
      id: "l-home",
      kind: "loan",
      name: { en: "Home Construction Loan", mr: "घरबांधणी कर्ज" },
      description: {
        en: "A longer-tenure loan to help members build, extend or repair a home, repayable in monthly instalments against approved security.",
        mr: "सभासदांना घर बांधणे, विस्तार करणे किंवा दुरुस्तीसाठी दीर्घ मुदतीचे कर्ज. मान्यताप्राप्त तारणावर मासिक हप्त्यांत परतफेड.",
      },
      eligibility: null,
      rate: null,
      icon: "home",
      order: 5,
      active: true,
    },
  ],

  services: [
    {
      id: "sv-emi",
      title: {
        en: "0% EMI — Equipment Finance for Education",
        mr: "०% हप्ता — शैक्षणिक साहित्य वित्तपुरवठा",
      },
      description: {
        en: "Members can obtain teaching and learning equipment — laptops, tablets and classroom devices — and repay in equal monthly instalments with no interest component added by the society.",
        mr: "सभासदांना लॅपटॉप, टॅबलेट व वर्गोपयोगी साधने उपलब्ध. पतसंस्थेकडून व्याज न आकारता समान मासिक हप्त्यांत परतफेड.",
      },
      imageUrl: "/img/service-emi.svg",
      order: 1,
      active: true,
    },
    {
      id: "sv-card",
      title: {
        en: "ATM / Debit Card Facility",
        mr: "एटीएम / डेबिट कार्ड सुविधा",
      },
      description: {
        en: "Card issuance for members, usable for withdrawal, transfer and e-commerce payments through the society's sponsoring partner network.",
        mr: "सभासदांसाठी कार्ड वितरण — रक्कम काढणे, हस्तांतरण व ई-कॉमर्स व्यवहारांसाठी भागीदार नेटवर्कमार्फत वापरता येते.",
      },
      imageUrl: "/img/service-card.svg",
      order: 2,
      active: true,
    },
    {
      id: "sv-locker",
      title: { en: "Locker Facility", mr: "लॉकर सुविधा" },
      description: {
        en: "Safe deposit lockers at the head office in several sizes, with size-based annual charges and nominee registration at the time of allotment.",
        mr: "मुख्य कार्यालयात विविध आकारांचे सुरक्षित लॉकर. आकारानुसार वार्षिक शुल्क व वाटपाच्या वेळी वारसनोंद.",
      },
      imageUrl: "/img/service-locker.svg",
      order: 3,
      active: true,
    },
  ],

  fees: [
    {
      id: "f1",
      service: { en: "Membership enrolment", mr: "सभासद नोंदणी" },
      fee: null,
      conditions: null,
    },
    {
      id: "f2",
      service: { en: "Locker rent (per year)", mr: "लॉकर भाडे (वार्षिक)" },
      fee: null,
      conditions: null,
    },
    {
      id: "f3",
      service: {
        en: "Card issuance / replacement",
        mr: "कार्ड वितरण / पुनर्वितरण",
      },
      fee: null,
      conditions: null,
    },
    {
      id: "f4",
      service: { en: "Duplicate passbook", mr: "दुबार पासबुक" },
      fee: null,
      conditions: null,
    },
  ],

  board: [
    {
      id: "bm1",
      name: "Chairperson — name to be supplied",
      designation: { en: "Chairperson", mr: "अध्यक्ष" },
      photoUrl: null,
      order: 1,
    },
    {
      id: "bm2",
      name: "Vice Chairperson — name to be supplied",
      designation: { en: "Vice Chairperson", mr: "उपाध्यक्ष" },
      photoUrl: null,
      order: 2,
    },
    {
      id: "bm3",
      name: "Chief Executive Officer — name to be supplied",
      designation: {
        en: "Chief Executive Officer",
        mr: "मुख्य कार्यकारी अधिकारी",
      },
      photoUrl: null,
      order: 3,
    },
    {
      id: "bm4",
      name: "Director — name to be supplied",
      designation: { en: "Director", mr: "संचालक" },
      photoUrl: null,
      order: 4,
    },
    {
      id: "bm5",
      name: "Director — name to be supplied",
      designation: { en: "Director", mr: "संचालक" },
      photoUrl: null,
      order: 5,
    },
  ],

  achievements: [
    {
      id: "a1",
      year: "—",
      title: { en: "Awards and recognitions", mr: "पुरस्कार व सन्मान" },
      description: {
        en: "The society's award history will be listed here, newest first, once the client supplies the list.",
        mr: "पतसंस्थेला मिळालेल्या पुरस्कारांची यादी क्लायंटकडून प्राप्त झाल्यावर येथे नवीनतम प्रथम या क्रमाने दिसेल.",
      },
    },
  ],

  gallery: [],

  documents: [
    {
      id: "d-privacy",
      title: { en: "Privacy Policy", mr: "गोपनीयता धोरण" },
      category: "policy",
      fileUrl: null,
      year: null,
    },
    {
      id: "d-secured",
      title: { en: "Info of Secured Assets", mr: "तारण मालमत्ता माहिती" },
      category: "secured-assets",
      fileUrl: null,
      year: null,
    },
    {
      id: "d-ar",
      title: { en: "Annual Report", mr: "वार्षिक अहवाल" },
      category: "annual-report",
      fileUrl: null,
      year: null,
    },
  ],

  directory: [
    {
      id: "dir-ho",
      role: { en: "Head Office", mr: "मुख्य कार्यालय" },
      rows: [{ name: null, email: null, phone: null }],
    },
    {
      id: "dir-ceo",
      role: { en: "Chief Executive Officer", mr: "मुख्य कार्यकारी अधिकारी" },
      rows: [{ name: null, email: null, phone: null }],
    },
    {
      id: "dir-mgr",
      role: { en: "Manager", mr: "व्यवस्थापक" },
      rows: [{ name: null, email: null, phone: null }],
    },
  ],

  blocks: [
    {
      slug: "welcome",
      label: "Home — welcome message",
      heading: {
        en: "Welcome to our society",
        mr: "आमच्या पतसंस्थेत आपले स्वागत आहे",
      },
      body: {
        en: "Chhatrapati Shivaji Co-operative Credit Institution is a credit co-operative society formed by and for teachers in Kolhapur. Members pool their savings, and the society lends those savings back to members on fair terms — for a home, for a family need, or for the equipment a classroom requires. Every rupee stays within the teaching community that raised it.",
        mr: "छत्रपती शिवाजी सहकारी पतसंस्था ही कोल्हापूरातील शिक्षकांनी, शिक्षकांसाठी स्थापन केलेली सहकारी पतसंस्था आहे. सभासदांच्या बचतीतून जमा झालेला निधी घरासाठी, कौटुंबिक गरजेसाठी किंवा वर्गासाठी लागणाऱ्या साहित्यासाठी सभासदांनाच रास्त अटींवर कर्जरूपाने दिला जातो.",
      },
    },
    {
      slug: "mission",
      label: "About — Our Mission",
      heading: { en: "Our Mission", mr: "आमचे ध्येय" },
      body: {
        en: "To provide members of the teaching community with dependable savings schemes and affordable credit, administered transparently and entirely within the co-operative framework.",
        mr: "शिक्षक समुदायातील सभासदांना विश्वासार्ह बचत योजना व परवडणारे कर्ज, पारदर्शक कारभाराद्वारे व संपूर्णतः सहकारी चौकटीत उपलब्ध करून देणे.",
      },
    },
    {
      slug: "vision",
      label: "About — Our Vision",
      heading: { en: "Our Vision", mr: "आमचे उद्दिष्ट" },
      body: {
        en: "A teaching community in Kolhapur district where no member has to turn to an informal lender, and where every household has a planned, secure financial footing.",
        mr: "कोल्हापूर जिल्ह्यातील शिक्षक समुदायातील कोणत्याही सभासदाला सावकाराकडे जाण्याची वेळ येऊ नये आणि प्रत्येक कुटुंब आर्थिकदृष्ट्या नियोजनबद्ध व सुरक्षित असावे.",
      },
    },
    {
      slug: "chairman",
      label: "About — Chairman's Message",
      heading: { en: "Chairman's Message", mr: "अध्यक्षांचा संदेश" },
      body: {
        en: "The final message text and the chairperson's photograph and signature are to be supplied by the client. This block is editable from the content manager.",
        mr: "अध्यक्षांचा अंतिम संदेश, छायाचित्र व स्वाक्षरी क्लायंटकडून प्राप्त होणार आहे. हा मजकूर कंटेंट मॅनेजरमधून बदलता येतो.",
      },
    },
    {
      slug: "history",
      label: "Home — short history",
      heading: { en: "About the society", mr: "पतसंस्थेविषयी" },
      body: {
        en: "Founding year, the story of the society's establishment, membership strength and the branches it serves are to be supplied by the client and will appear here.",
        mr: "स्थापना वर्ष, पतसंस्थेच्या उभारणीची कहाणी, सभासद संख्या व कार्यक्षेत्र क्लायंटकडून प्राप्त झाल्यावर येथे दिसेल.",
      },
    },
    {
      slug: "accessibility",
      label: "Downloads — Accessibility / assisted services",
      heading: { en: "Accessibility and Assisted Services", mr: "सुलभता व सहाय्यक सेवा" },
      body: {
        en: "The society assists members with disabilities and elderly members at the counter, including priority service, assistance in filling forms, and doorstep collection where feasible. Detailed provisions to be confirmed by the client.",
        mr: "दिव्यांग व ज्येष्ठ सभासदांना काउंटरवर प्राधान्य सेवा, अर्ज भरण्यास मदत व शक्य असेल तेथे घरपोच सेवा दिली जाते. सविस्तर तपशील क्लायंटकडून निश्चित होणार.",
      },
    },
    {
      slug: "privacy",
      label: "Downloads — Privacy Policy",
      heading: { en: "Privacy Policy", mr: "गोपनीयता धोरण" },
      body: {
        en: "The final privacy policy text is to be supplied by the client. It should cover what member information the society collects, how it is stored, who it is shared with, and how a member can request correction or deletion.",
        mr: "अंतिम गोपनीयता धोरण क्लायंटकडून प्राप्त होणार आहे. त्यात कोणती माहिती घेतली जाते, ती कशी साठवली जाते, कोणासोबत सामायिक केली जाते व दुरुस्ती अथवा रद्द करण्याची प्रक्रिया नमूद असावी.",
      },
    },
  ],
};
