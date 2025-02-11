import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, Store, Table, Users, Calendar, Clock, CreditCard, Menu 
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`bg-gray-800 text-white h-screen transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>
        <div className="flex items-center justify-between p-4">
          <h1 className={`text-lg font-bold ${isOpen ? "block" : "hidden"}`}>Admin Panel</h1>
          <button onClick={toggleSidebar} className="text-white focus:outline-none">
            <Menu size={24} />
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            <SidebarItem icon={<LayoutDashboard />} text="Dashboard" link="/admin" isOpen={isOpen} />
            <SidebarItem icon={<Store />} text="Restaurants" link="/admin/restaurants" isOpen={isOpen} />
            <SidebarItem icon={<Table />} text="Tables" link="/admin/tables" isOpen={isOpen} />
            <SidebarItem icon={<Users />} text="Customers" link="/admin/customers" isOpen={isOpen} />
            <SidebarItem icon={<Calendar />} text="Reservations" link="/admin/reservations" isOpen={isOpen} />
            <SidebarItem icon={<Clock />} text="Time Slots" link="/admin/timeslots" isOpen={isOpen} />
            <SidebarItem icon={<CreditCard />} text="Payments" link="/admin/payments" isOpen={isOpen} />
          </ul>
        </nav>
      </div>
      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        {/* Main Content Goes Here */}
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, link, isOpen }) => {
  return (
    <li className="flex items-center p-3 cursor-pointer hover:bg-blue-800">
      <Link to={link} className="flex items-center w-full">
        {icon} 
        <span className={`ml-4 text-base ${isOpen ? "block" : "hidden"}`}>{text}</span>
      </Link>
    </li>
  );
};

export default Sidebar;
