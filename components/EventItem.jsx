const EventItem = ({ title, subTitle }) => {
  return (
    <li className="flex justify-start gap-x-6 px-5">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">{title}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{subTitle}</p>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
