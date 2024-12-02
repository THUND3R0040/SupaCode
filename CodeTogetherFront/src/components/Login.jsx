import { login } from "../services/Api";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //handle login form submission
  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    const res = await login(value);
    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Login successful");
      navigate("/");
    } else {
      setError(res.response.data.error);
      toast.error(res.response.data.message);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-1/2 mx-auto gap-1 "
    >
      <Input type="email" name="email" required={true} label={"Email:"} />
      {error?.email && <p>{error.email}</p>}
      <Input
        type="password"
        name="password"
        required={true}
        label={"Password:"}
      />
      {error?.password && <p>{error.password}</p>}
      <button type="submit" className=" border-2 border-slate-500 pl-2">
        Login
      </button>
    </form>
  );
}
