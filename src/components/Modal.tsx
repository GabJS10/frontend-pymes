import React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: string;
};

export const Modal = ({ open, onClose, children, style }: Props) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center bg-black/30 transition-opacity ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${
          style || "bg-white rounded-lg shadow-xl p-8 transition-transform"
        } max-w-[90%] max-h-[90%] overflow-auto ${
          open ? "scale-100" : "scale-95"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 focus:outline-none"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};
