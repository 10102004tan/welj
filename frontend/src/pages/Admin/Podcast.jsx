import { useEffect, useState } from "react";
import api from "../../libs/axios"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import { getPodcastDetails } from "../../services/podcastService";

const HighlightMultipleRanges = ({ text, ranges, timestamp = "", texts = [] }) => {
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

const Podcast = () => {
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalData, setModalData] = useState(null);
    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                const response = await api.get("/podcast/list")
                const { data: { podcasts } } = response
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
            setModalData(data)
            onOpen()
        } catch (error) {

        }
    }
    return (
        <div className="h-screen">
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Title</th>
                        <th className="border border-gray-300 px-4 py-2">Description</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading ? (
                            <tr>
                                <td colSpan="3" className="text-center py-4">Loading...</td>
                            </tr>
                        ) : podcasts.length > 0 ? (
                            podcasts.map((podcast) => (
                                <tr key={podcast._id}>
                                    <td className="border border-gray-300 px-4 py-2">{podcast.title}</td>
                                    <td className="border border-gray-300 px-4 py-2">{podcast.description}</td>
                                    <td className="border border-gray-300 px-4 py-2 flex">
                                        <button onClick={() => handleEdit(podcast._id)} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
                                        <button className="bg-red-500 text-white px-4 py-2 rounded ml-2">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-4">No podcasts found</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

            {/* modal */}
            <Modal isOpen={isOpen} size={"5xl"} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <div className="flex gap-2 items-center">
                                    Chỉnh sửa bài nghe
                                    <button onClick={onClose} className=" hover:text-gray-700 px-4 bg-green-500 text-white rounded transition duration-200">
                                        Lưu
                                    </button>
                                    <button onClick={onClose} className=" hover:text-gray-700 px-4 bg-red-500 text-white rounded transition duration-200">
                                        Xóa
                                    </button>
                                </div>
                            </ModalHeader>
                            <ModalBody className="max-h-[80vh] overflow-y-auto">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="title" className="text-sm font-semibold">Title</label>
                                    <input type="text" id="title" value={modalData?.title} className="border border-gray-300 rounded p-2" />

                                    <label htmlFor="description" className="text-sm font-semibold">Description</label>
                                    <textarea id="description" value={modalData?.description} className="border border-gray-300 rounded p-2"></textarea>

                                    <label htmlFor="link" className="text-sm font-semibold">Link</label>
                                    <input type="text" id="link" value={modalData?.link} className="border border-gray-300 rounded p-2" />

                                    {/* scripts */}
                                    <div>
                                        <label htmlFor="scripts" className="text-sm font-semibold">Scripts</label>
                                        <div className="h-[400px] relative overflow-y-auto p-5">
                                            {
                                                modalData?.scripts.map((script, index) => {
                                                    const { text, timestamp, idx_hidden = [] } = script
                                                    return <div data-timestamp={timestamp} key={index} className="flex gap-2 mb-3">
                                                        <span className="px-2 py-1 bg-white/75 rounded inline-block">{timestamp}</span> :
                                                        <HighlightMultipleRanges timestamp={timestamp} text={text} ranges={idx_hidden} />
                                                    </div>
                                                })
                                            }
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