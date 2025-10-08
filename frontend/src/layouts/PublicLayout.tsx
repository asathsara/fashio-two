import { Outlet } from 'react-router-dom';
import Footer from '../components/common/Footer';
import FloatingUpButton from '../components/client/FloatingUpButton';
import Navbar from '../components/client/Navbar';
import { publicNavRoutes } from '../config/routes';
import { useState } from 'react';
import NavigationDrawer from '../components/common/NavigationDrawer';

const PublicLayout = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar onOpenDrawer={toggleDrawer} />
            <NavigationDrawer
                routes={publicNavRoutes}
                navbarOpen={isDrawerOpen}
                closeNav={() => setIsDrawerOpen(false)}
            />
            <main className="flex-grow pt-20">
                <Outlet />
            </main>
            <Footer footerItems={publicNavRoutes} />
            <FloatingUpButton />
        </div>
    );
};

export default PublicLayout;