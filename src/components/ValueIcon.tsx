type ValueIconName = "transparency" | "trust" | "credibility" | "oneness";

/** Quiet line icons for the values cards, keeping the visual language practical. */
export function ValueIcon({
  name,
  className = "",
}: {
  name: ValueIconName;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: `h-5 w-5 ${className}`,
    "aria-hidden": true,
  };

  if (name === "transparency") {
    return (
      <svg {...common}>
        <path d="M2.5 12s3.3-5 9.5-5 9.5 5 9.5 5-3.3 5-9.5 5-9.5-5-9.5-5Z" />
        <circle cx="12" cy="12" r="2.2" />
      </svg>
    );
  }

  if (name === "trust") {
    return (
      <svg {...common}>
        <path d="m12 3 7 3v5.1c0 4.4-2.8 7.5-7 9.9-4.2-2.4-7-5.5-7-9.9V6l7-3Z" />
        <path d="m8.8 11.9 2.1 2.1 4.5-4.5" />
      </svg>
    );
  }

  if (name === "credibility") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="m8.5 12 2.3 2.3 4.7-4.7" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="7" cy="8" r="2.2" />
      <circle cx="17" cy="8" r="2.2" />
      <circle cx="12" cy="16" r="2.2" />
      <path d="m8.8 9.6 1.8 3.2M15.2 9.6l-1.8 3.2M9.1 8h5.8" />
    </svg>
  );
}
