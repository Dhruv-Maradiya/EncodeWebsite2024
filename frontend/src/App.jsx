import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Preloader from "./components/preloader";
import { useState } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import TeamPage from "./pages/Team";

const MouseEffect = ({ position, delayedPosition, isMouseDown }) => {
  return (
    <>
      {/* Small cursor effect */}
      <div
        className={`fixed rounded-full ${isMouseDown ? "cursorscale" : ""} h-[15px] w-[15px] bg-[#00ff7b] duration-75 transition-transform z-20 pointer-events-none`}
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      ></div>

      {/* Large blurred effect */}
      <div
        className={`fixed rounded-full h-[30vw] w-[30vw] bg-[#00ff7b] bg-opacity-10 blur-3xl z-0 pointer-events-none`}
        style={{
          left: delayedPosition.x,
          top: delayedPosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      ></div>

      {/* Medium blurred effect */}
      <div
        className={`fixed rounded-full h-[7vw] w-[7vw] bg-[#00ff7b] bg-opacity-50 blur-3xl z-0 pointer-events-none`}
        style={{
          left: delayedPosition.x + 40,
          top: delayedPosition.y - 40,
          transform: 'translate(-50%, -50%)',
        }}
      ></div>

      {/* Extra large blurred effect */}
      <div
        className={`fixed rounded-full h-[70vw] w-[70vw] bg-[#00ff7b] bg-opacity-5 blur-3xl z-0 pointer-events-none`}
        style={{
          left: delayedPosition.x,
          top: delayedPosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      ></div>
    </>
  );
};

export default function App() {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [delayedPosition, setDelayedPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [preloaderEnded, setPreloaderEnded] = useState(false);

  const handleMouseMove = (event) => {
    setPosition({ x: event.clientX, y: event.clientY });
    setTimeout(() => {
      setDelayedPosition({ x: event.clientX, y: event.clientY });
    }, 80);
  };


  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <main className="dark min-h-screen text-foreground overflow-x-hidden"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="sm:flex hidden">
        <MouseEffect position={position} delayedPosition={delayedPosition} isMouseDown={isMouseDown} />
      </div>
      <Navbar />
      <Preloader setPreloaderEnded={setPreloaderEnded} />
      <Routes>
        <Route element={<Home preloaderEnded={preloaderEnded} />} path="/" />
        <Route element={<TeamPage />} path="team" />
      </Routes>
      <Footer />
    </main>
  );
}
