import Classify from "./components/Classify/Classify.jsx";
import GeminiApp from "./pages/GeminiApp/GeminiApp.jsx";
import LoginForm from "./pages/LoginForm/LoginForm.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<LoginForm />} />
        <Route path="/gemini-app" element={<GeminiApp />} />
        <Route path="/classify-image" element={<Classify />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
