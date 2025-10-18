import React, { useRef, useState } from "react";
import Input from "./Input";
import { LuTrash, LuUpload, LuUser } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseImage = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-white/50 backdrop-blur-2xl border border-white/70 rounded-full relative shadow-xl shadow-emerald-100/30">
          <LuUser className="text-3xl text-emerald-600/70" />
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-full absolute -bottom-1 -right-1 shadow-lg hover:shadow-xl transition-all hover:scale-110 hover:from-emerald-500 hover:to-teal-600"
            onClick={onChooseImage}
          >
            <LuUpload size={14} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Profile Preview"
            className="w-20 h-20 rounded-full object-cover border-3 border-white/70 shadow-xl shadow-emerald-100/40"
          />
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center bg-red-400/90 backdrop-blur-xl text-white rounded-full absolute -bottom-1 -right-1 shadow-lg hover:bg-red-500 transition-all hover:scale-110"
            onClick={handleRemoveImage}
          >
            <LuTrash size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
