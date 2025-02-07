import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookingPage from "./pages/BookingPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage"; 
import AdminDashboard from "./Admin/AdminDashboard";
import RestaurantPage from "./Restaurant/RestaurantPage";
import UpdateTable from "./Restaurant/UpdateTable";
import ProfilePage from "./UserProfile/ProfilePage";
import BookingsManagement from "./Restaurant/BookingsManagement";
import CustomerDetails from "./Restaurant/CustomerDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/restaurant/:id" element={<RestaurantDetailsPage />} /> 
        <Route path="/restaurant" element={<RestaurantPage />} />
        <Route path="/restaurant/update-table" element={<UpdateTable />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/restaurant/bookings-management" element={<BookingsManagement />} />
        <Route path="/restaurant/customer-details/:customerId" element={<CustomerDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;