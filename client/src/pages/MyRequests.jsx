import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "../styles/MyRequests.css";

import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const MyRequests = () => {
  const { user } = useContext(AuthContext);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const response = await api.get(`/blood-requests/hospital/${user._id}`);

      if (response.data.success) {
        const requestsWithAcceptedDonors = await Promise.all(
          response.data.requests.map(async (request) => {
            try {
              const donationResponse = await api.get(
                `/donations/request/${request._id}`,
              );

              const donations = donationResponse.data.donations || [];

              const acceptedDonors = donations.filter(
                (donation) => donation.status?.toLowerCase() === "accepted",
              ).length;

              return {
                ...request,
                acceptedDonors,
              };
            } catch (error) {
              console.error(
                `Failed to load responses for request ${request._id}`,
                error,
              );

              return {
                ...request,
                acceptedDonors: 0,
              };
            }
          }),
        );

        setRequests(requestsWithAcceptedDonors);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load blood requests.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchRequests();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="my-requests-page">
        <div className="requests-loading">
          <div className="loading-spinner"></div>
          <h2>Loading requests...</h2>
          <p>Getting your hospital blood requests.</p>
        </div>
      </div>
    );
  }

  const criticalRequests = requests.filter(
    (request) => request.urgency === "Critical",
  );

  const totalMatches = requests.reduce(
    (total, request) => total + (request.acceptedDonors || 0),
    0,
  );

  return (
    <div className="my-requests-page">
      <div className="my-requests-wrapper">
        {/* Back to Hospital Dashboard */}
        <Link to="/hospital-dashboard" className="requests-back-link">
          <span>←</span>
          Back to Dashboard
        </Link>

        {/* =========================
            HEADER
        ========================== */}
        <div className="requests-page-header">
          <div>
            <span className="requests-eyebrow">HOSPITAL MANAGEMENT</span>

            <h1>My Blood Requests</h1>

            <p>
              Manage your hospital's blood requests and monitor donor responses.
            </p>
          </div>

          <Link to="/create-request" className="new-request-button">
            <span>+</span>
            New Request
          </Link>
        </div>

        {/* =========================
            SUMMARY
        ========================== */}
        <div className="request-summary">
          <div className="request-summary-card">
            <div className="summary-icon total">#</div>

            <div>
              <span>Total Requests</span>
              <strong>{requests.length}</strong>
            </div>
          </div>

          <div className="request-summary-card">
            <div className="summary-icon critical">!</div>

            <div>
              <span>Critical Requests</span>
              <strong>{criticalRequests.length}</strong>
            </div>
          </div>

          <div className="request-summary-card">
            <div className="summary-icon donors">♥</div>

            <div>
              <span>Matched Donors</span>
              <strong>{totalMatches}</strong>
            </div>
          </div>
        </div>

        {/* =========================
            REQUESTS
        ========================== */}
        {requests.length === 0 ? (
          <div className="requests-empty-state">
            <div className="empty-icon">+</div>

            <h2>No Blood Requests Yet</h2>

            <p>
              Your hospital has not created any blood requests. Create your
              first request to start finding matching donors.
            </p>

            <Link to="/create-request" className="empty-create-button">
              Create Your First Request
            </Link>
          </div>
        ) : (
          <div className="requests-content">
            <div className="requests-content-header">
              <div>
                <h2>Your Requests</h2>
                <p>
                  {requests.length}{" "}
                  {requests.length === 1 ? "request" : "requests"} created
                </p>
              </div>
            </div>

            <div className="hospital-request-list">
              {requests.map((request) => {
                const matchedDonors = request.matchedDonors?.length || 0;

                return (
                  <div className="hospital-request-card" key={request._id}>
                    {/* Card Top */}
                    <div className="hospital-request-top">
                      <div className="blood-request-title">
                        <div className="blood-group-badge">
                          {request.bloodGroup}
                        </div>

                        <div>
                          <span className="request-label">BLOOD REQUEST</span>

                          <h2>{request.bloodGroup} Blood</h2>
                        </div>
                      </div>

                      <span
                        className={`request-urgency ${request.urgency?.toLowerCase()}`}
                      >
                        {request.urgency}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="hospital-request-details">
                      <div className="request-info-item">
                        <span>Units Needed</span>
                        <strong>{request.unitsNeeded}</strong>
                      </div>

                      <div className="request-info-item">
                        <span>Location</span>
                        <strong>
                          {request.city}, {request.state}
                        </strong>
                      </div>

                      <div className="request-info-item donor-match-info">
                        <span>Accepted Donors</span>

                        <strong>{request.acceptedDonors}</strong>

                        <small>
                          {request.acceptedDonors === 1
                            ? "donor accepted"
                            : "donors accepted"}
                        </small>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="hospital-request-footer">
                      <div className="request-status">
                        <span className="status-dot"></span>

                        <span>Request created</span>
                      </div>

                      <Link
                        to={`/my-requests/${request._id}`}
                        className="view-responses-button"
                      >
                        View Donor Responses
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;
