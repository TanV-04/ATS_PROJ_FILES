import React, { useEffect } from "react";

const MonitorPerformance = () => {
  useEffect(() => {
    document.title = "Monitor Performance"; // Change this to your desired title
  }, []);

  return (
    <div>
      <h1>System Performance & Security</h1>
      <div>{/* Metrics and graphs for performance */}</div>
      <div>{/* Security alerts and logs */}</div>
    </div>
  );
};

export default MonitorPerformance;
