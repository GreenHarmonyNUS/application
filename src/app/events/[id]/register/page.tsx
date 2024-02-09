import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

const EventRegister = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession();
  const { id: eventId } = params;
  if (!session) redirect("/events");
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  await api.eventRegistrations.create.mutate({
    eventId: +eventId,
    participant: session?.user.id,
  });
  redirect("/dashboard");
};

export default EventRegister;
