import React from "react";
import EventsTab from "./components/event-tab";
import EventCarousel from "./components/event-carousel";
import { api } from "~/trpc/server";
import type { EventResponse } from "../_types/event-response";

const MyEventsPage = async () => {
  const eventData: EventResponse[] = await api.event.getAll.query();

  return (
    <div>
      <EventCarousel events={eventData} />
      <EventsTab events={eventData} />
    </div>
  );
};

export default MyEventsPage;
export const dynamic = "force-dynamic";
