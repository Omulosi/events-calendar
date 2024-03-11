import { Schema, model, models } from "mongoose";

const EventSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  description: {
    type: String,
  },
  start: {
    type: String,
    required: [true, "Start time is required."],
  },
  end: {
    type: String,
  },
  color: {
    type: String,
  },
  allDay: {
    type: Boolean,
  },
});

const Event = models.Event || model("Event", EventSchema);

export default Event;
