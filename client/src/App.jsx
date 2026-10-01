import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CreateBloodRequest from "./pages/CreateBloodRequest";
import Notifications from "./pages/Notifications";
import MyRequests from "./pages/MyRequests";
import BloodRequestDetails from "./pages/BloodRequestDetails";
import HospitalRequestDetails from "./pages/HospitalRequestDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="/create-request" element={<CreateBloodRequest />} />

      <Route path="/notifications" element={<Notifications />} />

      <Route path="/my-requests" element={<MyRequests />} />

      <Route path="/my-requests/:id" element={<HospitalRequestDetails />} />

      <Route path="/blood-request/:id" element={<BloodRequestDetails />} />
    </Routes>
  );
}

export default App;
