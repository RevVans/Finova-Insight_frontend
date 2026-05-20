import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-logo-container">
                <img src="/Logo/logo icon.png" alt="Finova Insight" className="sidebar-logo-img" />
                <span className="sidebar-logo-text">Finova Insight</span>
            </div>

            <div className="sidebar-menu-container">
                <div className="sidebar-menu">
                    <NavLink to="/">
                        {({ isActive }) => (
                            <div className={isActive ? "sidebar-item active" : "sidebar-item"}>
                                <div className="sidebar-icon-box">
                                    <img 
                                        src={isActive ? "/Icon/dashboard putih (active).png" : "/Icon/dashboard dark.png"} 
                                        alt="Dashboard" 
                                        className="sidebar-icon no-invert" 
                                    />
                                </div>
                                <span className="sidebar-text">Dashboard</span>
                            </div>
                        )}
                    </NavLink>
                    
                    <NavLink to="/keuangan">
                        {({ isActive }) => (
                            <div className={isActive ? "sidebar-item active" : "sidebar-item"}>
                                <div className="sidebar-icon-box">
                                    <img 
                                        src={isActive ? "/Icon/Keuangan putih (active).png" : "/Icon/Keuangan dark.png"} 
                                        alt="Keuangan" 
                                        className="sidebar-icon no-invert" 
                                    />
                                </div>
                                <span className="sidebar-text">Keuangan</span>
                            </div>
                        )}
                    </NavLink>

                    <NavLink to="/investasi">
                        {({ isActive }) => (
                            <div className={isActive ? "sidebar-item active" : "sidebar-item"}>
                                <div className="sidebar-icon-box">
                                    <img 
                                        src={isActive ? "/Icon/Investasi putih (active).png" : "/Icon/Investasi dark.png"} 
                                        alt="Investasi" 
                                        className="sidebar-icon no-invert" 
                                    />
                                </div>
                                <span className="sidebar-text">Investasi</span>
                            </div>
                        )}
                    </NavLink>

                    <NavLink to="/tabungan">
                        {({ isActive }) => (
                            <div className={isActive ? "sidebar-item active" : "sidebar-item"}>
                                <div className="sidebar-icon-box">
                                    <img 
                                        src={isActive ? "/Icon/Tabungan putih (active).png" : "/Icon/Tabungan dark.png"} 
                                        alt="Tabungan" 
                                        className="sidebar-icon no-invert" 
                                    />
                                </div>
                                <span className="sidebar-text">Tabungan</span>
                            </div>
                        )}
                    </NavLink>

                    <NavLink to="/aset">
                        {({ isActive }) => (
                            <div className={isActive ? "sidebar-item active" : "sidebar-item"}>
                                <div className="sidebar-icon-box">
                                    <img 
                                        src={isActive ? "/Icon/Aset putih (active).png" : "/Icon/Aset dark.png"} 
                                        alt="Aset" 
                                        className="sidebar-icon no-invert" 
                                    />
                                </div>
                                <span className="sidebar-text">Aset</span>
                            </div>
                        )}
                    </NavLink>
                </div>
                
                <div className="sidebar-user-profile">
                    <div className="sidebar-user-avatar"></div>
                    <div className="sidebar-user-info">
                        <span className="sidebar-user-name">username</span>
                        <span className="sidebar-user-email">email@gmail.com</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
