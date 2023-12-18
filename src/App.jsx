import { useState, useEffect } from 'react'

import './App.css'
import { nanoid } from "nanoid";
import Die from './Die'

function App() {

  // Initializes dice state with random numbers
  const [dice, setDice] = useState(numbersGenerator());
  const [tenzies, setTenzies] = useState(false)

  // Keeps 2 states aligned: dice and tenzies
  // if all dices are held and same value then tenzies will be true
  useEffect(() => {
    const gameWon = dice.every(item => {
      return item.isHeld === true && item.value === dice[0].value
    })

    if (gameWon) {
      setTenzies((prevTenzies) => !prevTenzies);
      console.log("You won!")
    }

  }, [dice])


  // generates ONE new die
  function generateOneDie() {
    const newNumber = Math.ceil(Math.random() * 6);
    return { id: nanoid(), value: newNumber, isHeld: false };
  }

  // generates an array with 10 objects that contain random numbers (6 - 1)
  function numbersGenerator() {
    const numbersArray = [];
    for (let i = 0; i < 10; i += 1) {
      numbersArray.push(generateOneDie());
    }
    return numbersArray;
  }

  // generates new numbers for new game on click
  // if dice isHeld == true we keep the dice
  // if it's false we create a new dice generateOne Die()

  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((item) => {
        return item.isHeld ? item : generateOneDie();
      })
    );
  }

  // controls dice isHeld State in child components

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((item) => {
        return item.id === id ? { ...item, isHeld: !item.isHeld } : item;
      })
    );
  }

  // Creates instances of Dice components

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      <div className="container">
        <h1 className="main-title"> Tenzies</h1>
        <p className="main-subtitle">
          Roll until all dice are the same. Click each dice to freeze it at its
          current value between rolls.
        </p>

        <div className="dice-container">{diceElements}</div>

        <div className="btn-container">
          <button className="btn-play" onClick={rollDice}>
            Roll
          </button>
        </div>
      </div>
    </main>
  );
}

export default App
