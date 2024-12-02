import Input from "./Input";
import { register } from "../services/Api";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // handleSubmit function
  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    const res = await register(value);
    if (res.status === 201) {
      toast.success("User registered successfully");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } else {
      setError(res.response.data.error);
      setTimeout(() => {
        setError(null);
      }, 10000);
      toast.error(res.response.data.message);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-1/2 mx-auto gap-1">
      <Input label="Username:" type="text" name="username" required={true} />
      {error?.username && <p>{error.username}</p>}
      <Input ut label="Email:" type="email" name="email" required={true} />
      {error?.email && <p>{error.email}</p>}
      <Input
        label="Password:"
        type="password"
        name="password"
        required={true}
      />
      {error?.password && <p>{error.password}</p>}

      <button type="submit" className="border-2 border-slate-500 pl-2">
        Register
      </button>
    </form>
  );
}
