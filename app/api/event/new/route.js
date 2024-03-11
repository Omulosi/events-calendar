import Event from "@models/event";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { title, description = "", color = "", start, end, allDay, creator } = await request.json();

  try {
    await connectToDB();
    const newEvent = new Event({ title, description, start, end, color, creator, allDay });
    await newEvent.save();
    console.log(" Event successfuly created");
    return new Response(JSON.stringify(newEvent), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new event", { status: 500 });
  }
};
