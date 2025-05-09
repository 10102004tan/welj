import { Avatar, Input } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useStoreAuth";
import { logout } from "../services/authService"
import { Bell, Database, Flame, SearchIcon } from "lucide-react";
export default function MainLayout({ children }) {
  const [placement, setPlacement] = useState("top-left");
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      // window.location.href = "/login"; // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  return (
    <div className="min-h-screen flex flex-col">
      <ToastProvider placement={placement} />
      <header className="bg-white z-50 shadow-2xl sticky top-0 right-0 left-0 px-[100px] py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold mr-4">
          WELJ
        </Link>
        <nav className="flex gap-3">
          <Link className="font-semibold" to="/">Trang chủ</Link>
          <Link className="font-semibold" to="/podcasts">Bài nghe</Link>
          <Link className="font-semibold" to="/podcasts">Lớp học</Link>

          {
            !isAuthenticated && (
              <Link className="font-semibold" to="/login">Đăng nhập</Link>
            )
          }
        </nav>

        <Input type="text" placeholder="Tìm kiếm" className="rounded-md max-w-[400px] px-4 py-2" endContent={
          <SearchIcon />
        } />

        {/* profile */}
        {
          isAuthenticated && (
            <div className="flex gap-1">
              {/* logout */}
              {/* <button className="bg-red-500 text-white px-4 py-2 rounded-md mr-4" onClick={handleLogout}>Đăng xuất</button> */}
              
              <button className="bg-gray-200 text-gray-500 px-2 py-2 rounded-full mr-4">
              <Database/>
              </button>
              <button className="bg-gray-200 text-gray-500 px-2 py-2 rounded-full mr-4">
                <Flame />
              </button>
              <button className="bg-gray-200 text-gray-500 px-2 py-2 rounded-full mr-4">
                <Bell />
              </button>

              <Link to="/profile">
                <Avatar
                  src="https://avatars.githubusercontent.com/u/12345678?v=4"
                  alt="User Avatar"
                  size="md"
                  className="cursor-pointer"
                />
              </Link>
            </div>
          )
        }
      </header>
      <main className="flex-grow px-[100px] pt-[20px]">{children}</main>
      <footer className="bg-gray-200 p-4 text-center">© 2025 My Website</footer>
    </div>
  );
}
