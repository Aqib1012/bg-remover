export default function Logo() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="28" height="28" rx="7" fill="#1F9E8E" />
      <path
        d="M1 8a7 7 0 0 1 7-7h13a7 7 0 0 1 7 7v6L11 29H8a7 7 0 0 1-7-7V8Z"
        fill="url(#checker)"
      />
      <path
        d="M28 14 11 29"
        stroke="#FBF8F2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 3"
      />
      <defs>
        <pattern id="checker" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="#E4F6F2" />
          <rect width="3" height="3" fill="#FFFFFF" />
          <rect x="3" y="3" width="3" height="3" fill="#FFFFFF" />
        </pattern>
      </defs>
    </svg>
  );
}
