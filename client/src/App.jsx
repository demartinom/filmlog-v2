// Wrapper for Mantine Library
import { MantineProvider } from "@mantine/core";
// Required CSS for mantine
import "@mantine/core/styles.css";
//Wrappers for React Router
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Page components
import Home from "./pages/Home";
import NavFooter from "./pages/NavFooter";

function App() {
  return (
    <BrowserRouter>
      <MantineProvider>
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
