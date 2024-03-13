import Event from "@models/event";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const id = params?.id;
    const data = await Event.findById(id);

    if (!data) return new Response("Event Not Found", { status: 404 });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log({ eventError: error });
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { title, description, color, creator, start, end, allDay } = await request.json();

  try {
    await connectToDB();

    const existingEvent = await Event.findById(params.id);

    console.log({ existingEvent });
    console.log({ data: request.json() });

    if (!existingEvent) {
      return new Response("Event not found", { status: 404 });
    }

    if (title) {
      existingEvent.title = title;
    }

    if (description) {
      existingEvent.description = description;
    }

    if (color) {
      existingEvent.color = color;
    }

    if (creator) {
      existingEvent.creator = creator;
    }

    if (start) {
      existingEvent.start = start;
    }

    if (end) {
      existingEvent.end = end;
    }

    if (allDay) {
      existingEvent.allDay = allDay;
    }

    await existingEvent.save();

    return new Response("Successfully updated the Event", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Event", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the Event by ID and remove it
    await Event.findByIdAndRemove(params.id);

    return new Response("Event deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error deleting Event", { status: 500 });
  }
};
