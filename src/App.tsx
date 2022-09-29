import { useEffect } from "react";
import Experience from "./Experience/experience";

function App() {

  useEffect(() => {
    new Experience(document.querySelector('canvas.webgl')!)
  }, [])
  
  return (
    <div className="App">
      <canvas className="webgl"></canvas>
    </div>
  );
}

export default App;
