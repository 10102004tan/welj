import { addToast } from "@heroui/toast";
import { use, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import MusicPlayerBar from "../components/MusicPlayerBar";
import api from "../libs/axios"

export default function PodcastListen() {
    const { id } = useParams();
    const [data, setData] = useState();
    const [list, setList] = useState([])
    const inputsRef = useRef([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(`/podcast/listen/${id}`)
            if (response.status !== 200) return
            let indexTemp = 0;
            const { data } = response
            const newScript = data.scripts.map((script, index) => {
                const { idx_hidden = [] } = script
                return {
                    ...script,
                    newIndex: idx_hidden.length !== 0 ? indexTemp++ : -1,
                }
            })
            setData({ ...data, scripts: newScript })
            const { list_answers = [] } = response.data
            const listTemp = list_answers.map((item) => {
                return {
                    timestamp: item.timestamp,
                    texts: item.texts
                }
            })
            setList(listTemp)
        }
        if (id) {
            fetchData()
        }
    }, [id])


    const handleReview = async () => {
        try {
            const response = await api.post("/podcast/review", {
                list, podcastId: id
            })
            const { data } = response
            const { percentReview } = data
            addToast({
                title: "Thành công",
                description: `Phần trăm câu trả lời đúng là ${data.percentReview}%`,
                color: percentReview > 80 ? "success" : percentReview >= 50 ? "warning" : "danger",
                timeout: 3000
            })
        } catch (error) {
            console.log("error", error)
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
        try {
            await api.post("/result/save", {
                list,
                    podcastId: id,
                    is_completed
            })
            if (is_completed) {
                window.location.href = `/results/${id}`
            }else{
                addToast({
                    title: "Thành công",
                    description: "Lưu tạm thành công",
                    color: "success",
                    timeout: 3000
                })
            }
        } catch (error) {
            addToast({
                title: "Thất bại",
                description: "Lưu tạm thất bại",
            })
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
                <button onClick={() => handleSubmitResult({ is_completed: false })} className="py-2 px-[20px] rounded-full border font-medium">
                    Lưu tạm
                </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {/* col-span 2 */}
                <div className="col-span-2 bg-white p-4 rounded shadow">
                    {
                        data?.scripts.map((script, index) => {
                            let { text, idx_hidden = [], timestamp, newIndex } = script
                            // save index script have idx_hidden.length !== 0
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
                                                    <input ref={(el) => {
                                                        return inputsRef.current[`${newIndex}:${idx}`] = el
                                                    }} onKeyDown={(e) => {
                                                        const key = e.key
                                                        const idx_hidden_length = idx_hidden.length
                                                        if (["1", "2", "3"].includes(key)) {
                                                            e.preventDefault()
                                                            console.log("Key 1, 2, 3 is disabled")
                                                            return;
                                                        }
                                                        if (key === " " || key === "ArrowRight") {
                                                            e.preventDefault()
                                                            const nextIndex = idx < idx_hidden_length - 1 ? `${newIndex}:${idx + 1}` : `${newIndex + 1}:${0}`
                                                            if (!inputsRef.current[nextIndex]) {
                                                                return
                                                            }
                                                            inputsRef.current[nextIndex].focus()
                                                        }
                                                        if (key === "ArrowLeft") {
                                                            const lengthPrevious = data.scripts.find((item) => item.newIndex === newIndex - 1)?.idx_hidden?.length || 1
                                                            const preIndex = idx !== 0 ? `${newIndex}:${idx - 1}` : `${newIndex - 1}:${lengthPrevious - 1}`
                                                            console.log("preIndex", preIndex)
                                                            if (!inputsRef.current[preIndex]) return
                                                            inputsRef.current[preIndex].focus()
                                                        }
                                                    }} value={value} indexidx={indexIdxTemp} onChange={(e) => {
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
            <MusicPlayerBar audioCover={data?.thumbnail} audioTitle={data?.title} audioSrc={data?.audio_url} />
        </div>
    )
}
