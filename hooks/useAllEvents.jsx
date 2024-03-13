"use client";

import useSwr from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

const useAllEvents = (params) => {
  const userId = params?.session?.user?.id;
  const { data, isLoading, error, mutate } = useSwr(`/api/event?user=${userId}`, fetcher);
  let eventList = data?.map((event) => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    let eventColor = `#${randomColor}`;
    eventColor = "rgb(121, 134, 203)"; // lavender: rgb(121, 134, 203), bluebearry: rgb(63, 81, 181)
    return { ...event, id: event._id, backgroundColor: eventColor, borderColor: eventColor };
  });

  if (!params?.session) {
    eventList = [];
  }

  return { allEvents: eventList || [], error, isLoading, mutate };
};

export default useAllEvents;
