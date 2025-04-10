import { useAuthStore } from "../store/useStoreAuth";

export default function AdminLayout({ children }) {
    const { isAuthenticated,userAuth } = useAuthStore();
    if (!isAuthenticated || userAuth.role !== "role001"){
        return <div className="h-screen flex items-center justify-center text-2xl">Unauthorized</div>;
    }
    return (
        <div className="flex flex-col h-screen">
            <header className="bg-gray-800 text-white p-4">
                <h1 className="text-xl">Dashboard</h1>
            </header>
            <main className="flex flex-1">
                <aside className="bg-gray-200 w-64 p-4">
                    <nav>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#settings">Settings</a></li>
                            <li><a href="#profile">Profile</a></li>
                        </ul>
                    </nav>
                </aside>
                <section className="flex-1 p-4">
                    {children}
                </section>
            </main>
        </div>
    )
}
