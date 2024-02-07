import { Container, Grid } from "@mui/material";
import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { api } from "~/trpc/server";
import EventCard from "./events/components/event-card";
import type { EventResponse } from "./_types/event-response";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function Home() {
  noStore();

  const eventData: EventResponse[] = await api.event.getAll.query();

  return (
    <main className="flex flex-col">
      {/* Hero shot */}
      <div
        className="hero-shot-cont flex flex-col justify-between"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://images.unsplash.com/photo-1524247108137-732e0f642303?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center 80%",
          backgroundAttachment: "scroll",
          opacity: 0.9,
          minHeight: "40vh",
        }}
      >
        <h1 className="mb-5 ml-5 mt-5 text-3xl font-bold text-white">
          Hi! Ready to grow?
        </h1>
        <h2 className="mb-2 ml-5 whitespace-pre-line text-xl text-white">
          Reconnect with nature and community.{"\n"}
          Plant your seeds of growth with us!
        </h2>
      </div>
      <h2 className="mb-5 ml-5 mt-5 text-3xl font-bold">Our Events</h2>
      <Container className="mb-5">
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignContent="center"
        >
          {eventData.map((event) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
              <EventCard {...event} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
