import { Outlet } from "react-router-dom";

export default function NavFooter() {
  return (
    <>
      <header>Nav</header>
      {/*Allows NavBar and Footer to render on all pages */}
      <Outlet />
      <footer>Footer</footer>
    </>
  );
}
