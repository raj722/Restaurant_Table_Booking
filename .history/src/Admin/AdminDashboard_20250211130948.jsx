import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, Store, Table, Users, Calendar, Clock, CreditCard, Menu, LogOut, Settings
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`bg-gray-700 text-white h-screen flex flex-col justify-between transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>
        <div>
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
        {/* Sidebar Footer */}
        <div className="mb-4">
          <SidebarItem icon={<Settings />} text="Settings" link="/admin/settings" isOpen={isOpen} />
          <SidebarItem icon={<LogOut />} text="Logout" link="/logout" isOpen={isOpen} />
        </div>
      </div>
      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        {/* Main Content Goes Here */}
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        {/* Dashboard Metrics Section */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          <DashboardCard title="Total Bookings" value="120" />
          <DashboardCard title="Total Revenue" value="$15,000" />
          <DashboardCard title="Active Reservations" value="30" />
        </div>
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
