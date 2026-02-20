"use client";
import MediaControls from "../UI/MediaControls/MediaControls";
import {
    useRef,
    useState,
    useMemo,
} from "react";

type Props = {
    file: File;
    onGenerate: () => void;
};

export default function VideoEditor({file,}: Props) {

    const originalRef = useRef<HTMLVideoElement>(null);
    const [duration, setDuration] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState(false);

  
    const videoUrl = useMemo(() => {
        return URL.createObjectURL(file);
    }, [file]);

   
   
  
   const handlePlayPause = () => {
       const video = originalRef.current;
       if (!video) return;

       if (video.paused) {
           video.play();
           setIsPlaying(true);
       } else {
           video.pause();
           setIsPlaying(false);
       }
   };

   const handlePrev = () => {
       const video = originalRef.current;
       if (!video) return;

       video.currentTime = Math.max(
           0,
           video.currentTime - 5,
       );
   };

   const handleNext = () => {
       const video = originalRef.current;
       if (!video) return;

       video.currentTime = Math.min(
           duration,
           video.currentTime + 5,
       );
   };
 

    return (
        <div className="w-178 mx-auto mt-10  bg-[#F2F2F7] pb-8 rounded-2xl  border-[0.25px] border-gray-300/90 shadow-[0px_4px_17.6px_0px_#0000001A]">
            <video
                ref={originalRef}
                className="w-178 rounded-tr-2xl rounded-tl-2xl"
                src={videoUrl}
                onLoadedMetadata={(e) =>
                    setDuration(e.currentTarget.duration)
                }
            />

            <MediaControls
                onPrev={handlePrev}
                onPlay={handlePlayPause}
                onNext={handleNext}
                isPlaying={isPlaying}
            />
        </div>
    );
}
