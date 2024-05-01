import WebCamComponent from "./components/WebCamComponent/WebCamComponent.jsx";
import Classify from "./pages/Classify/Classify.jsx";
import GeminiApp from "./pages/GeminiApp/GeminiApp.jsx";
import ImageRes from "./pages/ImageRes/ImageRes.jsx";
import LoginForm from "./pages/LoginForm/LoginForm.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/gemini-app" element={<GeminiApp />} />
        <Route path="/image-res" element={<ImageRes/>} />
        <Route path="*" element={<Classify />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
