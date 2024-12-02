// RoomConfig page is used to create a new room
// fields to be filled by the user
// - room name
// - room description
// - room type
// - room password
// - room max users
// - room private
// - room chat enabled
// - room code editor enabled
// - room code editor theme
// - room code editor language
// - room code editor font size
// - room code editor font family
// - room code editor tab size
// these inputs are not going to be filled at the same time but they will be filled ifn diferent steps ( ui  changes )
// scenario
// user choose his room settings
// user clicks save a new room is created and then navigate to the room page using special id generated for the room

import Modal from "@/components/Modal";
import { useToken } from "@/hooks/useToken";
import { useUser } from "@/hooks/useUser";
import React, { useState } from "react";

export default function RoomConfig() {
  const { token } = useToken();
  const { user } = useUser();

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  const questions = [
    {
      question: "What Would You like name the Room ?",
      type: "text",
      placeholder: "Room Name",
      dataKey: "roomName",
    },
    {
      question: "What Is the Maximum Number of users ?",
      type: "number",
      placeholder: "Room Capacity",
      dataKey: "roomCapacity",
    },
    // {
    //   question: "Owner ID",
    //   type: "text",
    //   placeholder: "Owner ID",
    //   dataKey: "owner",
    // },
    {
      question: "Who are the Editors ?",
      type: "email",
      placeholder: "Editors",
      dataKey: "editors",
    },
    {
      question: "Who are the Viewers ?",
      type: "email",
      placeholder: "Viewers",
      dataKey: "viewers",
    },
  ];

  return (
    <div className="">
      <button onClick={() => setIsOpen(!isOpen)}>Open Modal</button>
      {isOpen && (
        <Modal user={user}>
          <Modal.Header />
          <Modal.Body question={questions[step]} />
          <Modal.Footer
            setIsOpen={setIsOpen}
            setStep={setStep}
            step={step}
            maxSteps={questions.length}
            question={questions[step]}
          />
        </Modal>
      )}
    </div>
  );
}
