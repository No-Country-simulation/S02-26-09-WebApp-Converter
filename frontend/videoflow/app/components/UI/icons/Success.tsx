export default function SuccessIcon() {
    return (
        <svg
            viewBox="0 0 150 150"
            xmlns="http://www.w3.org/2000/svg"
            className="m-auto h-20 w-20"
            fill="none"
        >
            <style>
                {`
                .scaleIn {
                    animation: scaleIn 0.5s ease-out forwards;
                }

                .ringPulse {
                    transform-origin: center;
                    animation: ringPulse 2s ease-in-out infinite;
                }

                .checkPath {
                    stroke-dasharray: 100;
                    stroke-dashoffset: 100;
                    animation: drawCheck 0.6s ease-out 0.4s forwards;
                }

                @keyframes scaleIn {
                    0% { transform: scale(0.6); opacity: 0; }
                    60% { transform: scale(1.1); }
                    100% { transform: scale(1); opacity: 1; }
                }

                @keyframes ringPulse {
                    0% { transform: scale(1); opacity: 0.6; }
                    50% { transform: scale(1.08); opacity: 0.3; }
                    100% { transform: scale(1); opacity: 0.6; }
                }

                @keyframes drawCheck {
                    to { stroke-dashoffset: 0; }
                }
            `}
            </style>

            {/* Círculo interno */}
            <circle cx="75" cy="75" r="56" fill="#2F27CE" className="scaleIn" />

            {/* Círculo externo */}
            <circle
                cx="75"
                cy="75"
                r="63"
                stroke="#433BFF"
                strokeOpacity="0.4"
                strokeWidth="12"
                fill="none"
                className="ringPulse"
            />

            {/* Check */}
            <path
                d="M95 62L70 87L58 75"
                stroke="white"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="checkPath"
            />
        </svg>
    );
}
