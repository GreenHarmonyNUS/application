import React from "react";
import EventCard, { dummyEvent1 } from "../_components/event-card";
import MetricBlock, {
  metricDummyBottles,
  metricDummyCans,
  metricDummyCompost,
  metricGoal12,
  metricGoal13,
  metricGoal2,
} from "./components/metric-block";
import ProgressionBlock, { progressionDummyAgri, progressionDummyHandicraft, progressionDummySustainability } from "./components/progression-block";

interface HomepageProps {
  username: string;
}

const HomepageComponent = () => {
  // TODO: Get these data programatically
  const user = "Keith Chua";
  const event = dummyEvent1;
  const metrics = [metricDummyBottles, metricDummyCans, metricDummyCompost];
  const top3_UNSDG = [metricGoal2, metricGoal12, metricGoal13];
  const progression = [progressionDummyAgri, progressionDummySustainability, progressionDummyHandicraft];

  return (
    <div>
      <div className="navbar mb-2 w-full bg-green-500 p-4 text-center text-white">
        this is a navbar
      </div>
      {/* Content container */}
      <div className="m-0">
        {/* Align things with margin 5 */}
        <div className="m-5">
          {/* Welcome splash text */}
          <h1 className="text-3xl font-bold">Welcome back,</h1>
          <h3 className="mb-5 text-xl">{user}</h3>

          {/* Your Events */}
          <h1 className="text-2xl font-bold">Your Events</h1>
          <div className="mb-5">
            carousell container
            <EventCard {...event} />
          </div>
          <div className="mb-5"></div>
        </div>

        {/* Your Contributions (UNSG, Raw Metrics) */}
        <div
          className="metric-and-unsg-cont"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.85,
          }}
        >
          {/* Raw Metric Contributions */}
          <div className="metric-cont flex flex-col items-center">
            <h1 className="text-center text-2xl font-bold text-white">
              Your Contributions
            </h1>
            <div className="flex flex-col items-start">
              <div
                className="metric-block-cont w-fit-content flex flex-col items-start"
                style={{ width: "fit-content" }}
              >
                {metrics.map((metric) => (
                  <MetricBlock key={metric.metric_name} {...metric} />
                ))}
              </div>
            </div>
          </div>

          {/* UN SDG Contributions */}
          <div className="unsdg-cont  flex flex-col items-center">
            <h1 className="mb-5 text-center text-2xl font-bold text-white">
              Top 3 UN SDG
            </h1>
            {/* TODO: column-wise contributions */}
            <div className="flex flex-col items-start">
              <div
                className="metric-block-cont w-fit-content flex flex-col items-start"
                style={{ width: "fit-content" }}
              >
                {top3_UNSDG.map((metric) => (
                  <MetricBlock key={metric.metric_name} {...metric} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Your Progression */}
        <div className="m-5">
          <h1 className="text-2xl font-bold mb-5">Your Growth</h1>
            {progression.map((prog)=>(
                <div key={prog.eventTagName} className="mt-2 mb-2">
                    <ProgressionBlock  {...prog}/>
                </div>
            ))}
          <div className="mb-5"></div>
        </div>
      </div>

      <div className="w-full bg-blue-500 p-4 text-center text-white">
        This is a footer
      </div>
    </div>
  );
};

export default HomepageComponent;
