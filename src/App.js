// ===============================
// App.jsx
// ===============================

// Pages
import Home from "./pages/Home";
import QuizPage from "./pages/QuizPage";

// React & Router
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Client-side routing

// ===============================
// Root application component
// ===============================
export default function App() {
  return (

    // Router provider that enables client-side navigation without full page reloads
    <BrowserRouter>

      {/* Route table: maps paths to page components */}
      <Routes>
        
        {/* Home route */}
        <Route path="/" element={<Home />} />

        {/* Quiz route */}
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}
