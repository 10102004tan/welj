import { addToast } from "@heroui/toast";
import { use, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import MusicPlayerBar from "../components/MusicPlayerBar";

export default function PodcastListen() {
    const {id} = useParams();
    const [data, setData] = useState();
    const [list, setList] = useState([])
    
    useEffect(() => {
            const fetchData = async () => {
                const response = await fetch(`http://localhost:3000/api/v1/podcast/detail/${id}`, {
                    headers: {
                        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2VjMjcxY2I2YmFmNDRjMGM1NDEyZTciLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc0Mzc0ODAyOCwiZXhwIjoxNzQzOTIwODI4fQ.wgSAt8uxsjhUy9aml7K3sZjp1d7saU-6Ke4lR7L-Y40',
                        'x-client-id': '67ec271cb6baf44c0c5412e7'
                    },
                })
                const data = await response.json()
                const {list_answers=[]} = data
                setData(data)
                // set list to list_answers
                const listTemp = list_answers.map((item) => {
                    return {
                        timestamp: item.timestamp,
                        texts: item.texts
                    }
                })
                setList(listTemp)
            }
            if (id){
                fetchData()
            }
    }, [id])


    const handleReview = async () => {
        const response = await fetch("http://localhost:3000/api/v1/podcast/review", {
            headers: {
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2VjMjcxY2I2YmFmNDRjMGM1NDEyZTciLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc0Mzc0ODAyOCwiZXhwIjoxNzQzOTIwODI4fQ.wgSAt8uxsjhUy9aml7K3sZjp1d7saU-6Ke4lR7L-Y40',
                'x-client-id': '67ec271cb6baf44c0c5412e7',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                list,
                podcastId: "67ec9d1c124f7fe9d09b2fef",
            })
        })

        const data = await response.json()

        if (data) {
            const { percentReview } = data
            addToast({
                title: "Thành công",
                description: `Phần trăm câu trả lời đúng là ${data.percentReview}%`,
                color: percentReview > 80 ? "success" : percentReview >= 50 ? "warning" : "danger",
                timeout: 3000
            })
        }
    }

    const handleSubmitResult = async ({
        is_completed = true
    }) => {
        // alert submit
        const result = confirm(is_completed ? "Bạn có chắc chắn muốn nộp bài không?" : "Bạn có chắc chắn muốn lưu tạm không?")
        if (!result) {
            return
        }
        const response = await fetch("http://localhost:3000/api/v1/result/save", {
            headers: {
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2VjMjcxY2I2YmFmNDRjMGM1NDEyZTciLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc0Mzc0ODAyOCwiZXhwIjoxNzQzOTIwODI4fQ.wgSAt8uxsjhUy9aml7K3sZjp1d7saU-6Ke4lR7L-Y40',
                'x-client-id': '67ec271cb6baf44c0c5412e7',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                list,
                podcastId:id,
                is_completed
            })
        })

        const data = await response.json()
        if (data) {
            window.location.href = `/results/${id}`
        }
    }

    if (!data) {
        return <div>Loading...</div>
    }


    return (
        <div>
            <div className="mb-4 flex items-center gap-3">
                <button onClick={handleSubmitResult} className="py-2 px-[20px] rounded-full bg-red-600 text-white font-medium">
                    Nộp bài
                    (+ 1)
                </button>
                <button onClick={handleReview} className="py-2 px-[20px] rounded-full border font-medium">
                    Thử kết quả
                </button>
                <button onClick={()=>handleSubmitResult({is_completed:false})} className="py-2 px-[20px] rounded-full border font-medium">
                    Lưu tạm
                </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {/* col-span 2 */}
                <div className="col-span-2 bg-white p-4 rounded shadow">
                    {
                        data?.scripts.map((script, index) => {
                            let { text, idx_hidden = [], timestamp } = script
                            let textTemp = text
                            idx_hidden.forEach((idx) => {
                                const start = idx[0]
                                const end = idx[1]
                                textTemp = textTemp.replace(text.slice(start, end), `[${end - start}]`)
                            })
                            text = textTemp
                            const textArray = text.split("]");
                            let indexIdxTemp = -1;
                            return (
                                <p key={index} className="inline-block">
                                    {
                                        textArray.map((item, idx) => {
                                            if (item.includes("[")) {
                                                const itemArray = item.split("[");
                                                const text = itemArray[0]
                                                const length = parseInt(itemArray[1], 10)
                                                if (indexIdxTemp === idx_hidden.length - 1) {
                                                    indexIdxTemp = -1
                                                } else {
                                                    indexIdxTemp++
                                                }
                                                let value = list.find((item) => item.timestamp === timestamp)?.texts[indexIdxTemp] || ""

                                                return <>
                                                    <span className="mr-1 mb-2">{text}</span>
                                                    <input value={value} indexidx={indexIdxTemp} onChange={(e) => {
                                                        value = e.target.value
                                                        const indexScript = list.findIndex((item) => item.timestamp === timestamp)
                                                        const indexIdx = e.target.getAttribute("indexidx") || 0
                                                        if (indexScript === -1) {
                                                            // Khai báo 1 mảng có length phần tử
                                                            const texts = Array(idx_hidden.length).fill("")
                                                            texts[indexIdx] = value
                                                            setList([...list, { timestamp, texts }])
                                                        } else {
                                                            const texts = [...list[indexScript].texts]
                                                            texts[indexIdx] = value
                                                            const newList = [...list]
                                                            newList[indexScript].texts = texts
                                                            setList(newList)
                                                        }

                                                    }} maxLength={length} key={idx} type="text" style={{ width: `${length * 14}px` }} className={`bg-green-200 rounded-sm outline-none mr-1 mb-2`} />
                                                </>
                                            }
                                            return <span className="mr-1 mb-2" key={idx}>{item}</span>
                                        })
                                    }
                                </p>
                            )
                        })
                    }
                </div>
                {/* col-span 1 */}
                <div className="bg-white p-4">
                    <h2 className="text-lg font-semibold mb-4">Phím tắt điều khiển mp3</h2>
                    <ul className="space-y-2">
                        <li className="p-2 rounded flex items-center gap-2">
                            <span className="w-[30px] h-[30px] flex items-center justify-center border rounded-lg">1</span>
                            <span>Nghe / Tạm dừng</span>
                        </li>
                        <li className="p-2 rounded flex items-center gap-2">
                            <span className="w-[30px] h-[30px] flex items-center justify-center border rounded-lg">2</span>
                            <span>Tua lại</span>
                        </li>
                        <li className="p-2 rounded flex items-center gap-2">
                            <span className="w-[30px] h-[30px] flex items-center justify-center border rounded-lg">3</span>
                            <span>Tua đi</span>
                        </li>
                        <li className="p-2 rounded flex items-center gap-2">
                            Thời gian tua  <span className="w-[30px] h-[30px] flex items-center justify-center border rounded-lg">5</span> giây
                        </li>
                    </ul>
                </div>
            </div>
            <MusicPlayerBar audioCover={data?.thumbnail} audioTitle={data?.title} audioSrc={data?.audio_url}/>
        </div>
    )
}
