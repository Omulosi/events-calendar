import Event from "@models/event";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();
    const userId = request.nextUrl.searchParams.get("user");
    // Find by creator, filter by month
    const events = await Event.find({ creator: userId }).populate("creator");

    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all events", { status: 500 });
  }
};
