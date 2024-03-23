// Wrapper for Mantine Library
import { MantineProvider, createTheme, AppShell } from "@mantine/core";
// Required CSS for mantine
import "@mantine/core/styles.css";
//Wrappers for React Router
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Page components
import Home from "./pages/Home";
import Header from "./pages/Header";
import Footer from "./pages/Footer";

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
        <AppShell header={{ height: 50 }} footer={{height:40}}>
          <Header />
          <Routes>
            <Route index element={<Home />}></Route>
          </Routes>
          <Footer />
        </AppShell>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
