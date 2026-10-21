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
    bloodGroup: "",
    unitsNeeded: "",
    urgency: "Normal",
    state: user?.state || "",
    city: user?.city || "",
    bloodComponentType: "Whole Blood",
    specialProcessingNeeds: [],
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
      !formData.bloodGroup ||
      !formData.unitsNeeded ||
      !formData.state ||
      !formData.city ||
      !formData.bloodComponentType
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
          <div className="header-icon">+</div>

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

              {/* Blood Component Type */}
              <div className="form-group">
                <label htmlFor="bloodComponentType">
                  Blood Component Type <span>*</span>
                </label>

                <select
                  id="bloodComponentType"
                  name="bloodComponentType"
                  value={formData.bloodComponentType}
                  onChange={handleChange}
                  required
                >
                  <option value="Whole Blood">Whole Blood</option>
                  <option value="Packed Red Blood Cells (PRBC)">
                    Packed Red Blood Cells (PRBC)
                  </option>
                  <option value="Platelets">Platelets</option>
                  <option value="Fresh Frozen Plasma (FFP)">
                    Fresh Frozen Plasma (FFP)
                  </option>
                </select>
              </div>

              {/* Special Processing Needs */}
              <div className="form-group">
                <label>Special Processing Needs</label>

                <div className="processing-options">
                  {["Irradiated", "Leukoreduced", "CMV Negative"].map(
                    (option) => (
                      <label className="processing-checkbox" key={option}>
                        <input
                          type="checkbox"
                          checked={formData.specialProcessingNeeds.includes(
                            option,
                          )}
                          onChange={(e) => {
                            const updatedNeeds = e.target.checked
                              ? [...formData.specialProcessingNeeds, option]
                              : formData.specialProcessingNeeds.filter(
                                  (need) => need !== option,
                                );

                            setFormData((prev) => ({
                              ...prev,
                              specialProcessingNeeds: updatedNeeds,
                            }));
                          }}
                        />

                        <span>{option}</span>
                      </label>
                    ),
                  )}
                </div>

                <small>
                  Select any special processing requirements for the blood.
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
            <div className="info-panel-icon">♥</div>

            <h2>How it works</h2>

            <p>
              Our smart matching system searches for available donors based on
              the blood requirements you provide.
            </p>

            <div className="info-step">
              <div className="step-icon">1</div>

              <div>
                <h3>Create Request</h3>
                <p>Enter the patient's blood requirements and location.</p>
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
