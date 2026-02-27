type Props = {
    isPlaying: boolean;
};

export default function PlayDownloadIcon({ isPlaying }: Props) {
    return (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-500">
            {isPlaying ? (
                //PAUSE
                <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                </svg>
            ) : (
                // PLAY
                <svg viewBox="0 0 10 12" fill="white" className="h-3 w-3">
                    <path d="M8.65167 6L1.33333 1.33971V10.6611L8.65167 6Z" />
                </svg>
            )}
        </div>
    );
}
