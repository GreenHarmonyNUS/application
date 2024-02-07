"use client";
import { api } from "~/trpc/react";
import CreateEventForm from "./_components/CreateEventForm";
import type { EventInput } from "./_components/CreateEventForm";
import type { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const CreateEventPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);
  const locations = api.eventLocation.getAll.useQuery().data ?? [];
  const createEventMutation = api.event.create.useMutation();
  const submitEvent: SubmitHandler<EventInput> = async (eventData) => {
    const {
      name,
      details,
      location,
      imageUrl: image,
      date: timestamp,
      duration,
    } = eventData;

    createEventMutation.mutate({
      name,
      details,
      location: { connect: { id: location } },
      image,
      timestamp,
      approvalStatus: "PENDING" as const,
      organiser: { connect: { id: session?.user.id } },
      duration: +duration,
    });
    router.push("/events");
  };

  return (
    <main className="p-8 md:px-32 md:py-16">
      <h1 className="text-bold text-center text-4xl">Create Event</h1>
      <CreateEventForm locations={locations} submitHandler={submitEvent} />
    </main>
  );
};

export default CreateEventPage;
export const dynamic = "force-dynamic";
