import EditEvent from "./edit-event";

export const instant = false;

export default async function EditEventPage({ params }) {
  const { id } = await params;

  return <EditEvent key={id} id={id} />;
}
