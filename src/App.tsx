import Header from "./components/Header"
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router";
import NotFound from "./pages/NotFound";
import EventDetails from "./pages/EventDetails";
import ScrollTop from "./utility/ScrollTop";
function App() {

  return (
    <main className="h-screen flex flex-col justify-between overflow-x-hidden font-mono">
      <Header />
      <div className="mt-16">
        <ScrollTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event-details" element={<EventDetails />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </ScrollTop>
      </div>
      <Footer />
    </main>
  )
}

export default App
