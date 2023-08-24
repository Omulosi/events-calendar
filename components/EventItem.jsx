import React from "react";
import { formatDate } from "@fullcalendar/core";

const EventItem = ({ title, time }) => {
  return (
    <li className="flex justify-between gap-x-6 py-1">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">{title}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {formatDate(time, { year: "numeric", month: "short", day: "numeric" })}
          </p>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
