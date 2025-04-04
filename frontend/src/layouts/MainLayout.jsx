import { Avatar } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function MainLayout({ children }) {
  const [placement, setPlacement] = useState("top-left");
  return (
    <div className="min-h-screen flex flex-col">
      <ToastProvider placement={placement} />
      <header className="bg-white z-50 shadow-2xl sticky top-0 right-0 left-0 px-[100px] py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold mr-4">
          WELJ
        </Link>
        <nav className="flex gap-3">
          <Link className="font-semibold" to="/">Home</Link>
          <Link className="font-semibold" to="/about">About</Link>
        </nav>

        {/* profile */}
        <div>
            <Avatar
              src="https://avatars.githubusercontent.com/u/12345678?v=4"
              alt="User Avatar"
              size="md"
              className="cursor-pointer"
              />
        </div>
      </header>
      <main className="flex-grow p-[100px]">{children}</main>
      <footer className="bg-gray-200 p-4 text-center">© 2025 My Website</footer>
    </div>
  );
}
