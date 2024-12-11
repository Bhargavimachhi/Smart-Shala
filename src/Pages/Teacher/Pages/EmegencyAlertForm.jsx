// TeacherPage.js
import React, { useState } from "react";
import axios from "axios";

const TeacherPage = () => {
  const [alertData, setAlertData] = useState({
    type: "",
    severity: "",
    urgency: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setAlertData({ ...alertData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/alerts", alertData);
      setMessage("Alert submitted successfully!");
      setAlertData({ type: "", severity: "", urgency: "" });
    } catch (error) {
      console.error("Error submitting alert:", error);
      setMessage("Failed to submit alert.");
    }
  };

  return (
    <div>
      <h2>Emergency Alert Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Alert Type:
          <input
            type="text"
            name="type"
            value={alertData.type}
            onChange={handleChange}
            placeholder="e.g., Fire, Electrical Issue"
            required
          />
        </label>
        <br />
        <label>
          Severity Level:
          <select name="severity" value={alertData.severity} onChange={handleChange} required>
            <option value="">Select Severity</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <br />
        <label>
          Urgency:
          <select name="urgency" value={alertData.urgency} onChange={handleChange} required>
            <option value="">Select Urgency</option>
            <option value="Immediate">Immediate</option>
            <option value="Urgent">Urgent</option>
            <option value="Non-Urgent">Non-Urgent</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit Alert</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TeacherPage;