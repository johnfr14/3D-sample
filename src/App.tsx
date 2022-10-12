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
      <div className="overlay"></div>
      <h1 id="progress">Loading... <span id="progressPercentage"></span>%</h1>
      <button className="start">START</button>
    </div>
  );
}

export default App;
