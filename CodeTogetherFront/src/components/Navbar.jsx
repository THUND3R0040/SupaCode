import Hamburger from "./Hamburger";
import Links from "./Links";
import Logo from "./Logo";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <section className="flex flex-col ">
      <div className="bg-black h-3 "></div>
      <nav className="py-4  container">
        <ul className="flex flex-row justify-between ">
          <li className="flex flex-row items-center gap-2">
            <Link to="/" className="">
              <Logo height={"30px"} width={"30px"} />
            </Link>
            <div className="flex flex-col leading-4">
              <span className="font-bold font-Sgro">WeDu</span>
              <span className=" text-[12px] font-proxima">
                Communicate. Collaborate. Create.
              </span>
            </div>
          </li>
          <Links />
          <li className="md:hidden">
            <Hamburger />
          </li>
        </ul>
      </nav>
      <div className="pb-2 container">
        <button className="bg-pr w-full h-full rounded-md border-[1px] border-black font-bold py-1 font-Sgro md:hidden">
          Get Started
        </button>
      </div>
    </section>
  );
}
