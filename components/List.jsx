import React from "react";

const List = ({ children }) => {
  return (
    <ul role="list" className="divide-y divide-gray-100 bg-transparent">
      {children}
    </ul>
  );
};

export default List;
