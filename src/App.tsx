import Header from "./components/Header"
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router";
import NotFound from "./pages/NotFound";
import EventDetails from "./pages/EventDetails";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ScrollToTop from "./utility/ScrollToTop";

function App() {

  const [_, i18n] = useTranslation();
  useEffect(() => {
    window.document.body.lang = i18n.language;
    window.document.documentElement.lang = i18n.language;
    i18n.language === "ar"
      ? (document.body.dir = "rtl")
      : (document.body.dir = "ltr");
  }, [i18n.language])

  return (
    <main
      className="h-screen flex flex-col justify-between font-mono"
    >
      <Header />
      <div className="mt-16">
        <ScrollToTop />
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/event-details" element={<EventDetails />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </main>
  )
}

export default App