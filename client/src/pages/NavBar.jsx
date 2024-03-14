import { Outlet } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      Nav
      {/*Allows NavBar to render on all pages */}
      <Outlet />
    </nav>
  );
}
