import React from "react";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import { Box, Typography, CardMedia, Button } from "@mui/material";
import dayjs from "dayjs";
import type { EventResponse } from "../../_types/event-response";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

const EventDetailsPage: React.FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const session = await getServerSession(authOptions);
  const { id } = params;
  const event: EventResponse | null = await api.event.getOne.query({
    id: Number(id),
  });
  if (!event) redirect("/events");

  return (
    <Box sx={{ padding: 3 }}>
      <CardMedia
        component="img"
        sx={{
          height: 400,
          objectFit: "cover",
          marginBottom: 2,
        }}
        image={event.image ?? "/assets/default.jpg"}
        alt={event.name}
      />
      <Typography variant="h4" gutterBottom>
        {event.name}
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Date & Time: {dayjs(event.timestamp).format("DD MMM YYYY (ddd) HH:mm")}
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Duration: {event.duration} minutes
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Location: {event.location.name}
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Details: {event.details}
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Approval Status: {event.approvalStatus}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, marginTop: 2 }}>
        {event.tags?.map((tag, index) => (
          <Typography
            key={index}
            variant="body2"
            color="primary"
            component="span"
          >
            #{tag.name}
          </Typography>
        ))}
      </Box>
      {/* Register Button */}
      <Box className="mt-2">
        {session && (
          <Button
            variant="contained"
            href={`/events/${id}/register`}
            color="success"
          >
            Register
          </Button>
        )}
        {!session && (
          <Button variant="contained" href={`/api/auth/signin`} color="success">
            Register
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default EventDetailsPage;
