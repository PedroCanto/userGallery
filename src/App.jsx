import { BrowserRouter } from "react-router-dom";
import { RouterProvider } from "./Routes/@routes";
import "./global.css";
function App() {
  return (
    <BrowserRouter>
      <RouterProvider />
    </BrowserRouter>
  );
}

export default App;
