import type { SVGProps } from "react";

export function SirenIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 12a5 5 0 0 1 5-5v0a5 5 0 0 1 5 5v0a5 5 0 0 1-5 5v0a5 5 0 0 1-5-5Z" />
      <path d="M12 7v-2.5" />
      <path d="M10.5 5.5 8 3" />
      <path d="M13.5 5.5 16 3" />
      <path d="M20 12h2.5" />
      <path d="M4 12H1.5" />
      <path d="m4.14 17.07-2.12 2.12" />
      <path d="M19.86 17.07 22 19.19" />
      <path d="m4.14 6.93-2.12-2.12" />
      <path d="M19.86 6.93 22 4.81" />
    </svg>
  );
}
