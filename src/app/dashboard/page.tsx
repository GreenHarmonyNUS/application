import React from "react";
import EventCard from "../events/components/event-card";
import MetricBlock, {
  metricDummyBottles,
  metricDummyCans,
  metricDummyCompost,
  metricGoal12,
  metricGoal13,
  metricGoal2,
} from "./components/metric-block";
import ProgressionBlock, {
  progressionDummyAgri,
  progressionDummyHandicraft,
  progressionDummySustainability,
} from "./components/progression-block";
import type { EventResponse } from "../_types/event-response";
import { api } from "~/trpc/server";

const HomepageComponent = async () => {
  // TODO: Get these data programatically
  const user = "Keith Chua";
  const metrics = [metricDummyBottles, metricDummyCans, metricDummyCompost];
  const top3_UNSDG = [metricGoal2, metricGoal12, metricGoal13];
  const progression = [
    progressionDummyAgri,
    progressionDummySustainability,
    progressionDummyHandicraft,
  ];
  const eventData: EventResponse[] = await api.event.getAll.query();

  console.log(eventData);
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Welcome splash text and events */}
      <div className="mt-5" style={{ maxWidth: "80vw" }}>
        {/* Welcome splash text */}
        <h1 className="text-3xl font-bold">Welcome back,</h1>
        <h3 className="mb-5 mt-2 text-2xl">{user}</h3>

        {/* Your Events */}
        <h1 className="text-2xl font-bold">Your Events</h1>
        <div className="carou-cont flex items-center justify-center">
          <div className="flex-column mb-5 flex max-w-screen-xl items-center overflow-auto">
            {eventData.map((event) => (
              <div key={event.id} className="m-5">
                <EventCard {...event} />
              </div>
            ))}
            {/* Additional EventCard components if needed */}
          </div>
          <div className="mb-5"></div>
        </div>
      </div>

      {/* Your Contributions (UNSG, Raw Metrics) */}
      <div
        className="metric-and-unsg-cont"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          opacity: 0.85,
          width: "100vw",
        }}
      >
        {/* Raw Metric Contributions */}
        <div className="metric-cont flex flex-col items-center pt-10">
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
        <div className="unsdg-cont  flex flex-col items-center pb-4">
          <h1 className="text-center text-2xl font-bold text-white">
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
      <div style={{ maxWidth: "95vw" }}>
        <div className="m-5">
          <h1 className="mb-2 text-2xl font-bold">Your Growth</h1>
          <h2 className="text-l mb-5 whitespace-pre-line">
            Your hard work has helped you grow...{"\n"}
            Let&apos;s get 100 hours to be an expert!{"\n"}
            Here&apos;s how far you&apos;ve come with us:{"\n"}
          </h2>
          {progression.map((prog) => (
            <div key={prog.eventTagName} className="mb-2 mt-2">
              <ProgressionBlock {...prog} />
            </div>
          ))}
          <div className="mb-5"></div>
        </div>
      </div>
    </div>
  );
};

export default HomepageComponent;
export const dynamic = "force-dynamic";
