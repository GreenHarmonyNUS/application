import React from "react";
import EventsTab from "./components/event-tab";
import EventCarousel from "./components/event-carousel";
import { api } from "~/trpc/server";
import type { EventResponse } from "../_types/event-response";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { Button } from "@mui/material";
import Link from "next/link";

const MyEventsPage = async () => {
  const session = await getServerSession(authOptions);
  const suggestedEvents = session
    ? await api.event.getSuggested.query({
        userId: session.user.id,
      })
    : [];
  const eventData: EventResponse[] = await api.event.getAll.query();

  return (
    <div className="mb-16 mt-4 flex flex-col justify-center">
      {session ? (
        <div>
          <h1 className="pt-4 text-center text-2xl">Your suggested events</h1>
          <EventCarousel events={suggestedEvents} />
        </div>
      ) : (
        <h1 className="py-4 text-center text-2xl">Our events</h1>
      )}
      <EventsTab events={eventData} />
      {session && (
        <Button>
          <Link href="/events/create">Create an event</Link>
        </Button>
      )}
    </div>
  );
};

export default MyEventsPage;
export const dynamic = "force-dynamic";
