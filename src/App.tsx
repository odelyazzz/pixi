import { Stage } from "@inlet/react-pixi";
import Playground from "./components/Playground/Playground";
import "./App.css";

const App = () => {
  return (
    <div id="app-container">
      <div className="card">
        <h1>Лотерейный Билет</h1>
        <div className="instructions">
          Потри серебристую область, чтобы узнать, что ты выиграл!
        </div>
        <div className="parallax-background"></div>
        <Stage className="playground" width={500} height={200}>
          <Playground />
        </Stage>
      </div>
    </div>
  );
};

export default App;
