const LoadingSpinner = () => (
  <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: "auto", display: "block", shapeRendering: "auto" }}
      width="64px"
      height="64px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="url(#grad)"
        strokeWidth="8"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;1"
          values="0 50 50;360 50 50"
        ></animateTransform>
      </circle>
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#4fa94d", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#4faffd", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default LoadingSpinner;
