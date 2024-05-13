import { useCookies } from "react-cookie";
import Classify from "./pages/Classify/Classify.jsx";
import GeminiApp from "./pages/GeminiApp/GeminiApp.jsx";
import ImageRes from "./pages/ImageRes/ImageRes.jsx";
import LoginForm from "./pages/LoginForm/LoginForm.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Report from "./pages/Report/Report.jsx";

function App() {
  const [cookie, setCookie] = useCookies(['token']);
  return (
    <BrowserRouter>
      {cookie?.token
        ? (
          <Routes>
            <Route path="/chatai" element={<GeminiApp />} />
            <Route path="/image-res" element={<ImageRes />} />
            <Route path="/" element={<Classify />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/report" element={<Report/>}/>
          </Routes>
        )
        : (
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )
      }
    </BrowserRouter>
  );
}

export default App;
