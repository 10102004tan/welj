import { Tab, Tabs, useDisclosure } from "@heroui/react"
import { useState } from "react"
import { getAllPodcasts } from "../services/podcastService"
import CardPodcast from "../components/CardPodcast"
import { Link } from "react-router-dom"
import { Image } from "@heroui/react"
import { useAuthStore } from "../store/useStoreAuth"

const Podcast = () => {
    const SCOPE = [
        { title: "Tất cả", value: "all" },
        { title: "Bài bạn đăng", value: "my" },
        { title: "Bài đang nghe", value: "listening" },
        { title: "Bài đã nghe", value: "listened" },
    ]
    const [podcasts, setPodcasts] = useState([])
    const {isAuthenticated,onOpen} = useAuthStore()


    useState(() => {
        const fetchPodcasts = async () => {
            try {
                const data = await getAllPodcasts()
                const { podcasts } = data
                setPodcasts(podcasts)
            } catch (error) {
                console.error("Error fetching podcasts:", error)
            }
        }
        fetchPodcasts()
    }, [])
    return (
        <div className="grid grid-cols-12 gap-5">
            <div className="mb-3 col-span-9">
                <div className="flex flex-wrap gap-4 mb-5">
                    <Tabs aria-label="Tabs variants" variant={"underlined"}>
                        {SCOPE.map((scope) => (
                            <Tab isDisabled={scope.value !== "all" && !isAuthenticated} className="font-semibold" key={scope.value} value={scope.value} title={scope.title} />
                        ))}
                    </Tabs>
                </div>

                {/* filter */}
                <div className="flex gap-2 items-center mb-5">
                    <span className="block text-nowrap text-gray-400 ms-3">Bộ lọc</span>
                    <select className="border border-gray-300 rounded-md p-2 ml-2">
                        {/* The loai */}
                        <option value="all">Tất cả</option>
                        <option value="my">Bài bạn đăng</option>
                        <option value="listening">Bài đang nghe</option>
                        <option value="listened">Bài đã nghe</option>
                    </select>
                    <select className="border border-gray-300 rounded-md p-2 ml-2">
                        {/* The loai */}
                        <option value="all">Nguồn</option>
                        <option value="my">Bài bạn đăng</option>
                        <option value="listening">Bài đang nghe</option>
                        <option value="listened">Bài đã nghe</option>
                    </select>

                    <select className="border border-gray-300 rounded-md p-2 ml-2">
                        {/* The loai */}
                        <option value="all">Sắp xếp</option>
                        <option value="my">Bài bạn đăng</option>
                        <option value="listening">Bài đang nghe</option>
                        <option value="listened">Bài đã nghe</option>
                    </select>
                </div>

                {/* list podcasts */}
                <div className="mb-3 grid gap-2">
                    {
                        podcasts.map((podcast) => (
                            <CardPodcast key={podcast._id} podcast={podcast} />
                        ))
                    }
                </div>
            </div>

            {/* QC */}
            <div className="col-span-3">
                <div className="p-3 rounded border-1 border-orange-500 mb-5 mt-[40px]">
                    <p className="font-semibold">Click vào đây để ủng hộ mình nhé!!!</p>
                    <p className="text-orange-500">Mõi một sao của cho cho repo sẽ là động lực để mình phát triển đó</p>
                </div>
                <a
                    href="https://github.com/10102004tan/welj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block"
                >
                    <Image
                        className="w-full rounded"
                        src="https://github.blog/wp-content/uploads/2024/06/AI-DarkMode-4.png?resize=800%2C425"
                        alt="github"
                    />
                </a>
            </div>
        </div>
    )
}

export default Podcast