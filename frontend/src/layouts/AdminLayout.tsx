import { Outlet } from 'react-router-dom'
import Navbar from '../components/admin/Navbar'
import NavigationRail from '../components/admin/NavigationRail'
import { useState } from 'react'
import NavigationDrawer from '../components/common/NavigationDrawer'
import { adminNavRoutes } from '../config/routes'

const AdminLayout = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen)

    return (
        <div className="flex h-screen">
            {/* Desktop Navigation Rail */}
            <div className="hidden md:block h-full">
                <NavigationRail routes={adminNavRoutes} />
            </div>

            {/* Mobile Navigation Drawer */}
            <NavigationDrawer
                routes={adminNavRoutes}
                navbarOpen={isDrawerOpen}
                closeNav={() => setIsDrawerOpen(false)}
            />

            {/* Main Content */}
            <div className="flex flex-col flex-1">
                <Navbar openNav={toggleDrawer} />

                {/* Only this scrolls */}
                <main className="flex-1 overflow-y-auto p-6 mt-20">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout
