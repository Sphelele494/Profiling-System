import React from 'react';
import Sidebar from './SideBar';
import Header from './Header';

const Layout = ({ children, userType, userName, userEmail }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType={userType} userName={userName} userEmail={userEmail} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
