import React, {useState} from "react";
import {GameField} from "./GameField";
import css from "./App.css"


function App() {


  const [val, setVal] = useState(0);

  setInterval(function () {
      //setVal(val + 1);
  }, 1000);




  return(
      <div>
        <GameField />
          <button onClick={() => setVal(val + 1)}>
              Click me
          </button>

      </div>
  )
}

export default App;


