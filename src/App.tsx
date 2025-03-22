import "./App.scss";
import { ComboBox } from "./combo-box";

const App = () => {
  return (
    <div className="center">
      <div className="card">
        <ComboBox
            options={["Apple", "Banana", "Mango", "Watermelon", "Orange"]}
            onSelect={(selected) => console.log(selected)}/>
      </div>
    </div>
  );
};

export default App;
