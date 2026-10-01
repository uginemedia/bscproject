import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../styles/CreateBloodRequest.css";

import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const CreateBloodRequest = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    unitsNeeded: "",
    urgency: "Normal",
    reason: "",
    state: user?.state || "",
    city: user?.city || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.patientName ||
      !formData.bloodGroup ||
      !formData.unitsNeeded ||
      !formData.reason ||
      !formData.state ||
      !formData.city
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/blood-requests", {
        ...formData,
        hospital: user._id,
      });

      if (response.data.success) {
        toast.success(
          `Request created. ${response.data.totalMatches} matching donor(s) found.`,
        );

        navigate("/my-requests");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create blood request.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blood-request-page">
      <div className="blood-request-wrapper">

        {/* Page Header */}
        <div className="blood-request-header">
          <div className="header-icon">
            +
          </div>

          <div>
            <p className="header-label">EMERGENCY BLOOD SERVICES</p>
            <h1>Create Blood Request</h1>
            <p>
              Provide the patient's blood requirements and we'll automatically
              search for matching donors.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="blood-request-layout">

          {/* Form Card */}
          <div className="blood-request-card">

            <div className="section-heading">
              <span className="section-number">01</span>

              <div>
                <h2>Patient Information</h2>
                <p>Enter the basic information about the patient.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>

              {/* Patient Name */}
              <div className="form-group">
                <label>
                  Patient Name <span>*</span>
                </label>

                <input
                  type="text"
                  name="patientName"
                  placeholder="Enter patient's full name"
                  value={formData.patientName}
                  onChange={handleChange}
                />
              </div>

              {/* Blood Group + Units */}
              <div className="form-row">

                <div className="form-group">
                  <label>
                    Blood Group <span>*</span>
                  </label>

                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                  >
                    <option value="">Select blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Units Needed <span>*</span>
                  </label>

                  <input
                    type="number"
                    name="unitsNeeded"
                    min="1"
                    placeholder="e.g. 2"
                    value={formData.unitsNeeded}
                    onChange={handleChange}
                  />
                </div>

              </div>

              {/* Urgency */}
              <div className="form-group">
                <label>
                  Urgency Level <span>*</span>
                </label>

                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className={`urgency-select ${formData.urgency.toLowerCase()}`}
                >
                  <option value="Normal">Normal</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Critical">Critical</option>
                </select>

                <small>
                  Select Critical only when blood is needed immediately.
                </small>
              </div>

              {/* Reason Section */}
              <div className="section-heading form-section-heading">
                <span className="section-number">02</span>

                <div>
                  <h2>Request Details</h2>
                  <p>Explain why the blood is required.</p>
                </div>
              </div>

              <div className="form-group">
                <label>
                  Reason for Blood Request <span>*</span>
                </label>

                <textarea
                  name="reason"
                  placeholder="Example: Blood is required for a patient undergoing surgery..."
                  value={formData.reason}
                  onChange={handleChange}
                  rows="5"
                />

                <small>
                  Provide enough information to help donors understand the
                  situation.
                </small>
              </div>

              {/* Location Section */}
              <div className="section-heading form-section-heading">
                <span className="section-number">03</span>

                <div>
                  <h2>Blood Needed Location</h2>
                  <p>Where is the blood required?</p>
                </div>
              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>
                    State <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="state"
                    placeholder="e.g. Enugu"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>
                    City <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="city"
                    placeholder="e.g. Nsukka"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

              </div>

              {/* Submit */}
              <div className="submit-area">
                <button
                  type="submit"
                  className="create-request-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="button-spinner"></span>
                      Finding Donors...
                    </>
                  ) : (
                    <>
                      Create Blood Request
                      <span>→</span>
                    </>
                  )}
                </button>

                <p>
                  Matching donors will be notified automatically after the
                  request is created.
                </p>
              </div>

            </form>
          </div>

          {/* Information Panel */}
          <aside className="request-info-panel">

            <div className="info-panel-icon">
              ♥
            </div>

            <h2>How it works</h2>

            <p>
              Our smart matching system searches for available donors based
              on the blood requirements you provide.
            </p>

            <div className="info-step">
              <div className="step-icon">1</div>

              <div>
                <h3>Create Request</h3>
                <p>
                  Enter the patient's blood requirements and location.
                </p>
              </div>
            </div>

            <div className="info-step">
              <div className="step-icon">2</div>

              <div>
                <h3>Find Matching Donors</h3>
                <p>
                  The system searches for donors with matching blood
                  information.
                </p>
              </div>
            </div>

            <div className="info-step">
              <div className="step-icon">3</div>

              <div>
                <h3>Notify Donors</h3>
                <p>
                  Matching available donors receive an emergency notification.
                </p>
              </div>
            </div>

            <div className="info-panel-note">
              <strong>Important</strong>
              <p>
                Make sure the blood group, location and number of units are
                entered correctly before submitting.
              </p>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
};

export default CreateBloodRequest;