import React from "react";
import EventsTab from "./components/event-tab";
import EventCarousel from "./components/event-carousel";
import { api } from "~/trpc/server";
import type { EventResponse } from "../_types/event-response";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

const MyEventsPage = async () => {
  const session = await getServerSession(authOptions);
  const suggestedEvents = await api.event.getSuggested.query({
    userId: session?.user.id ?? "",
  });
  const eventData: EventResponse[] = await api.event.getAll.query();

  return (
    <div>
      {session ? (
        <>
          <h1 className="pt-4 text-center text-2xl">Your suggested events</h1>
          <EventCarousel events={suggestedEvents} />
        </>
      ) : (
        <h1 className="py-4 text-center text-2xl">Our events</h1>
      )}
      <EventsTab events={eventData} />
    </div>
  );
};

export default MyEventsPage;
export const dynamic = "force-dynamic";
