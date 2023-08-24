import { formatDate } from "@fullcalendar/core";

export const formatDateItem = ({ time }) => {
  return formatDate(time, { year: "numeric", month: "short", day: "numeric" });
};

export const startCase = ({ word }) => {
  if (!(typeof word === "string")) {
    return word;
  }
  return word
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.substring(1))
    .join(" ");
};
