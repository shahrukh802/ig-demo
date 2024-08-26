import { Link, useLocation } from "react-router-dom";

const routes = [
  {
    name: "Home",
    path: "/home",
  },
  {
    name: "Reports",
    path: "/reports",
  },
  {
    name: "Settings",
    path: "/settings",
  },
];

interface IProps {
  setSidebarOpen: (e: boolean) => void;
  isMobileView: boolean;
}

const Sidebar = ({ setSidebarOpen, isMobileView }: IProps) => {
  const location = useLocation();

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  return (
    <div
      className={`bg-black transition-all h-full flex flex-col font-montserrat border-r-[#333333] relative 
      ${isMobileView ? "w-full" : "w-[270px]"}
      `}
    >
      <div
        className={`${"overflow-y-hidden hover:overflow-y-auto"} flex-1 custom-scroll font-montserrat`}
      >
        <div className="p-5">
          <h2
            className={`font-semibold text-2xl text-white mb-4 transition-all duration-1000`}
          >
            Marketplace
          </h2>
        </div>
        {routes?.map((route, index) => (
          <Link to={route.path} key={index}>
            <div
              onClick={() => closeSidebar()}
              key={index}
              className={`px-4 py-1 text-white text-base truncate cursor-pointer hover:bg-secondary ${
                location.pathname === route.path ? "bg-secondary" : ""
              }`}
            >
              {route.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
