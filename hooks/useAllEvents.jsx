import React, { useState, useEffect } from "react";

const useAllEvents = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/event");
      const data = await response.json();
      const eventList = data.map((event) => ({ ...event, id: event._id, backgroundColor: "red", borderColor: "red" }));
      setAllEvents(eventList);
    } catch (err) {
      console.log(err);
      setError("Error fetching events");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { allEvents, error, isLoading };
};

export default useAllEvents;
