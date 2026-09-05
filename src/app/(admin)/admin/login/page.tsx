"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/(admin)/admin/actions";

export default function LoginPage() {
  const [error, action, pending] = useActionState(loginAction, null);

  return (
    <div className="grid min-h-screen place-items-center p-4">
      <form
        action={action}
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-sm ring-1 ring-sand-300"
      >
        <div className="brand-rule mb-4 h-1 rounded" />
        <h1 className="text-lg font-semibold text-maroon-700">Content manager</h1>
        <p className="mt-1 text-sm text-ink-500">
          Sign in to update the society&apos;s website.
        </p>

        <label className="mt-5 block text-sm font-medium text-ink-900">
          Password
          <input
            name="password"
            type="password"
            required
            autoFocus
            className="mt-1 w-full rounded border border-sand-300 px-3 py-2"
          />
        </label>

        {error && <p className="mt-2 text-sm text-maroon-700">{error}</p>}

        <button
          disabled={pending}
          className="mt-4 w-full rounded bg-maroon-600 px-4 py-2.5 font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
