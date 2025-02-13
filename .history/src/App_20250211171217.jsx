import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./Authentication/AuthContext"; // Import useAuth
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
import Reservations from "./Admin/Reservations";
import Tables from "./Admin/Tables";
import TimeSlots from "./Admin/TimeSlots";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { user, role } = useAuth(); // Get user and role from AuthContext

  return (
    <>
      {/* Show Navbar for all roles except admin */}
      {role !== "admin" && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/restaurant-signup" element={<RestaurantSignupPage />} />
        <Route path="/restaurant-login" element={<RestaurantLoginPage />} />

        {user ? (
          <>
            {/* Routes for Customers */}
            {role === "customer" && (
              <>
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/restaurant/:id" element={<RestaurantDetailsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </>
            )}

            {/* Routes for Restaurant Users */}
            {role === "restaurant" && (
              <>
                <Route path="/restaurant" element={<RestaurantPage />} />
                <Route path="/restaurant/update-table" element={<UpdateTable />} />
                <Route path="/restaurant/bookings-management" element={<BookingsManagement />} />
                <Route path="/restaurant/customer-details/:customerId" element={<CustomerDetails />} />
                <Route path="/profile" element={<ProfilePage />} />
              </>
            )}

            {/* Routes for Admin */}
            {role === "admin" && (
              <>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/restaurants" element={<Restaurants />} />
                <Route path="/admin/customers" element={<Customers />} />
                <Route path="/admin/payments" element={<Payments />} />
                <Route path="/admin/reservations" element={<Reservations />} />
                <Route path="/admin/tables" element={<Tables />} />
                <Route path="/admin/timeslots" element={<TimeSlots />} />
              </>
            )}

            {/* Redirect to home if user tries to access unauthorized routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          // Redirect to login if user is not authenticated
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>

      {/* Show Footer for all roles except admin */}
      {role !== "admin" && <Footer />}
    </>
  );
}

export default App;