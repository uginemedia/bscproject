import React from "react";

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import "../styles/Dashboard.css";

const HospitalDashboard = () => {
  const { hospital, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  //       const { user, logout } = useContext(AuthContext);
  //   const navigate = useNavigate();

  //   const handleLogout = () => {
  //     logout();
  //     navigate("/");
  //   };

  return (
    <div className="dashboard-content">
      {/* Hospital Actions */}
      <div className="section-title">
        <div>
          <h2>Quick Actions</h2>
          <p>Manage your blood requests</p>
        </div>
      </div>

      <div className="dashboard-actions hospital-actions">
        <Link
          to="/create-request"
          className="dashboard-action create-request-action"
        >
          <div className="action-icon">+</div>

          <div className="action-content">
            <h3>Create Blood Request</h3>

            <p>Create an emergency blood request and find matching donors.</p>

            <span className="action-link">Create Request →</span>
          </div>
        </Link>

        <Link to="/my-requests" className="dashboard-action">
          <div className="action-icon request-icon">📋</div>

          <div className="action-content">
            <h3>My Requests</h3>

            <p>View and manage the blood requests created by your hospital.</p>

            <span className="action-link">View Requests →</span>
          </div>
        </Link>

        <Link to="/hospital-profile" className="dashboard-action">
          <div className="action-icon profile-icon">🏥</div>

          <div className="action-content">
            <h3>Hospital Profile</h3>

            <p>View and update your hospital information.</p>

            <span className="action-link">View Profile →</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HospitalDashboard;
