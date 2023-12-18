import { useState } from 'react'

import './App.css'
import { nanoid } from "nanoid";
import Die from './Die'

function App() {

  // generates random number (6 - 1)

  function numbersGenerator() {
    const numbersArray = []
    for(let i = 0; i < 10; i+=1) {
      const newNumber = Math.ceil(Math.random() * 6);
      numbersArray.push({ id: nanoid(), value: newNumber, isHeld: false });
    }
    return numbersArray;
  }

  // generates new numbers for new game on click

  function rollDice() {
    setDice(numbersGenerator())
  }

  // Initializes dice state with random numbers
  const[dice, setDice] = useState(numbersGenerator())

  // Creates instances of Dice components

 const diceElements = dice.map((die) => <Die key={die.id} value={die.value} isHeld={die.isHeld} />)

  return (
    <main>
      <div className="container">
        <h1 className="main-title"> Tenzies</h1>
        <p className="main-subtitle">
          Roll until all dice are the same. Click each dice to freeze it at its
          current value between rolls.
        </p>

        <div className="dice-container">
          {diceElements}
        </div>

        <div className="btn-container">
          <button className="btn-play" onClick={rollDice}>Roll</button>
        </div>
      </div>
    </main>
  );
}

export default App
