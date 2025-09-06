import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import { ClerkProvider } from '@clerk/clerk-react'
import { StrictMode } from "react";

// Commented out for now
// const PUBLISHABLE_KEY = "pk_test_random_key_value_12345"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
