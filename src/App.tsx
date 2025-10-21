import Home from "./pages/Home";
import QuizPage from "./pages/QuizPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}
