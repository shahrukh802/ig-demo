import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

interface IProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: IProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <div className="flex h-screen dark:bg-black bg-white overflow-y-hidden">
          <div className="hidden md:flex">
            <Sidebar setSidebarOpen={setSidebarOpen} isMobileView={false} />
            <div className="border-l border-[#333333] h-full hidden md:flex"></div>
          </div>

          {/* Main Content */}
          <main className="flex-1 w-full overflow-x-hidden">{children}</main>
        </div>
      </div>
      <Drawer
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        direction="left"
        className=""
        zIndex={1000}
      >
        <Sidebar isMobileView={true} setSidebarOpen={setSidebarOpen} />
      </Drawer>
    </>
  );
};
