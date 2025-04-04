import { useEffect, useRef, useState } from "react"
import MusicPlayerBar from "../components/MusicPlayerBar"
import { addToast, Form, Image, Input } from "@heroui/react";
import { Link } from "react-router-dom";
import ProductManager from "../assets/product-manager.jpg"
import BackendDevImage from "../assets/backend-dev.png"
import FrontendDevImage from "../assets/frontend-dev.png"
import DesignerImage from "../assets/designer.png"
import MinutesEasy from "../assets/audio/MinutesEasy.mp3";
import Test from "../assets/audio/30B30.mp3";




import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Avatar,
} from "@heroui/react";

import React from "react";

export const HeartIcon = ({
    size = 24,
    width,
    height,
    strokeWidth = 1.5,
    fill = "none",
    ...props
}) => {
    return (
        <svg
            aria-hidden="true"
            fill={fill}
            focusable="false"
            height={size || height}
            role="presentation"
            viewBox="0 0 24 24"
            width={size || width}
            {...props}
        >
            <path
                d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
            />
        </svg>
    );
};

export const PauseCircleIcon = ({ size = 24, width, height, ...props }) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={size || height}
            role="presentation"
            viewBox="0 0 24 24"
            width={size || width}
            {...props}
        >
            <path
                d="M11.9688 2C6.44875 2 1.96875 6.48 1.96875 12C1.96875 17.52 6.44875 22 11.9688 22C17.4888 22 21.9688 17.52 21.9688 12C21.9688 6.48 17.4988 2 11.9688 2ZM10.7188 15.03C10.7188 15.51 10.5188 15.7 10.0087 15.7H8.70875C8.19875 15.7 7.99875 15.51 7.99875 15.03V8.97C7.99875 8.49 8.19875 8.3 8.70875 8.3H9.99875C10.5087 8.3 10.7087 8.49 10.7087 8.97V15.03H10.7188ZM15.9987 15.03C15.9987 15.51 15.7987 15.7 15.2887 15.7H13.9987C13.4887 15.7 13.2887 15.51 13.2887 15.03V8.97C13.2887 8.49 13.4887 8.3 13.9987 8.3H15.2887C15.7987 8.3 15.9987 8.49 15.9987 8.97V15.03Z"
                fill="currentColor"
            />
        </svg>
    );
};

export const NextIcon = ({ size = 24, width, height, ...props }) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={size || height}
            role="presentation"
            viewBox="0 0 24 24"
            width={size || width}
            {...props}
        >
            <path
                d="M3.76172 7.21957V16.7896C3.76172 18.7496 5.89172 19.9796 7.59172 18.9996L11.7417 16.6096L15.8917 14.2096C17.5917 13.2296 17.5917 10.7796 15.8917 9.79957L11.7417 7.39957L7.59172 5.00957C5.89172 4.02957 3.76172 5.24957 3.76172 7.21957Z"
                fill="currentColor"
            />
            <path
                d="M20.2383 18.9303C19.8283 18.9303 19.4883 18.5903 19.4883 18.1803V5.82031C19.4883 5.41031 19.8283 5.07031 20.2383 5.07031C20.6483 5.07031 20.9883 5.41031 20.9883 5.82031V18.1803C20.9883 18.5903 20.6583 18.9303 20.2383 18.9303Z"
                fill="currentColor"
            />
        </svg>
    );
};

export const PreviousIcon = ({ size = 24, width, height, ...props }) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={size || height}
            role="presentation"
            viewBox="0 0 24 24"
            width={size || width}
            {...props}
        >
            <path
                d="M20.2409 7.21957V16.7896C20.2409 18.7496 18.1109 19.9796 16.4109 18.9996L12.2609 16.6096L8.11094 14.2096C6.41094 13.2296 6.41094 10.7796 8.11094 9.79957L12.2609 7.39957L16.4109 5.00957C18.1109 4.02957 20.2409 5.24957 20.2409 7.21957Z"
                fill="currentColor"
            />
            <path
                d="M3.76172 18.9303C3.35172 18.9303 3.01172 18.5903 3.01172 18.1803V5.82031C3.01172 5.41031 3.35172 5.07031 3.76172 5.07031C4.17172 5.07031 4.51172 5.41031 4.51172 5.82031V18.1803C4.51172 18.5903 4.17172 18.9303 3.76172 18.9303Z"
                fill="currentColor"
            />
        </svg>
    );
};

export const RepeatOneIcon = ({ size = 24, width, height, ...props }) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={size || height}
            role="presentation"
            viewBox="0 0 24 24"
            width={size || width}
            {...props}
        >
            <path
                d="M3.91 17.1814C3.72 17.1814 3.53 17.1114 3.38 16.9614C2.01 15.5814 1.25 13.7614 1.25 11.8314C1.25 7.82139 4.5 4.56139 8.5 4.56139L14.57 4.58139L13.48 3.54139C13.18 3.25139 13.17 2.78139 13.46 2.48139C13.75 2.18139 14.22 2.17139 14.52 2.46139L16.96 4.80139C17.18 5.01139 17.25 5.34139 17.14 5.62139C17.03 5.90139 16.75 6.09139 16.44 6.09139L8.5 6.07139C5.33 6.07139 2.75 8.66139 2.75 11.8414C2.75 13.3714 3.35 14.8214 4.44 15.9114C4.73 16.2014 4.73 16.6814 4.44 16.9714C4.29 17.1114 4.1 17.1814 3.91 17.1814Z"
                fill="currentColor"
            />
            <path
                d="M9.9999 21.75C9.8099 21.75 9.6299 21.68 9.4799 21.54L7.0399 19.2C6.8199 18.99 6.7499 18.66 6.8599 18.38C6.9799 18.1 7.2599 17.95 7.5599 17.91L15.5099 17.93C18.6799 17.93 21.2599 15.34 21.2599 12.16C21.2599 10.63 20.6599 9.18 19.5699 8.09C19.2799 7.8 19.2799 7.32 19.5699 7.03C19.8599 6.74 20.3399 6.74 20.6299 7.03C21.9999 8.41 22.7599 10.23 22.7599 12.16C22.7599 16.17 19.5099 19.43 15.5099 19.43L9.4399 19.41L10.5299 20.45C10.8299 20.74 10.8399 21.21 10.5499 21.51C10.3899 21.67 10.1999 21.75 9.9999 21.75Z"
                fill="currentColor"
            />
            <path
                d="M12.2485 15.4191C11.8385 15.4191 11.4985 15.0791 11.4985 14.6691V11.2791L11.3085 11.4891C11.0285 11.7991 10.5585 11.8191 10.2485 11.5491C9.93853 11.2791 9.91853 10.7991 10.1885 10.4891L11.6885 8.81909C11.8985 8.58909 12.2285 8.50909 12.5185 8.61909C12.8085 8.73909 12.9985 9.00909 12.9985 9.32909V14.6791C12.9985 15.0891 12.6585 15.4191 12.2485 15.4191Z"
                fill="currentColor"
            />
        </svg>
    );
};

export const ShuffleIcon = ({ size = 24, width, height, ...props }) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={size || height}
            role="presentation"
            viewBox="0 0 24 24"
            width={size || width}
            {...props}
        >
            <path
                d="M21.7507 17.9809C21.7507 17.9609 21.7407 17.9409 21.7407 17.9209C21.7307 17.8409 21.7207 17.7609 21.6907 17.6909C21.6507 17.6009 21.6007 17.5309 21.5407 17.4609C21.5407 17.4609 21.5407 17.4509 21.5307 17.4509C21.4607 17.3809 21.3807 17.3309 21.2907 17.2909C21.2007 17.2509 21.1007 17.2309 21.0007 17.2309L16.3307 17.2509C16.3307 17.2509 16.3307 17.2509 16.3207 17.2509C15.7207 17.2509 15.1407 16.9709 14.7807 16.4909L13.5607 14.9209C13.3107 14.5909 12.8407 14.5309 12.5107 14.7909C12.1807 15.0509 12.1207 15.5109 12.3807 15.8409L13.6007 17.4109C14.2507 18.2509 15.2707 18.7509 16.3307 18.7509H16.3407L19.1907 18.7409L18.4807 19.4509C18.1907 19.7409 18.1907 20.2209 18.4807 20.5109C18.6307 20.6609 18.8207 20.7309 19.0107 20.7309C19.2007 20.7309 19.3907 20.6609 19.5407 20.5109L21.5407 18.5109C21.6107 18.4409 21.6607 18.3609 21.7007 18.2709C21.7307 18.1709 21.7507 18.0709 21.7507 17.9809Z"
                fill="currentColor"
            />
            <path
                d="M8.42 6.69172C7.77 5.79172 6.73 5.26172 5.62 5.26172C5.61 5.26172 5.61 5.26172 5.6 5.26172L3 5.27172C2.59 5.27172 2.25 5.61172 2.25 6.02172C2.25 6.43172 2.59 6.77172 3 6.77172L5.61 6.76172H5.62C6.25 6.76172 6.84 7.06172 7.2 7.57172L8.28 9.07172C8.43 9.27172 8.66 9.38172 8.89 9.38172C9.04 9.38172 9.2 9.33172 9.33 9.24172C9.67 8.99172 9.74 8.52172 9.5 8.19172L8.42 6.69172Z"
                fill="currentColor"
            />
            <path
                d="M21.74 6.07875C21.74 6.05875 21.75 6.03875 21.75 6.02875C21.75 5.92875 21.73 5.82875 21.69 5.73875C21.65 5.64875 21.6 5.56875 21.53 5.49875L19.53 3.49875C19.24 3.20875 18.76 3.20875 18.47 3.49875C18.18 3.78875 18.18 4.26875 18.47 4.55875L19.18 5.26875L16.45 5.25875C16.44 5.25875 16.44 5.25875 16.43 5.25875C15.28 5.25875 14.2 5.82875 13.56 6.79875L7.17 16.3787C6.81 16.9187 6.2 17.2487 5.55 17.2487H5.54L3 17.2287C2.59 17.2287 2.25 17.5587 2.25 17.9787C2.25 18.3887 2.58 18.7287 3 18.7287L5.55 18.7387C5.56 18.7387 5.56 18.7387 5.57 18.7387C6.73 18.7387 7.8 18.1688 8.44 17.1988L14.83 7.61875C15.19 7.07875 15.8 6.74875 16.45 6.74875H16.46L21 6.76875C21.1 6.76875 21.19 6.74875 21.29 6.70875C21.38 6.66875 21.46 6.61875 21.53 6.54875C21.53 6.54875 21.53 6.53875 21.54 6.53875C21.6 6.46875 21.66 6.39875 21.69 6.30875C21.72 6.23875 21.73 6.15875 21.74 6.07875Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default function Home() {

    const [data, setData] = useState();
    const [list, setList] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [possition, setPosition] = useState({
        x: 0,
        y: 0
    })
    const [isMouseUp, setIsMouseUp] = useState(true)
    const [tempHighlight, setTempHighlight] = useState(null)
    const [listPodcast, setListPodcast] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3000/api/v1/podcast/detail/67eece36680efa860fec586a", {
                headers: {
                    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2VjMjcxY2I2YmFmNDRjMGM1NDEyZTciLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc0Mzc0ODAyOCwiZXhwIjoxNzQzOTIwODI4fQ.wgSAt8uxsjhUy9aml7K3sZjp1d7saU-6Ke4lR7L-Y40',
                    'x-client-id': '67ec271cb6baf44c0c5412e7'
                }
            })
            const data = await response.json()
            setData(data)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3000/api/v1/podcast/list", {
                headers: {
                    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2VjMjcxY2I2YmFmNDRjMGM1NDEyZTciLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc0Mzc0ODAyOCwiZXhwIjoxNzQzOTIwODI4fQ.wgSAt8uxsjhUy9aml7K3sZjp1d7saU-6Ke4lR7L-Y40',
                    'x-client-id': '67ec271cb6baf44c0c5412e7'
                }
            })
            const data = await response.json()
            console.log(data)
            const { podcasts } = data
            setListPodcast(podcasts)
        }

        const fetchResult = async () => {
            const response = await fetch("http://localhost:3000/api/v1/result/get/67ec9d1c124f7fe9d09b2fef", {
                headers: {
                    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2VjMjcxY2I2YmFmNDRjMGM1NDEyZTciLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc0Mzc0ODAyOCwiZXhwIjoxNzQzOTIwODI4fQ.wgSAt8uxsjhUy9aml7K3sZjp1d7saU-6Ke4lR7L-Y40',
                    'x-client-id': '67ec271cb6baf44c0c5412e7'
                }
            })
            const data = await response.json()
            const {list_answers} = data
            setResult(list_answers)
        }
        fetchData()
        fetchResult()
    }, [])



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

    const onClose = () => {
        setIsOpen(false)
    }


    function handleTextHighlight(event) {
        const selection = window.getSelection();
        setIsMouseUp(true)
        if (!selection.isCollapsed) {

            const range = selection.getRangeAt(0);
            const selectedNode = range.startContainer;

            const pNode = selectedNode.parentNode


            const timestamp = pNode.parentNode.getAttribute("data-timestamp")
            const start = range.startOffset;
            const end = range.endOffset;

        }
    }



    const HighlightMultipleRanges = ({ text, ranges, timestamp = "",texts=[] }) => {
        let highlightedText = [];
        let lastIndex = 0;
        ranges.forEach(([start, end], index) => {
            if (lastIndex < start) {
                highlightedText.push(text.slice(lastIndex, start));
            }
            highlightedText.push(
                <span onClick={(event) => {
                    event.stopPropagation()
                    const { clientX, clientY } = event
                    setPosition({
                        x: clientX,
                        y: clientY + 20
                    })
                    setTempHighlight({
                        start,
                        end,
                        timestamp,
                    })
                    setIsMouseUp(true)
                }} className="px-2 py-1 cursor-pointer bg-green-200 rounded-sm mr-3" key={index}>
                    {text.slice(start, end)}
                </span>
            );

            lastIndex = end;
        });

        if (lastIndex < text.length) {
            highlightedText.push(text.slice(lastIndex))
        }

        return <p onMouseUp={handleTextHighlight}>{highlightedText}</p>;
    };

    const handleHighlight = () => {
        if (!tempHighlight) return
        const { start, end, timestamp } = tempHighlight


        setData((prev) => {
            const newScripts = prev.scripts.map((item) => {
                const { idx_hidden = [] } = item
                if (item.timestamp === timestamp) {
                    const idxHidden = [...idx_hidden, [start, end]]
                    return { ...item, idx_hidden: idxHidden }
                }
                return item
            })
            return { ...prev, scripts: newScripts }
        })
        setTempHighlight(null)
    }

    return (
        <>
            {/* input content */}
            <div className="mb-4 flex items-center gap-3">
                <button className="py-2 px-[20px] rounded-full bg-red-600 text-white font-medium">
                    Nộp bài
                    (+ 1)
                </button>
                <button onClick={handleReview} className="py-2 px-[20px] rounded-full border font-medium">
                    Thử kết quả
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
                                console.log("start", start, "end", end)
                                console.log("text", text, "text.slice(start, end))", text.slice(start, end))
                                textTemp = textTemp.replace(text.slice(start, end), `[${end - start}]`)
                            })
                            text = textTemp
                            const textArray = text.split("]");
                            let indexIdxTemp = -1;
                            return (
                                <p key={index} className="inline-block">
                                    {
                                        // [0[5
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

                                                return <>
                                                    <span className="mr-1 mb-2">{text}</span>
                                                    <input indexidx={indexIdxTemp} onChange={(e) => {
                                                        const value = e.target.value
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


            {/* component xem đáp án */}
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
                            const {timestamp,texts,idx_hidden,text} = item
                            if (idx_hidden.length === 0) {
                                return (
                                    <p className="text-white">
                                        {text}
                                    </p>
                                )
                            }
                            let lastIndex = 0
                            let highlightedText = []
                            idx_hidden.forEach((idx,index) => {
                                const [start, end] = idx
                                if (lastIndex < start) {
                                    highlightedText.push(text.slice(lastIndex, start))
                                }

                                const isCorrect = texts[index] === text.slice(start, end);
                                if (isCorrect){
                                    highlightedText.push(
                                        <span className={`px-2 py-1 cursor-pointer bg-green-500 rounded-sm mr-3 ${isCorrect}`} key={index}>
                                            {text.slice(start, end)}
                                        </span>
                                    )
                                }else{
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

            {/* component đọc theo câu timelight*/}
            <ReadWithTimelight scripts={data?.scripts} srcAudio={data?.audio_url} />



            {/* component list podcast */}
            <div className="mt-5 bg-gradient-to-tr from-[#FFB457] to-[#FF705B] p-4 rounded">
                <h2 className="text-lg font-semibold mb-4">Danh sách podcast</h2>
                <div className="grid grid-cols-3 gap-4">
                    {
                        listPodcast?.map((item, index) => {
                            const { title, published_at, thumbnail, description, authorId: { fullname, email } } = item
                            return (
                                <Card
                                    isBlurred
                                    className="border-none bg-background/60"
                                    shadow="sm"
                                >
                                    <CardBody>
                                        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                                            <div className="relative col-span-6 md:col-span-4">
                                                <img
                                                    className="w-full h-full object-cover rounded-md"
                                                    src={thumbnail}
                                                    alt="Album cover"
                                                />
                                            </div>

                                            <div className="flex flex-col col-span-6 md:col-span-8">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex flex-col gap-0">
                                                        <Link to={`/podcasts/${item._id}`} className="text-foreground/90 hover:text-foreground/100 transition-all duration-200 ease-in-out">
                                                            <h3 className="font-semibold text-foreground/90">{title}</h3>
                                                        </Link>
                                                        <p className="text-sm font-medium mt-2">{description.substring(0,100)}...</p>
                                                        <div className="text-small text-foreground/80 flex items-center gap-2 mt-2">
                                                            <Avatar
                                                                alt="Avatar"
                                                                className="object-cover"
                                                                size="sm"
                                                                src={thumbnail}
                                                                title="Avatar"
                                                            />
                                                            <div>
                                                                <h4 className="font-semibold text-sm text-foreground/90">{fullname}</h4>
                                                                <h5 className="text-sm">{email}</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        isIconOnly
                                                        className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                                                        radius="full"
                                                        variant="light"
                                                        onPress={() => setLiked((v) => !v)}
                                                    >
                                                        {/* <HeartIcon
                                                            className={liked ? "[&>path]:stroke-transparent" : ""}
                                                            fill={liked ? "currentColor" : "none"}
                                                        /> */}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>


            {/* component edit podcast */}
            <div className="mt-5 bg-gradient-to-tr from-[#FFB457] to-[#FF705B] p-4 rounded">
                <h2 className="text-lg font-semibold mb-4">Chỉnh sửa podcast scripts</h2>
                <div className="h-full relative overflow-y-auto p-5">
                    {
                        data?.scripts.map((script, index) => {
                            const { text, timestamp, idx_hidden = [] } = script
                            return <div data-timestamp={timestamp} key={index} className="flex gap-2 mb-3">
                                <span className="px-2 py-1 bg-white/75 rounded inline-block">{timestamp}</span> :
                                <HighlightMultipleRanges timestamp={timestamp} text={text} ranges={idx_hidden} />
                            </div>
                        })
                    }

                    {/* <div style={{
                        left: possition.x,
                        top: possition.y,
                        transition: "all 0.3s ease-in-out",
                        display: isMouseUp ? "flex" : "none",
                    }} className="absolute z-[999] gap-2 bg-white px-3 py-1 shadow">
                        <Button className="text-sm" onPress={handleHighlight}>
                            Đánh dấu
                        </Button>
                        <Button className="text-sm bg-red-600 text-white" onPress={handleHighlight}>
                            Bỏ đánh dấu
                        </Button>
                    </div> */}
                </div>
            </div>


            {/* component Nguồn */}
            <div className="mt-5 bg-gradient-to-tr from-[#FFB457] to-[#FF705B] p-4 rounded">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold mb-4">Nguồn</h2>
                    <Link to={("/")} className="text-gray-700">
                        <span>Xem thêm</span>
                    </Link>
                </div>

                <div className="grid grid-cols-4 gap-3">
                    {
                        Array(8).fill(0).map((_, index) => {
                            return (
                                <Link to={'/'} className="bg-white/30 font-semibold backdrop-blur-md px-3 py-[30px] text-center rounded shadow-sm" key={index}>
                                    6 Minutes English
                                </Link>
                            )
                        })
                    }
                </div>
            </div>

            {/* component thong tin tai khoan */}
            <div className="mt-5 rounded bg-gray-100 p-4">
                <h2 className="text-lg font-semibold mb-4">Thông tin tài khoản</h2>
                <p>Cập nhật đầy đủ thông tin của bạn để có được sự hỗ trợ tốt nhất đến từ WELE bạn nhé.</p>

                <div className="mt-5">
                    <div className="flex items-center gap-2">
                        <Image
                            alt="Avatar"
                            className="object-cover"
                            height={80}
                            shadow="md"
                            width={80}
                            src="https://images.unsplash.com/photo-1676142171955-3c2f1a0d9b4d?ixlib=rb-4.0.3&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                            title="Avatar"
                            radius="full"
                        />
                        <Button className="text-sm bg-red-600 text-white rounded-3xl">
                            Tải ảnh mới
                        </Button>
                    </div>

                    {/* form */}
                    <Form
                        className="w-full max-w-xs flex flex-col gap-4 mt-3"
                    >
                        <Input
                            isRequired
                            errorMessage="Please enter a valid username"
                            name="username"
                            placeholder="Enter your username"
                            type="text"
                        />

                        <Input
                            isRequired
                            errorMessage="Please enter a valid email"
                            labelPlacement="outside"
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                        />
                        <div className="flex gap-2">
                            <Button className="bg-red-600 text-white" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>

            {/* component podcast detail */}
            <div className="mt-5 p-4">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-8">
                        <h2 className="font-semibold text-2xl">E10: Choosing a film</h2>
                        <p className="mt-4">
                            Hello cả nhà, đây là đáp án của câu hỏi của tuần trước nhé:

                            Which one of Michal's sentences is wrong?

                            1: I'm going to see a film tonight.

                            2: Will anyone like to come with me? – Would anyone like to come with me?

                            3: Oh Helen, that's so kind of you.

                            Hôm nay chúng ta sẽ tiếp tục series “The Flatmates” nha!

                            Alice và Michal đã tới rạp chiếu phim. Cả hai người đang cân nhắc chọn phim để xem. Alice thì thích thể loại rom-com / romantic comedy ( hài kịch lãng mạn) và period drama ( những bộ phim lấy bối cảnh một giai đoạn lịch sử xác định ). Còn Michal thì lại thích sci-fi / science fiction (khoa học viễn tưởng), hoàn toàn không phải thể loại Alice thích (not really my thing ). Lúc này, Michal gợi ý phim kinh dị (horror films) và Alice tiếp tục từ chối vì cô cũng không thích thể loại này - (sth) doesn't do it for me. Hai người có vẻ không có sở thích xem phim giống nhau, nhưng cuối cùng thì Michal vẫn nhường Alice chọn thể loại phim cô thích.

                            This episode's question:

                            What kind of film should they see?

                            1: rom-com

                            2: sci-fi

                            3: horror

                            4: period drama

                            Have fun learning English, guys!
                        </p>
                    </div>
                    <div className="col-span-4">
                        {/* button */}
                        <div className="flex items-center gap-2">
                            <Button className="bg-red-600 text-white px-[30px]">
                                Tiếp tục nghe
                            </Button>
                        </div>

                        <div className="p-3 rounded shadow bg-[#fff] mt-7">
                            <Image
                                alt="Album cover"
                                className="object-cover cursor-pointer"
                                height={400}
                                shadow="md"
                                src="https://images.unsplash.com/photo-1676142171955-3c2f1a0d9b4d?ixlib=rb-4.0.3&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                                width="100%"
                            />


                            {/* author */}
                            <div className="flex items-center gap-4 mt-7 pb-5 border-b">
                                <Avatar
                                    alt="Avatar"
                                    className="object-cover"
                                    src="https://images.unsplash.com/photo-1676142171955-3c2f1a0d9b4d?ixlib=rb-4.0.3&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                                    title="Avatar"
                                />
                                <div>
                                    <span className="text-gray-500 text-sm font-mono">Người đăng bài</span>
                                    <h5 className="font-semibold">Vuong Thi Thuy Linh</h5>
                                </div>
                            </div>

                            {/*  */}
                            <div className="grid grid-cols-3 gap-4 mt-7 pb-5 border-b">
                                <div className="col-span-1 w-full border-r">
                                    <span className="text-gray-500 text-sm font-mono">Lượt nghe</span>
                                    <h5 className="font-semibold">622</h5>
                                </div>
                                <div className="col-span-1 w-full border-r">
                                    <span className="text-gray-500 text-sm font-mono">Nguồn</span>
                                    <h5 className="font-semibold">The Flatmates</h5>
                                </div>
                                <div className="col-span-1 w-full border-r">
                                    <span className="text-gray-500 text-sm font-mono">Ngày đăng</span>
                                    <h5 className="font-semibold">01/04/2025</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* component out team */}
            <section className="mt-5 p-4">
                <h2 className="text-center text-4xl font-semibold">Our team</h2>
                <div className="grid grid-cols-8 gap-3 mt-5 px-[15px]">
                    {/* card */}
                    <div className="w-full col-span-2">
                        <img src={ProductManager} alt="Avatar" className="object-cover object-top h-[300px] cursor-pointer rounded-lg" height={150} shadow="md" width="100%" />
                        <h5 className="mt-3 font-semibold text-center">
                            Nguyen Phuong Tan
                        </h5>
                        <h6 className="text-center text-sm text-gray-500">
                            Product Manager
                        </h6>
                    </div>

                    <div className="w-full col-span-2">
                        <img src={BackendDevImage} alt="Avatar" className="object-cover object-top h-[300px] cursor-pointer rounded-lg" height={150} shadow="md" width="100%" />

                        <h5 className="mt-3 font-semibold text-center">
                            Nguyen Phuong Tan
                        </h5>
                        <h6 className="text-center text-sm text-gray-500">
                            Backend Developer
                        </h6>
                    </div>

                    <div className="w-full col-span-2">
                        <img src={FrontendDevImage} alt="Avatar" className="object-cover object-top h-[300px]  cursor-pointer rounded-lg" height={150} shadow="md" width="100%" />

                        <h5 className="mt-3 font-semibold text-center">
                            Nguyen Phuong Tan
                        </h5>
                        <h6 className="text-center text-sm text-gray-500">
                            Frontend Developer
                        </h6>
                    </div>

                    <div className="w-full col-span-2">
                        <img src={DesignerImage} alt="Avatar" className="object-cover object-top h-[300px] overflow-hidden cursor-pointer rounded-lg" height={150} shadow="md" width="100%" />
                        <h5 className="mt-3 font-semibold text-center">
                            Nguyen Phuong Tan
                        </h5>
                        <h6 className="text-center text-sm text-gray-500">
                            Designer
                        </h6>
                    </div>
                </div>
            </section>


            {/*  */}
            <MusicPlayerBar audioSrc={data?.audio_url}/>

            {/* modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <div className="h-full relative overflow-y-auto p-5">
                        {
                            data?.scripts.map((script, index) => {
                                const { text, timestamp, idx_hidden = [] } = script
                                return <div data-timestamp={timestamp} key={index} className="flex gap-2 mb-3">
                                    <span>{timestamp} :</span>
                                    <HighlightMultipleRanges timestamp={timestamp} text={text} ranges={idx_hidden} />
                                </div>
                            })
                        }

                        <div style={{
                            left: possition.x,
                            top: possition.y,
                            transition: "all 0.3s ease-in-out",
                            display: isMouseUp ? "flex" : "none",
                        }} className="absolute z-[999] gap-2 bg-white px-3 py-1 shadow">
                            <Button className="text-sm" onPress={handleHighlight}>
                                Đánh dấu
                            </Button>
                            <Button className="text-sm bg-red-600 text-white" onPress={handleHighlight}>
                                Bỏ đánh dấu
                            </Button>
                        </div>
                    </div>
                </ModalContent>
            </Modal>
        </>
    )
}

const ReadWithTimelight = ({
    scripts = [],
    srcAudio = ""
}) => {
    // convert 00:00, to seconds
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
