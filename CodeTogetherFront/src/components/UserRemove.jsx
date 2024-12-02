import React from "react";
import Close from "./svg/Close";

export default function UserRemove({ user, formData, setFormData }) {
  return (
    <div className="border-2 border-gray-200 m-1 p-1 flex ">
      <span>{user}</span>
      <span
        onClick={() => {
          setFormData({
            ...formData,
            editors: formData.editors.filter((editor) => editor !== user),
            viewers: formData.viewers.filter((viewer) => viewer !== user),
          });
          console.log(formData);
        }}
      >
        <Close />
      </span>
    </div>
  );
}
