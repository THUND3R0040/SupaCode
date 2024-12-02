import React, { useContext, useState } from "react";
import { createContext } from "react";
import Logo from "./Logo";
import ProgressDemo from "./ui/ProgressDemo";
import { useNavigate } from "react-router-dom";
import AddUser from "./AddUser";
import { createRoom as createRoomApi } from "@/services/Api";
import { useToken } from "@/hooks/useToken";

const Context = createContext();

function Modal({ children, user }) {
  const [formData, setFormData] = useState({
    roomName: "",
    roomCapacity: 1,
    owner: user?._id,
    editors: [],
    viewers: [],
  });
  return (
    <div className="w-screen  h-screen absolute top-0 mx-auto glassmorphism flex items-center  ">
      <div className=" w-2/3 h-4/5 mx-auto bg-white rounded-2xl p-4 ">
        <Context.Provider value={{ formData, setFormData, user }}>
          {children}
        </Context.Provider>
      </div>
    </div>
  );
}

// create child components
function Header() {
  const context = useContext(Context);
  const { user } = context;
  return (
    <div className="flex flex-row items-center justify-between pb-7">
      <div className="flex flex-row gap-1 items-center">
        <Logo height={"30px"} width={"30px"} />
        <span className="font-bold font-Sgro">WeDu</span>
      </div>
      <div>
        <span className="font-semibold font-proxima">
          Welcome , {user?.username}
        </span>
      </div>
    </div>
  );
}

function Body({ question }) {
  const context = useContext(Context);
  const { formData, setFormData } = context;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [question.dataKey]: e.target.value,
    });
  };

  return (
    <div className="pt-8  ">
      <p className="font-bold font-proxima text-2xl text-center w-1/2 mx-auto">
        {question.question}
      </p>
      <div className="flex flex-col mx-auto w-1/2 pt-24 ">
        {/* AddUser component is For the editors or viewers as they should be an array  */}
        {question.dataKey === "editors" || question.dataKey === "viewers" ? (
          <AddUser
            formData={formData}
            setFormData={setFormData}
            question={question}
            handleInputChange={handleInputChange}
          />
        ) : (
          <input
            value={formData[question.dataKey]}
            onChange={handleInputChange}
            type={question.type}
            placeholder={question.placeholder}
            className="hover:border-pr hover:border-2 hover:outline-none rounded-md border-[1px] border-black p-2 font-proxima"
          />
        )}
      </div>
    </div>
  );
}

function Footer({ setIsOpen, setStep, step, maxSteps, question }) {
  const { token } = useToken();
  const createRoom = async (req) => {
    // send data with token
    const res = await createRoomApi(req, token);
    if (res.status === 201) {
      navigate("/Room/" + res.data.id);
    } else {
      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
      toast.error("Something Happened ! Try Again !");
      navigate("/dashboard");
    }
  };
  const context = useContext(Context);
  const { formData } = context;
  const navigate = useNavigate();
  return (
    <div className="mt-20 flex flex-col gap-7 ">
      <ProgressDemo maxSteps={maxSteps} steps={step} />
      <div className=" flex justify-between items-center ">
        <button
          onClick={() => {
            setIsOpen(false);
            setStep(0);
          }}
          className="bg-sec  text-white  rounded-md border-[1px] border-black font-bold py-1 px-6 font-Sgro"
        >
          Cancel
        </button>
        {step < maxSteps - 1 ? (
          <button
            disabled={formData[question.dataKey] === "" ? true : false}
            onClick={() => {
              setStep((step) => step + 1);
            }}
            className="bg-pr  h-full rounded-md border-[1px] border-black font-bold py-1 px-6 font-Sgro "
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => createRoom(formData)}
            className="bg-pr  h-full rounded-md border-[1px] border-black font-bold py-1 px-6 font-Sgro "
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
}

// add the child components to the Popup component
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
