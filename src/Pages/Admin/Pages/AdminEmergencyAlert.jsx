import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';





function AdminEmergencyAlert() {
    const [alerts, setAlerts] = useState([]);
    const [isNewAlert, setIsNewAlert] = useState(false);
    useEffect(() => {
        fetchAlerts(); // Initial fetch
        const intervalId = setInterval(fetchAlerts, 10000); // Auto-refresh every 10 seconds
    
        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [alerts]); // Make sure useEffect runs when alerts change
    
    const fetchAlerts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/emergency/admin');
            const newAlerts = response.data;
    
            // Check if there is a new alert (compare lengths or other methods)
            if (newAlerts.length > alerts.length) {
                setIsNewAlert(true);
            } else {
                setIsNewAlert(false);
            }
    
            // Update the alerts state
            setAlerts(newAlerts);
    
            // Play sound if a new alert is added
            if (isNewAlert && audioRef.current) {
                audioRef.current.currentTime = 0; // Reset to start
                audioRef.current.play().catch((error) => {
                    console.error('Error playing audio:', error);
                });
            }
    
        } catch (error) {
            console.error('Error fetching alerts:', error);
        }
    };

    return (
        <div className="p-5 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-5">Emergency Notifications</h2>
           

            {/* Audio element with online source */}
            

            <div className="grid grid-cols-1 gap-4">
           

                {alerts.map((alert) => (
                    <div
                        key={alert._id}
                        className="p-4 bg-white shadow-md rounded flex justify-between items-center"
                    >
                        <div>
                            <p>
                                <strong>Type:</strong> {alert.emergencyType}
                            </p>
                            <p>
                                <strong>Severity:</strong> {alert.severity}
                            </p>
                            <p>
                                <strong>Location:</strong> {alert.location}
                            </p>
                            <p>
                                <strong>Created At:</strong>{' '}
                                {new Date(alert.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminEmergencyAlert;
