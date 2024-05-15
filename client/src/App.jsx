import React, { useEffect, useState } from "react";
// Wrapper for Mantine Library
import { MantineProvider, createTheme, AppShell } from "@mantine/core";
// Required CSS for mantine
import "@mantine/core/styles.css";
// CSS for Mantine dates
import "@mantine/dates/styles.css";
//Wrappers for React Router
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Page components
import Home from "./pages/Home";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Redirect from "./pages/Redirect";
import Log from "./pages/Log";
import Explore from "./pages/Explore";
import { fetchData } from "./oauth";
// Array of colors for custom theme
const myColors = [
  "#e5f9ff",
  "#d4eefa",
  "#aad9f0",
  "#7dc4e7",
  "#59b2df",
  "#42a7db",
  "#32a1da",
  "#218dc2",
  "#0f7dae",
  "#006c9b",
];

// Create theme using myColors array
const theme = createTheme({
  colors: { myColors },
  fontFamily: "nunito, sans-serif",
});

function App() {
  // User data
  const [userData, setUserData] = useState({ session: null });
  // Fetch user data on page load
  useEffect(() => {
    const data = fetchData();
    setUserData(data);
  }, []);

  return (
    <BrowserRouter>
      <MantineProvider theme={theme}>
        {/* AppShell to structure website */}
        <AppShell
          header={{ height: 50 }}
          footer={{ height: 40 }}
          pos={"relative"}
        >
          <Header data={userData} />
          <Routes>
            <Route
              index
              element={
                userData.session == null ? <Home /> : <Log data={userData} />
              }
            ></Route>
            <Route element={<Redirect />} path="redirect"></Route>
            <Route element={<Explore />} path="explore"></Route>
          </Routes>
          <Footer />
        </AppShell>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
