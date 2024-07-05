import React, { useState, useEffect } from "react";
import TraineeDashboard from "../components/TraineeDashboard";
import TrainerDashboard from "../components/TrainerDashboard";

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  return (
    <div>
      {userRole === 'trainee' && <TraineeDashboard />}
      {userRole === 'trainer' && <TrainerDashboard />}
    </div>
  );
};

export default Dashboard;