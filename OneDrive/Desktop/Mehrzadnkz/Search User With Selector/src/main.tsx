import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Header from "./assets/components/sections/header.tsx";
import { loading } from "./assets/functions/functions.tsx";

if (!localStorage.getItem("Theme")) {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (isDarkMode) {
    document.body.className = 'dark';
    localStorage.setItem("Theme", "dark");
  } else {
    document.body.className = 'light';
    localStorage.setItem("Theme", "light");
  }
}
else {
  document.body.className = localStorage.getItem("Theme")!;
}
document.addEventListener("DOMContentLoaded", () => {

  // check and start loading
  if (localStorage.getItem("Checked") !== "true") {
    loading('starter');
  }
  else {
    loading('loading');
  }
});

createRoot(document.querySelector("header")!).render(
  <StrictMode>
    <Header />
  </StrictMode>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);