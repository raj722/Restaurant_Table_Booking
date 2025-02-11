import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Store,
  Table,
  Users,
  Calendar,
  Clock,
  CreditCard,
  Menu,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-gray-700 text-white sticky top-0 h-full transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <h1 className={`text-lg font-bold ${isOpen ? "block" : "hidden"}`}>Admin Panel</h1>
          <button onClick={toggleSidebar} className="text-white focus:outline-none">
            <Menu size={24} />
          </button>
        </div>
        <nav className="flex flex-col justify-between h-full mt-4">
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
      <div className="flex-1 p-6 ml-64"> {/* Added margin-left to create space for sidebar */}
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

const DashboardCard = ({ title, value }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-700">{value}</h2>
      <p className="text-gray-600">{title}</p>
    </div>
  );
};

export default Sidebar;
