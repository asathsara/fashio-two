import { Outlet } from 'react-router-dom';
import Navbar from '../components/admin/Navbar';
import NavigationRail from '../components/admin/NavigationRail';
import { useState } from 'react';
import NavigationDrawer from '../components/common/NavigationDrawer';
import { adminNavRoutes } from '../config/routes';

const AdminLayout = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Desktop Navigation Rail */}
            <div className="hidden md:block">
                <NavigationRail routes={adminNavRoutes} />
            </div>

            {/* Mobile Navigation Drawer */}
            <NavigationDrawer
                routes={adminNavRoutes}
                navbarOpen={isDrawerOpen}
                closeNav={() => setIsDrawerOpen(false)}
            />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar openNav={toggleDrawer} />
                <main className="flex-1 overflow-y-auto pt-20 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;