import { useRef, useState } from "react";

const ReadWithTimelight = ({
    scripts = [],
    srcAudio = "",
    handleCurrentTime = (currentTime) => (currentTime),
}) => {
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(-1);
    const convertToSeconds = (time) => {
        const [minutes, seconds] = time.split(":").map(Number);
        return minutes * 60 + seconds;
    };
    const handleRead = (timestamp) => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = convertToSeconds(timestamp);
            audio.play();
            handleCurrentTime(timestamp)
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

   /**
    currentTime 20.807165 timestamp 186 nextTimstamp 191
    */
    return (
        <div className="mt-5 bg-gradient-to-tr from-[#FFB457] to-[#FF705B] p-4 rounded">
            <h2 className="text-lg font-semibold mb-4">Đọc theo</h2>
            <audio onTimeUpdate={handleTimeUpdate} preload="metadata" className="hidden" ref={audioRef} src={srcAudio} />
            <div className="flex flex-wrap">
                {
                    scripts.map((script, index) => {
                        const { text, timestamp, idx_hidden = [] } = script
                        const isActive = currentTime >= convertToSeconds(timestamp) && currentTime < convertToSeconds(scripts[index + 1]?.timestamp || "99:99")
                        return (
                            <p onClick={() => handleRead(timestamp)} className={`${isActive && "bg-white/70"} hover:bg-white/30 cursor-pointer rounded-sm mr-3 mb-3`} key={index}>
                                {text}
                            </p>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ReadWithTimelight
