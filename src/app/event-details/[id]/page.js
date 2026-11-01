import EventDetails from "./event-details";

export default async function EventDetailsPage({ params }) {
  const { id } = await params;

  return <EventDetails key={id} id={id} />;
}