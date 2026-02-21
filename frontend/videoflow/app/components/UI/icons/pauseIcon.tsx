export default function PauseIcon() {
  return (
      <>
      <svg
              viewBox="0 0 100 100"
              className="w-11 h-11"
              xmlns="http://www.w3.org/2000/svg"
          >
              <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="#2F27CE"
                  className="group-hover:opacity-90 transition-opacity"
              />
          <path d="M42 35L65 50L42 65V35Z" fill="#FFFFFF" />
          </svg>
      </>
  );
}