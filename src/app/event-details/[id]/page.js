import { events, getEventById } from "@/data/events";
import EventDetails from "./event-details";

export const instant = false;

export function generateStaticParams() {
  return events.map((event) => ({ id: event.id }));
}

export default async function EventDetailsPage({ params }) {
  const { id } = await params;
  const event = getEventById(id);

  return <EventDetails key={id} id={id} event={event} />;
}
