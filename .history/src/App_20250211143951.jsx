import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Authentication/AuthContext";
import Navbar from "./components/Navbar";
import BookingPage from "./pages/BookingPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./Authentication/LoginPage";
import SignupPage from "./Authentication/SignupPage";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import RestaurantDetailsPage from "./Restaurant/RestaurantDetailsPage"; 
import AdminDashboard from "./Admin/AdminDashboard";
import RestaurantPage from "./Restaurant/RestaurantPage";
import UpdateTable from "./Restaurant/UpdateTable";
import ProfilePage from "./UserProfile/ProfilePage";
import BookingsManagement from "./Restaurant/BookingsManagement";
import CustomerDetails from "./Restaurant/CustomerDetails";
import RestaurantSignupPage from "./Restaurant/RestaurantSignupPage";
import RestaurantLoginPage from "./Restaurant/RestaurantLoginPage";
import Restaurants from "./Admin/Restaurants";
import Customers from "./Admin/Customers";
import Payments from "./Admin/Payments";
import Reservations from './Admin/Reservations';

function App() {
  return (
    <AuthProvider>
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
        <Route path="/restaurant-signup" element={<RestaurantSignupPage />} />
        <Route path="/restaurant-login" element={<RestaurantLoginPage />} />
        <Route path="/admin/restaurants" element={<Restaurants />} />
        <Route path="/admin/customers" element={<Customers />} />
        <Route path="/admin/payments" element={<Payments />} />
        <Route path="/admin/reservations" element={<Reservations />} />

        
      </Routes>
      <Footer />
    </Router>
    </AuthProvider>
  );
}

export default App;