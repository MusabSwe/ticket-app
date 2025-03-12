import { useEffect } from "react";
import Header from "./components/Header"
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  const lang = localStorage.getItem('lang');
  useEffect(() => {
    console.log('lang: ', lang);
  }, [])
  return (
    <main className="h-screen flex flex-col justify-between overflow-x-hidden font-mono">
      <Header />
      <div className="mt-16">
        <Home />
      </div>
      <Footer />
    </main>
  )
}

export default App
