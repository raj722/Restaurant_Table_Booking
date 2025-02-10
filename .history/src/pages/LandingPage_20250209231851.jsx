import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Element } from "react-scroll";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { auth,db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const LandingPage = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const sliderRef = React.useRef(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserRole(userSnap.data().role);
        }
      }
    };
    fetchUserRole();
  }, []);

  const handleRestaurantClick = (id) => {
    if (userRole === "CustomerUser") {
      navigate(`/restaurant/${id}`);
    } else {
      alert("Only customers can view restaurant details!");
    }
  };

  return (
    <div>
      {/* Your existing Landing Page Code remains unchanged */}
    </div>
  );
};

export default LandingPage;
