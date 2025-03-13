import { useEffect } from "react";
import Header from "./components/Header"
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router";
import NotFound from "./pages/NotFound";
import EventDetails from "./pages/EventDetails";
function App() {
  const lang = localStorage.getItem('lang');
  useEffect(() => {
    console.log('lang: ', lang);
  }, [])
  return (
    <main className="h-screen flex flex-col justify-between overflow-x-hidden font-mono">
      <Header />
      <div className="mt-16">
        <Routes>
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
