import React from "react";
import EngineeringTimeline from "./components/EngineeringTimeline";
import ProfeIA from "./components/ProfeIA";

export default function App() {
  return (
    <div className="app-container">
      <EngineeringTimeline />
      <ProfeIA principleId={1} ageAvg={10} />
    </div>
  );
}
