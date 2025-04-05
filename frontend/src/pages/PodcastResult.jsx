import { Avatar, Button, Image } from "@heroui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReadWithTimelight from "../components/ReadWithTimelight";
import MusicPlayerBar from "../components/MusicPlayerBar";

export default function PodcastResult() {

    // get id from url
    const { podcastId } = useParams();
    const [result, setResult] = useState(null);
    const [audio, setAudio] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    useEffect(() => {
        const fetchResult = async () => {
            const response = await fetch(`http://localhost:3000/api/v1/result/get/${podcastId}`, {
                headers: {
                    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2VjMjcxY2I2YmFmNDRjMGM1NDEyZTciLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc0Mzc0ODAyOCwiZXhwIjoxNzQzOTIwODI4fQ.wgSAt8uxsjhUy9aml7K3sZjp1d7saU-6Ke4lR7L-Y40',
                    'x-client-id': '67ec271cb6baf44c0c5412e7'
                }
            })
            const data = await response.json()
            const { list_answers,audio_url } = data
            console.log(data)
            setResult(list_answers)
            setAudio(audio_url)
        }

        if (podcastId) {
            fetchResult()
        }
    }, [podcastId])
    if (!result) {
        return <div>Loading...</div>
    }

    const handleReplay = async() => {
        const isSubmit = confirm("Bạn có chắc chắn muốn làm lại bài này không?")
        if (!isSubmit) return

        const response = await fetch("http://localhost:3000/api/v1/result/save", {
            headers: {
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2VjMjcxY2I2YmFmNDRjMGM1NDEyZTciLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc0Mzc0ODAyOCwiZXhwIjoxNzQzOTIwODI4fQ.wgSAt8uxsjhUy9aml7K3sZjp1d7saU-6Ke4lR7L-Y40',
                'x-client-id': '67ec271cb6baf44c0c5412e7',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                list:[],
                podcastId,
                is_completed:false
            })
        })

        const data = await response.json()
        if (data) {
            // redirect to podcast page
            window.location.href = `/podcasts/listen/${podcastId}`
        }
    }
   
    return (
       <div>
       <div className="mb-4 flex items-center gap-3">
                <button onClick={handleReplay} className="py-2 px-[20px] rounded-full bg-red-600 text-white font-medium">
                    Phục thù
                </button>
            </div>
         <div className="grid grid-cols-2 gap-3">
            <ReadWithTimelight
            scripts={result}
            handleCurrentTime={(currentTime) => setCurrentTime(currentTime)}
            srcAudio={audio} />
            <div className="mt-5 bg-gradient-to-tr from-[#000851] to-[#1CB5E0] p-4 rounded">
                <h2 className="text-lg font-semibold mb-4 mt-5 text-white">Xem đáp án</h2>
                <div className="mt-2 flex gap-2 items-center">
                    <p className="text-gray-300">Giải thích</p>
                    <ul className="mt-3 flex gap-3">
                        <li className="flex gap-2 items-center">
                            <div className="w-[70px] h-[25px] rounded bg-green-500"></div>
                            <span className="text-xs text-gray-400">Câu trả lời đúng</span>
                        </li>
                        <li className="flex gap-2 items-center">
                            <div className="w-[70px] h-[25px] rounded bg-red-500"></div>
                            <span className="text-xs text-gray-400">Câu trả lời sai</span>
                        </li>
                        <li className="flex gap-2 items-center">
                            <div className="w-[70px] h-[25px] rounded bg-orange-500"></div>
                            <span className="text-xs text-gray-400">Chưa trả lời</span>
                        </li>
                    </ul>
                </div>
                <div className="mt-[40px] flex flex-wrap">
                    {
                        result?.map((item, index) => {
                            const { timestamp, texts, idx_hidden, text } = item
                            if (idx_hidden.length === 0) {
                                return (
                                    <p className="text-white">
                                        {text}
                                    </p>
                                )
                            }
                            let lastIndex = 0
                            let highlightedText = []
                            idx_hidden.forEach((idx, index) => {
                                const [start, end] = idx
                                if (lastIndex < start) {
                                    highlightedText.push(text.slice(lastIndex, start))
                                }

                                const isCorrect = texts[index] === text.slice(start, end);
                                if (isCorrect) {
                                    highlightedText.push(
                                        <span className={`px-2 py-1 cursor-pointer bg-green-500 rounded-sm mr-3 ${isCorrect}`} key={index}>
                                            {text.slice(start, end)}
                                        </span>
                                    )
                                } else {
                                    const element = texts[index] ? <p className="inline-block" key={index}>
                                        <span className="px-2 py-1 cursor-pointer line-through bg-red-500 rounded-sm mr-3">{texts[index]}</span>
                                        <span className="px-2 py-1 cursor-pointer bg-green-500 rounded-sm mr-3">{text.slice(start, end)}</span>
                                    </p> : <span className="px-2 py-1 cursor-pointer bg-orange-500 rounded-sm mr-3">{text.slice(start, end)}</span>

                                    highlightedText.push(element)
                                }
                                lastIndex = end
                            })

                            if (lastIndex < text.length) {
                                highlightedText.push(text.slice(lastIndex))
                            }

                            return (
                                <p className="text-white my-2" key={index}>
                                    {
                                        highlightedText.map((item, idx) => {
                                            return <span key={idx}>{item}</span>
                                        })
                                    }
                                </p>
                            )
                        })
                    }
                </div>
            </div>
        </div>
       </div>
    );
}