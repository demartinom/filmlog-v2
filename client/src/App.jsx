// Wrapper for Mantine Library
import { MantineProvider, createTheme } from "@mantine/core";
// Required CSS for mantine
import "@mantine/core/styles.css";
//Wrappers for React Router
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Page components
import Home from "./pages/Home";
import NavFooter from "./pages/NavFooter";

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
const theme = createTheme({ colors: { myColors } });

function App() {
  return (
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <Routes>
          {/*NavBar wrapper */}
          <Route path="/" element={<NavFooter />}>
            <Route index element={<Home />}></Route>
          </Route>
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
