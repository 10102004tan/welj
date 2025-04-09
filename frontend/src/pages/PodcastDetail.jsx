import { Avatar, Button, Image } from "@heroui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../libs/axios";

export default function PodcastDetail() {

    // get id from url
    const { id } = useParams();
    const [data, setData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(`/podcast/detail/${id}`)
            const {data} = response
            setData(data)
        }
        if (id) {
           fetchData()
        }
    }, [id])
    if (!data) {
        return <div>Loading...</div>
    }
    const { thumbnail, title, description, listen_count, published_at, authorId: { fullname }, is_completed, resultId ,_id} = data;
    return (
        <div className="p-4">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8">
                    <h2 className="font-semibold text-2xl">{title}</h2>
                    <p className="mt-4">
                        {description}
                    </p>
                </div>
                <div className="col-span-4">
                    {/* button */}
                    <div className="flex items-center gap-2">
                        {
                            is_completed ?
                                <Link to={`/results/${_id}`} className="bg-red-600 py-2 rounded-lg text-white px-[30px]">
                                    Xem kết quả
                                </Link> : <div>
                                    {
                                        resultId ? <Link to={`/podcasts/listen/${_id}`} className="bg-red-600 py-2 rounded-lg text-white px-[30px]">
                                            Tiếp túc nghe
                                        </Link> : <Link to={`/podcasts/listen/${_id}`} className="bg-red-600 py-2 rounded-lg text-white px-[30px]">
                                            Nghe ngay
                                        </Link>
                                    }
                                </div>
                        }
                    </div>

                    <div className="p-3 rounded shadow bg-[#fff] mt-7">
                        <img
                            alt="Album cover"
                            src={thumbnail}
                            className="object-cover overflow-hidden cursor-pointer rounded max-h-[500px]" />


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
                                <h5 className="font-semibold">{fullname}</h5>
                            </div>
                        </div>

                        {/*  */}
                        <div className="grid grid-cols-3 gap-4 mt-7 pb-5 border-b">
                            <div className="col-span-1 w-full border-r">
                                <span className="text-gray-500 text-sm font-mono">Lượt nghe</span>
                                <h5 className="font-semibold">{listen_count}</h5>
                            </div>
                            <div className="col-span-1 w-full border-r">
                                <span className="text-gray-500 text-sm font-mono">Nguồn</span>
                                <h5 className="font-semibold">The Flatmates</h5>
                            </div>
                            <div className="col-span-1 w-full border-r">
                                <span className="text-gray-500 text-sm font-mono">Ngày đăng</span>
                                <h5 className="font-semibold">
                                    {
                                        new Date(published_at).toISOString().split("T")[0]
                                    }
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}