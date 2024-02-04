// page.tsx or wherever you're using EventsTab
import React from "react";
import dynamic from "next/dynamic";
import EventsTab from "./components/event-tab";

const MyEventsPage = () => {
  return (
    <div>
      <EventsTab />
    </div>
  );
};

export default MyEventsPage;
