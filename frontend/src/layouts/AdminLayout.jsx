import { useAuthStore } from "../store/useStoreAuth";
import { AlignJustify, ArrowRightToLine, Blocks, FolderClosed, Lightbulb, Move3d, Music, Settings, User } from "lucide-react";
import { Avatar, ToastProvider, Tooltip } from '@heroui/react'
import { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function AdminLayout({ children }) {
    const { isAuthenticated, userAuth } = useAuthStore();
    const [placement, setPlacement] = useState("top-right");
    const [isOpenSidebar, setIsOpenSidebar] = useState(true);
    const [currentActive, setCurrentActive] = useState("dashboard");
    if (!isAuthenticated || userAuth.role !== "role001") {
        return <div className="h-screen flex items-center justify-center text-2xl">Unauthorized</div>;
    }
    useEffect(() => {
        // set current active based on the current URL path
        const path = window.location.pathname;
        if (path.includes("admin/users")) {
            setCurrentActive("users");
        }else if (path.includes("admin/podcasts")) {
            setCurrentActive("podcasts");
        }
        else if (path.includes("dashboard")) {
            setCurrentActive("dashboard");
        }
    },[])
    const handleToggleSidebar = () => {
        setIsOpenSidebar(!isOpenSidebar);
    }
    const handleSetActive = (active) => {
        setCurrentActive(active);
    }
    return (
        <div className="flex flex-col h-screen">
            <ToastProvider placement={placement} />
            <main className="flex flex-1">
                <aside className={`${isOpenSidebar ? 'w-64' : "w-20"} sticky left-0 top-0 h-screen border-r-1 transition-all duration-300`}>
                    {/* sidebar logo */}
                    <div className="flex items-center px-4 pt-4 justify-between pb-3 border-b-1 border-gray-300 mb-5">
                        {
                            isOpenSidebar && <h5 className="text-lg font-semibold">Dashboard</h5>
                        }
                        <button className="p-2 cursor-pointer" onClick={handleToggleSidebar}>
                        <AlignJustify/>
                        </button>
                    </div>
                    <nav className="px-4">
                        <ul>
                            <li className={`${currentActive === "dashboard" && "bg-black text-white"} mb-4 p-2 rounded cursor-pointer hover:bg-black hover:text-white transition duration-200`}>
                                <Link onClick={()=>handleSetActive("dashboard")} to="/dashboard">
                                    {
                                        isOpenSidebar ? <div className="flex items-center gap-4">
                                            <Blocks />
                                            <span>Dashboard</span>
                                        </div>
                                            : (
                                                <Tooltip content="Dashboard" placement="top" className="flex items-center gap-4">
                                                    <Blocks />
                                                </Tooltip>
                                            )
                                    }
                                </Link>
                            </li>
                            <li className={`${currentActive === "users" && "bg-black text-white"} mb-4 p-2 rounded hover:bg-black hover:text-white transition duration-200`}>
                                <Link onClick={()=>handleSetActive("users")} to="/admin/users">
                                    {
                                        isOpenSidebar ? <div className="flex items-center gap-4">
                                            <User />
                                            <span>User</span>
                                        </div>
                                            : (
                                                <Tooltip content="User" placement="top" className="flex items-center gap-4">
                                                    <User />
                                                </Tooltip>
                                            )
                                    }
                                </Link>
                            </li>
                            <li className={`${currentActive === "podcasts" && "bg-black text-white"} mb-4 p-2 rounded hover:bg-black hover:text-white transition duration-200`}>
                                <Link onClick={()=>handleSetActive("podcasts")} to="/admin/podcasts">
                                    {
                                        isOpenSidebar ? <div className="flex items-center gap-4">
                                            <Music />
                                            <span>Podcast</span>
                                        </div>
                                            : (
                                                <Tooltip content="Podcast" placement="top" className="flex items-center gap-4">
                                                    <Music />
                                                </Tooltip>
                                            )
                                    }
                                </Link>
                            </li>
                            <li className={`mb-4 p-2 rounded hover:bg-black hover:text-white transition duration-200`}>
                                <Link onClick={()=>handleSetActive("dashboard")} to="/">
                                    {
                                        isOpenSidebar ? <div className="flex items-center gap-4">
                                            <Lightbulb />
                                            <span>Post</span>
                                        </div>
                                            : (
                                                <Tooltip content="Post" placement="top" className="flex items-center gap-4">
                                                    <Lightbulb />
                                                </Tooltip>
                                            )
                                    }
                                </Link>
                            </li>
                            <li className={`mb-4 p-2 rounded hover:bg-black hover:text-white transition duration-200`}>
                                <Link to="/">
                                    {
                                        isOpenSidebar ? <div className="flex items-center gap-4">
                                            <Move3d />
                                            <span>RBAC</span>
                                        </div>
                                            : (
                                                <Tooltip content="RBAC" placement="top" className="flex items-center gap-4">
                                                    <Move3d />
                                                </Tooltip>
                                            )
                                    }
                                </Link>
                            </li>
                            <li className="mb-4 p-2 rounded hover:bg-black hover:text-white transition duration-200">
                                <Link to="/">
                                    {
                                        isOpenSidebar ? <div className="flex items-center gap-4">
                                            <FolderClosed />
                                            <span>Media</span>
                                        </div>
                                            : (
                                                <Tooltip content="Media" placement="top" className="flex items-center gap-4">
                                                    <FolderClosed />
                                                </Tooltip>
                                            )
                                    }
                                </Link>
                            </li>
                            <li className="mb-4 p-2 rounded hover:bg-black hover:text-white transition duration-200">
                                <Link to="/">
                                    {
                                        isOpenSidebar ? <div className="flex items-center gap-4">
                                           <Settings />
                                            <span>Setting</span>
                                        </div>
                                            : (
                                                <Tooltip content="Setting" placement="top" className="flex items-center gap-4">
                                                    <Settings />
                                                </Tooltip>
                                            )
                                    }
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <section className="flex-1">
                    <header className="flex items-center justify-end sticky top-0 z-50 p-4 bg-white shadow-sm">
                        <div className="flex rounded items-center justify-between gap-4 bg-white/10">
                            <Avatar className="w-10 h-10" src={"https://cdnphoto.dantri.com.vn/pLymMn9bRtSgUDB6UkZPwQ27Dd8=/thumb_w/960/2020/05/15/00-1589511827708.jpg"} alt="User Avatar" />
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">{userAuth.email}</span>
                                <span className="text-xs text-gray-400">{userAuth.role}</span>
                            </div>
                            <ArrowRightToLine />
                        </div>
                    </header>
                    <div className="p-4">
                        {children}
                    </div>
                </section>
            </main>
        </div>
    )
}
