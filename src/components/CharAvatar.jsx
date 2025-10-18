import React from "react";
import { getInitials } from "../utils/helper";

const CharAvatar = ({ fullName, width, height, style }) => {
  return (
    <div
      className={`flex items-center justify-center ${width || "w-12"} ${
        height || "h-12"
      } ${style || ""} rounded-full text-gray-900 font-medium bg-gray-300`}
    >
      {getInitials(fullName || "")}
    </div>
  );
};

export default CharAvatar;
