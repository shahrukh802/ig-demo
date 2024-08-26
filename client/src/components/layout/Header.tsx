import { BsList } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/AuthService";

interface IProps {
  setSidebarOpen: (e: boolean) => void;
  sidebarOpen: boolean;
}

const Header = ({ setSidebarOpen, sidebarOpen }: IProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="w-full flex h-[75px] bg-black border-[#333333] border-b-[1px] items-center px-5">
      <div className="flex flex-grow w-[370px]">
        <a href="#" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <BsList size={20} className="text-white md:hidden" />
        </a>
        <Link to="/home">
          <div className="text-white md:flex hidden">Logo</div>
        </Link>
      </div>
      <div
        className="flex text-white justify-end cursor-pointer hover:text-secondary"
        onClick={handleLogout}
      >
        Logout
      </div>
    </div>
  );
};

export default Header;
