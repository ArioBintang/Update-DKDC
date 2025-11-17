
import { Link, Outlet, useNavigate } from "react-router-dom";


function AdminLayout() {
   
   




    return (
        <div className="antialiased bg-gray-50 dark:bg-gray-900">
            <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex justify-start items-center">
                        {/* tombol sidebar */}
                        <button
                            data-drawer-target="drawer-navigation"
                            data-drawer-toggle="drawer-navigation"
                            aria-controls="drawer-navigation"
                            className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Toggle sidebar</span>
                        </button>
                        <Link to="https://flowbite.com" className="flex items-center justify-between mr-4">
                            <img src="https://flowbite.s3.amazonaws.com/logo.svg" className="mr-3 h-8" alt="Flowbite Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                Flowbite
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center lg:order-2">
                        {/* tampilkan nama user dengan aman */}
                        <span className="text-white bg-indigo-700 px-4 py-2 rounded-lg">
                            {userInfo?.name || "Guest"}
                        </span>

                        <button
                            
                            className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        >
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="w-8 h-8 rounded-full"
                                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                                alt="user photo"
                            />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside
                className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
                aria-label="Sidenav"
                id="drawer-navigation"
            >
                <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
                    <ul className="space-y-2">
                        <li>
                            <Link to="/admin" className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                Overview
                            </Link>
                        </li>
                        {/* tambahkan menu lain sesuai kebutuhan */}
                    </ul>
                    
                </div>
            </aside>

            <main className="p-4 md:ml-64 h-auto pt-20">
                <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-auto px-4 pt-4 pb-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default AdminLayout;
