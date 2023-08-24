"use client";

const EventContent = ({ eventInfo }) => {
  return (
    <>
      <b>{eventInfo?.timeText}</b>
      <i>{eventInfo?.event?.title}</i>
    </>
  );
};

export default EventContent;
