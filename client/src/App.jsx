// Wrapper for Mantine Library
import { MantineProvider } from "@mantine/core";
// Required CSS for mantine
import "@mantine/core/styles.css";
//Wrappers for React Router
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Page components
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <MantineProvider>
        <Routes>
          <Route index element={<Home />}></Route>
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
