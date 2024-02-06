import React from "react";
import EventsTab from "./components/event-tab";
import EventCarousel from "./components/event-carousel";
import { api } from "~/trpc/server";

const MyEventsPage = async () => {
  const eventData = await api.event.getAll.query();

  return (
    <div>
      <EventCarousel events={eventData} />
      <EventsTab events={eventData} />
    </div>
  );
};

export default MyEventsPage;
