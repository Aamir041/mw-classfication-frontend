import FormApp from "./FormApp.jsx";
import GeminiApp from "./pages/GeminiApp/GeminiApp.jsx";
import LoginForm from "./pages/LoginForm/LoginForm.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<LoginForm />} />
        <Route path="/gemini-app" element={<GeminiApp />} />
        <Route path="/upload-image" element={<FormApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
