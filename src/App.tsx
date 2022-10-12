import { useEffect } from "react";
import Experience from "./Experience/Experience";

function App() {

  useEffect(() => {
    let canvas: HTMLCanvasElement = document.querySelector('canvas.webgl')!
    Experience.Instance(canvas)
  }, [])
  
  return (
    <div className="App">
      <canvas className="webgl"></canvas>
    </div>
  );
}

export default App;
