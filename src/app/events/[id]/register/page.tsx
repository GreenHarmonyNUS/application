import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import { authOptions } from "~/server/auth";

const EventRegister = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const { id: eventId } = params;

  // Guard clauses
  if (!session) redirect(`/events/${eventId}`);
  const isRegistered = await api.event.isRegistered.query({
    eventId: Number(eventId),
    userId: session?.user.id,
  });
  if (isRegistered) redirect(`/events/${eventId}`);

  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  await api.eventRegistrations.create.mutate({
    eventId: +eventId,
    participant: session?.user.id,
  });
  redirect("/dashboard");
};

export default EventRegister;
