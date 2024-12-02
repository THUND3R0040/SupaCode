import React, { useState } from "react";
import UserRemove from "./UserRemove";

export default function AddUser({ question, formData, setFormData }) {
  const [value, setValue] = useState("");
  return (
    <div>
      <div className="flex flex-row">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={question.type}
          placeholder={question.placeholder}
          className="hover:border-pr hover:border-2 hover:outline-none rounded-md border-[1px] border-black p-2 font-proxima"
        />
        <button
          onClick={() => {
            if (value === "") return;
            setFormData({
              ...formData,
              [question.dataKey]: [...formData[question.dataKey], value],
            });
            setValue("");
          }}
          className="bg-sec  text-white  rounded-md border-[1px] border-black font-bold py-1 px-6 font-Sgro"
        >
          Add
        </button>
      </div>
      <div className="flex gap-1 flex-wrap">
        {formData[question.dataKey].map((user) => (
          <UserRemove
            key={user}
            user={user}
            formData={formData}
            setFormData={setFormData}
          />
        ))}
      </div>
    </div>
  );
}
