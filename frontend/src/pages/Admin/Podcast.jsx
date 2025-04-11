import { useCallback, useEffect, useState } from "react";
import api from "../../libs/axios"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Textarea,
    Image,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    Chip,
    Tooltip,
    TableColumn,
    TableCell,
    addToast,
} from "@heroui/react";
import { getPodcastDetails, updatePodcast } from "../../services/podcastService";
import { Controller, useForm } from "react-hook-form";
import { DeleteIcon, EditIcon, EyeIcon } from "lucide-react";



export const columns = [
    { name: "TITLE", uid: "title" },
    { name: "DESCRIPTION", uid: "description" },
    { name: "THUMBNAIL", uid: "thumbnail" },
    { name: "PUBLISHED", uid: "is_published" },
    { name: "ACTIONS", uid: "actions" },
];



const Podcast = () => {
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalData, setModalData] = useState(null);
    const [scripts, setScripts] = useState([])
    // const { register, handleSubmit, formState: { errors }, control, setError, setValue,getValues } = useForm({
    //     defaultValues: {
    //         title: "",
    //         description: "",
    //         thumbnail: null,
    //         audio: null,
    //         scripts: [],
    //     }
    // });
    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                const response = await api.get("/podcast/listAny")
                const { data: { podcasts, title } } = response
                setPodcasts(podcasts)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPodcasts();
    }, [])

    const handleEdit = async (podcastId) => {
        try {
            const data = await getPodcastDetails(podcastId)
            // setModalData(data)
            const { title, description, link, scripts } = data
            setScripts((prevScripts) => {
                return scripts.map((script) => {
                    const { text, timestamp, idx_hidden = [] } = script
                    return {
                        text,
                        timestamp,
                        idx_hidden,
                        rawText: text,
                    }
                })
            })
            setModalData(data)
            onOpen()
        } catch (error) {

        }
    }
    function renderUnderlinedText(rawText, idx_hidden) {
        if (!idx_hidden || idx_hidden.length === 0) return rawText;

        let result = "";
        let lastIndex = 0;

        // Sắp xếp idx_hidden theo thứ tự tăng dần
        const sorted = [...idx_hidden].sort((a, b) => a[0] - b[0]);

        for (const [start, end] of sorted) {
            result += rawText.slice(lastIndex, start);
            result += `<span style="text-decoration: underline; text-underline-offset: 2px; background-color: #000; color:#fff;" data-start="${start}" data-end="${end}">${rawText.slice(start, end)}</span>`;
            lastIndex = end;
        }

        result += rawText.slice(lastIndex);
        return result;
    }

    const handleSave = async () => {
        try {
            const payload = { ...modalData,scripts, }
            const data = await updatePodcast(modalData._id, payload)
            console.log(data)
            addToast({
                title: "Thành công",
                description: "Cập nhật thành công",
                color: "success",
                timeout: 2000
            })
        } catch (error) {
            addToast({
                title: "Lỗi",
                description: error.message,
                status: "error",
            })
        }
    }

    const renderCell = useCallback((podcast, columnKey) => {
        const cellValue = podcast[columnKey];
        console.log(columnKey, cellValue);
        switch (columnKey) {
            case "title":
                return (
                    <h5>{cellValue}</h5>
                );
            case "description":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue.substring(0, 100)}</p>
                    </div>
                );
            case "thumbnail":
                return (

                    <Image
                        src={cellValue || "https://via.placeholder.com/150"}
                        alt="Thumbnail"
                        className="w-20 h-auto rounded-lg"
                    />
                );

            case "is_published":
                return (
                    <Chip className="capitalize" color={cellValue ? "success" : "warning"} variant="flat" size="sm">{cellValue ? "Đã xuất bản" : "Chưa xuất bản"}</Chip>
                )
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Chi tiết">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon onClick={() => handleEdit(podcast._id)} />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Xóa bài nghe">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);
    return (
        <div className="h-screen">
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={podcasts}>
                    {(item) => (
                        <TableRow key={item._id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* modal */}
            <Modal isOpen={isOpen} size={"full"} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <div className="flex gap-2 items-center">
                                    Chỉnh sửa bài nghe
                                    <button onClick={handleSave} className=" hover:text-gray-700 px-4 bg-green-500 text-white rounded transition duration-200">
                                        Lưu
                                    </button>
                                    <button onClick={onClose} className=" hover:text-gray-700 px-4 bg-red-500 text-white rounded transition duration-200">
                                        Xóa
                                    </button>
                                </div>
                            </ModalHeader>
                            <ModalBody className="max-h-[80vh] overflow-y-auto">
                                <div className="flex flex-col gap-2">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-1 flex flex-col gap-4">
                                            <Input
                                                id="title"
                                                type="text"
                                                label="Title"
                                                value={modalData.title || ""}
                                                onChange={(e) => setModalData({ ...modalData, title: e.target.value })}
                                            />
                                            <Textarea value={modalData.description || ""} onChange={(e)=>setModalData({...modalData,description:e.target.value})} id="description" label="Description" />
                                            {/* thumbnail and audio */}
                                            <div className="flex gap-4">
                                                <div className="flex flex-col gap-2 w-full">
                                                    <label htmlFor="thumbnail" className="text-sm font-semibold">Thumbnail</label>
                                                    {/* <Input type="file" id="thumbnail" accept="image/*" /> */}
                                                    <Image
                                                        src={modalData?.thumbnail || "https://via.placeholder.com/150"}
                                                        alt="Thumbnail"
                                                        className="w-full h-auto rounded-lg"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2 w-full">
                                                    <label htmlFor="audio" className="text-sm font-semibold">Audio</label>
                                                    <audio preload="metadata" src={modalData?.audio_url} />
                                                    <input type="range" min="0" max="100" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="scripts" className="text-sm font-semibold">Scripts</label>
                                            <div className="h-[400px] relative overflow-y-auto p-5">
                                                {
                                                    scripts.map((script, index) => {
                                                        let { timestamp, idx_hidden = [], rawText } = script
                                                        return <div data-timestamp={timestamp} key={index} className="flex gap-2 mb-3 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
                                                            <span className="px-2 py-1 bg-white/75 rounded inline-block">{timestamp}</span> :
                                                            <p
                                                                onClick={(event) => {
                                                                    event.stopPropagation();
                                                                    const selection = window.getSelection();
                                                                    if (!selection || selection.rangeCount === 0) return;
                                                                    const range = selection.getRangeAt(0);
                                                                    const container = event.currentTarget;
                                                                    const clickedNode = event.target;
                                                                    if (clickedNode.tagName === "SPAN") {
                                                                        const start = parseInt(clickedNode.dataset.start);
                                                                        const end = parseInt(clickedNode.dataset.end);
                                                                        if (!isNaN(start) && !isNaN(end)) {
                                                                            setScripts((prevScripts) => {
                                                                                const updated = [...prevScripts];
                                                                                const current = updated[index];
                                                                                const filtered = (current.idx_hidden || []).filter(
                                                                                    ([s, e]) => !(s === start && e === end)
                                                                                );

                                                                                updated[index] = {
                                                                                    ...current,
                                                                                    idx_hidden: filtered,
                                                                                };
                                                                                return updated;
                                                                            });
                                                                        }

                                                                        return; // không làm gì nữa
                                                                    }

                                                                    // Tính vị trí start/end tuyệt đối trong toàn chuỗi text
                                                                    function getAbsoluteOffsets(container, range) {
                                                                        let start = range.startOffset;
                                                                        let end = range.endOffset;
                                                                        let total = 0;
                                                                        let foundStart = false;

                                                                        function traverse(node) {
                                                                            if (node.nodeType === Node.TEXT_NODE) {
                                                                                if (!foundStart && node === range.startContainer) {
                                                                                    start = total + range.startOffset;
                                                                                    foundStart = true;
                                                                                }
                                                                                if (node === range.endContainer) {
                                                                                    end = total + range.endOffset;
                                                                                }
                                                                                total += node.textContent.length;
                                                                            } else {
                                                                                for (const child of node.childNodes) {
                                                                                    traverse(child);
                                                                                }
                                                                            }
                                                                        }

                                                                        traverse(container);
                                                                        return { start, end };
                                                                    }

                                                                    const { start, end } = getAbsoluteOffsets(container, range);
                                                                    if (start === end) return; // Không chọn gì thì bỏ qua

                                                                    setScripts((prevScripts) => {
                                                                        const updated = [...prevScripts];
                                                                        const currentScript = updated[index];
                                                                        const currentHidden = currentScript.idx_hidden || [];

                                                                        const newHidden = [...currentHidden, [start, end]];

                                                                        updated[index] = {
                                                                            ...currentScript,
                                                                            idx_hidden: newHidden,
                                                                        };

                                                                        return updated;
                                                                    });
                                                                }}
                                                                dangerouslySetInnerHTML={{ __html: renderUnderlinedText(rawText, idx_hidden) }}
                                                                className="cursor-pointer"
                                                            />

                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default Podcast;