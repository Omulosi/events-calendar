import React, { useEffect, useState } from "react";

const useEvent = ({ eventId }) => {
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvent = async ({ id }) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/event/${id}`);
      const data = await response.json();
      //const eventItem = data.map((event) => ({ ...event, id: event._id, backgroundColor: "red", borderColor: "red" }));
      setEvent(event);
    } catch (err) {
      console.log(err);
      setError("Error fetching Event item");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent({ id: eventId });
  }, [eventId]);

  return { event, error, isLoading };
};

export default useEvent;
