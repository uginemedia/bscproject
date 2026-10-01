import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import "../styles/Register.css";

import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "donor",

    // Donor information
    bloodGroup: "",
    genotype: "",
    gender: "",
    address: "",
    weight: "",
    state: "",
    city: "",

    // Hospital information
    hospitalName: "",
    hospitalAddress: "",
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
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.phone ||
      !formData.role
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/register", formData);

      if (response.data.success) {
        toast.success("Registration successful!");
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <div className="register-wrapper">

        {/* =====================================
            LEFT BRANDING PANEL
        ====================================== */}
        <div className="register-visual">

          <div className="register-brand">
            <div className="brand-symbol">+</div>

            <div>
              <strong>Blood Connect</strong>
              <span>Smart Blood Donation</span>
            </div>
          </div>

          <div className="register-visual-content">

            <span className="visual-label">
              JOIN THE COMMUNITY
            </span>

            <h1>
              One account.
              <br />
              <span>One life at a time.</span>
            </h1>

            <p>
              Join our smart blood donation network and help connect people
              who need blood with donors who can help.
            </p>

            <div className="register-benefits">

              <div className="register-benefit">
                <div className="benefit-icon">♥</div>

                <div>
                  <strong>Save Lives</strong>
                  <p>
                    Help patients find compatible blood donors.
                  </p>
                </div>
              </div>

              <div className="register-benefit">
                <div className="benefit-icon">✓</div>

                <div>
                  <strong>Smart Matching</strong>
                  <p>
                    Get matched based on your blood information and location.
                  </p>
                </div>
              </div>

              <div className="register-benefit">
                <div className="benefit-icon">!</div>

                <div>
                  <strong>Emergency Alerts</strong>
                  <p>
                    Receive notifications when your blood type is needed.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="register-visual-footer">
            <span>Blood Connect</span>
            <span>•</span>
            <span>Connecting donors with those in need</span>
          </div>

        </div>

        {/* =====================================
            REGISTRATION FORM
        ====================================== */}
        <div className="register-form-area">

          <div className="register-form-card">

            <div className="register-form-header">

              <span className="mobile-brand">
                BLOOD CONNECT
              </span>

              <h2>Create your account</h2>

              <p>
                Register to become a donor or connect your hospital to the
                blood donation network.
              </p>

            </div>

            <form onSubmit={handleSubmit}>

              {/* =================================
                  BASIC INFORMATION
              ================================== */}

              <div className="register-section">

                <div className="register-section-heading">
                  <span>01</span>

                  <div>
                    <h3>Basic Information</h3>
                    <p>Tell us about yourself.</p>
                  </div>
                </div>

                <div className="register-form-grid">

                  <div className="form-group full-width">
                    <label>
                      Full Name <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Email <span>*</span>
                    </label>

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Phone Number <span>*</span>
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Password <span>*</span>
                    </label>

                    <input
                      type="password"
                      name="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Account Type <span>*</span>
                    </label>

                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="donor">Blood Donor</option>
                      <option value="hospital">Hospital</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* =================================
                  DONOR INFORMATION
              ================================== */}

              {formData.role === "donor" && (
                <div className="register-section">

                  <div className="register-section-heading">
                    <span>02</span>

                    <div>
                      <h3>Donor Information</h3>
                      <p>
                        This information helps us find suitable blood matches.
                      </p>
                    </div>
                  </div>

                  <div className="register-form-grid">

                    <div className="form-group">
                      <label>Blood Group</label>

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
                      <label>Genotype</label>

                      <select
                        name="genotype"
                        value={formData.genotype}
                        onChange={handleChange}
                      >
                        <option value="">Select genotype</option>
                        <option value="AA">AA</option>
                        <option value="AS">AS</option>
                        <option value="SS">SS</option>
                        <option value="AC">AC</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Gender</label>

                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Weight (kg)</label>

                      <input
                        type="number"
                        name="weight"
                        placeholder="e.g. 70"
                        value={formData.weight}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Address</label>

                      <input
                        type="text"
                        name="address"
                        placeholder="Enter your residential address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>State</label>

                      <input
                        type="text"
                        name="state"
                        placeholder="Enter your state"
                        value={formData.state}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>City</label>

                      <input
                        type="text"
                        name="city"
                        placeholder="Enter your city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>

                  </div>
                </div>
              )}

              {/* =================================
                  HOSPITAL INFORMATION
              ================================== */}

              {formData.role === "hospital" && (
                <div className="register-section">

                  <div className="register-section-heading">
                    <span>02</span>

                    <div>
                      <h3>Hospital Information</h3>
                      <p>
                        Provide your hospital's basic information.
                      </p>
                    </div>
                  </div>

                  <div className="register-form-grid">

                    <div className="form-group full-width">
                      <label>Hospital Name</label>

                      <input
                        type="text"
                        name="hospitalName"
                        placeholder="Enter hospital name"
                        value={formData.hospitalName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Hospital Address</label>

                      <input
                        type="text"
                        name="hospitalAddress"
                        placeholder="Enter hospital address"
                        value={formData.hospitalAddress}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>State</label>

                      <input
                        type="text"
                        name="state"
                        placeholder="Hospital state"
                        value={formData.state}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>City</label>

                      <input
                        type="text"
                        name="city"
                        placeholder="Hospital city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>

                  </div>
                </div>
              )}

              {/* =================================
                  SUBMIT
              ================================== */}

              <div className="register-submit">

                <button
                  type="submit"
                  disabled={loading}
                  className="register-button"
                >
                  {loading ? (
                    <>
                      <span className="register-spinner"></span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <span>→</span>
                    </>
                  )}
                </button>

                <p>
                  By creating an account, you agree to provide accurate
                  information for donor matching.
                </p>

              </div>

            </form>

            <div className="auth-footer">
              Already have an account?{" "}
              <Link to="/">Login</Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;