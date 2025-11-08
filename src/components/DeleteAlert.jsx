import React from "react";

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div className="flex flex-row items-center justify-center min-h-[120px] w-full gap-4 px-6">
      <p className="text-md font-semibold text-gray-700 text-left flex-1 break-words">
        {content}
      </p>
      <button className="add-btn add-btn-fill" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

export default DeleteAlert;
