import { events, getEventById } from "@/data/events";
import EventDetails from "./event-details";

export function generateStaticParams() {
  return events.map((event) => ({ id: event.id }));
}

export default async function EventDetailsPage({ params }) {
  const { id } = await params;
  const event = getEventById(id);

  return <EventDetails event={event} />;
}
