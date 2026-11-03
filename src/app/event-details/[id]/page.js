import EventDetails from "./event-details";

export const instant = false;

export default async function EventDetailsPage({ params }) {
  const { id } = await params;

  return <EventDetails key={id} id={id} />;
}