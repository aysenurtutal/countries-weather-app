// Layout.tsx
import React from 'react';
import TopBar from './TopBar';
import FooterBar from './footer';
import Styles from './layout.module.css';

interface LayoutProps {
    children: React.ReactNode;  // children type
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <TopBar />
            <div className={Styles.content}>
                {children}  {/* rendering childrens to inside layout */}
            </div>
            <FooterBar />
        </div>
    );
};

export default Layout;
