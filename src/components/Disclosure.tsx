import { Txt } from "@/components/Txt";
import type { L, OrgProfile } from "@/lib/types";

/**
 * Statutory disclosure (requirements doc, s.9). The full block is mandatory in
 * the footer of EVERY page and in full on Home and Contact. Registration number
 * and registrar address come from the CMS; until the client supplies them the
 * text says so explicitly rather than showing a fake number.
 */
export function disclosureText(org: OrgProfile): L {
  const reg = org.registrationNo ?? "[registration number to be confirmed]";
  const regMr = org.registrationNo ?? "[नोंदणी क्रमांक निश्चित होणे बाकी]";
  return {
    en: `${org.name.en} is registered under the ${org.state} Co-operative Societies Act, 1960 (Registration No. ${reg}) and is regulated by the Registrar of Co-operative Societies. It is not a bank, is not licensed or regulated by the Reserve Bank of India, and deposits held with it are not insured by the Deposit Insurance and Credit Guarantee Corporation (DICGC).`,
    mr: `${org.name.mr} ही ${org.state} सहकारी संस्था अधिनियम, १९६० अंतर्गत नोंदणीकृत (नोंदणी क्रमांक ${regMr}) असून सहकारी संस्था निबंधक यांच्या नियंत्रणाखाली आहे. ही बँक नाही, भारतीय रिझर्व्ह बँकेकडून परवानाप्राप्त अथवा नियंत्रित नाही, आणि येथील ठेवी डिपॉझिट इन्शुरन्स अँड क्रेडिट गॅरंटी कॉर्पोरेशन (DICGC) मार्फत विमासंरक्षित नाहीत.`,
  };
}

const shortText: L = {
  en: "A credit co-operative society registered with the Registrar of Co-operative Societies. Not a bank; not regulated by the RBI; deposits are not DICGC-insured.",
  mr: "सहकारी संस्था निबंधकांकडे नोंदणीकृत सहकारी पतसंस्था. ही बँक नाही; रिझर्व्ह बँकेच्या नियंत्रणाखाली नाही; ठेवी DICGC विमासंरक्षित नाहीत.",
};

export function DisclosureShort({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-ink-500 ${className}`}>
      <Txt v={shortText} />
    </p>
  );
}

export function DisclosureFull({
  org,
  tone = "light",
}: {
  org: OrgProfile;
  tone?: "light" | "dark";
}) {
  const text = disclosureText(org);
  const styles =
    tone === "dark"
      ? "border-saffron-500/40 bg-maroon-900/40 text-sand-200"
      : "border-saffron-300 bg-sand-100 text-ink-700";
  return (
    <aside
      aria-label="Statutory disclosure"
      className={`rounded-lg border-l-4 px-4 py-3 text-xs leading-relaxed sm:text-[13px] ${styles}`}
    >
      <Txt v={text} />
    </aside>
  );
}
