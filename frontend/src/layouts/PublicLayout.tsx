import { Outlet } from 'react-router-dom';
import Footer from '../components/client/Footer';
import FloatingUpButton from '../components/client/FloatingUpButton';
import Navbar from '../components/client/Navbar';
import { publicNavRoutes } from '../config/routes';
import { useState } from 'react';
import NavigationDrawer from '../components/admin/NavigationDrawer';

const PublicLayout = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    
        const toggleDrawer = () => {
            setIsDrawerOpen(!isDrawerOpen);
    };
    
    
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar navItems={publicNavRoutes} onOpenDrawer={toggleDrawer} />
             <NavigationDrawer 
                routes={publicNavRoutes}
                navbarOpen={isDrawerOpen} 
                closeNav={() => setIsDrawerOpen(false)} 
            />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer  footerItems={publicNavRoutes}/>
            <FloatingUpButton />
        </div>
    );
};

export default PublicLayout;