import { redirect } from "next/navigation";
import { isSignedIn } from "@/lib/auth";

/** Every admin page starts with this: guard, then a titled panel. */
export async function guard() {
  if (!(await isSignedIn())) redirect("/admin/login");
}

export function Screen({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h1 className="text-xl font-semibold text-maroon-700">{title}</h1>
      {intro && <p className="mt-1 max-w-2xl text-sm text-ink-500">{intro}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}
