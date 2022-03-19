import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home.jsx";
import ImagesProvider from "./contexts/imagesContext";

function App() {
  return (
    <ChakraProvider>
      <ImagesProvider>
        <div className="App">
          <Home />
        </div>
      </ImagesProvider>
    </ChakraProvider>
  );
}

export default App;
