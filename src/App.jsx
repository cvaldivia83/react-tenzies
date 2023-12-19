import { useState, useEffect } from 'react'

import './App.css'
import { nanoid } from "nanoid";
import Die from './Die'
import Confetti from 'react-confetti'

function App() {

  // Initializes dice state with random numbers
  const [dice, setDice] = useState(numbersGenerator());
  const [tenzies, setTenzies] = useState(false)
  const [score, setScore] = useState(generateNewScore())


  // Keeps 2 states aligned: dice and tenzies
  // if all dices are held and same value then tenzies will be true

  useEffect(() => {
    const gameWon = dice.every((item) => {
      return item.isHeld === true && item.value === dice[0].value;
    });
    setFinishTime();
    setScore(prevScore => {
      return { ...prevScore, total_time: setTotalTime() };
    });

    if (gameWon) {
      setTenzies((prevTenzies) => !prevTenzies);

    }
  }, [dice])




  // if tenzies is true show score
  useEffect(() => {
    if (tenzies) {

      createScoreElement();
    }

  }, [tenzies])


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

    setScore((prevScore) => {
      return { ...prevScore, rolls: prevScore.rolls + 1 };
    });
  }

  // controls dice isHeld State in child components

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((item) => {
        return item.id === id ? { ...item, isHeld: !item.isHeld } : item;
      })
    );
  }

  // Sets game start time
  function setStartTime() {
    const oneDice = dice.filter(item => item.isHeld)
    if (oneDice.length === 1) {
      setScore((prevScore) => {
        return { ...prevScore, start_time: new Date().getTime() };
      });
    }
  }

  // sets game finish time
  function setFinishTime() {
    setScore(prevScore => {
      return {
        ...prevScore,
        finish_time: new Date().getTime()
      };
    })

  }

   // generates game score
   function createScoreElement() {
    const paragraph = document.createElement('p');
    paragraph.classList.add('game-score');
    paragraph.innerText = `Total attempts: ${score.rolls}  -  Total Time: ${score.total_time}`
    const placeholder = document.getElementById('score-container');
    placeholder.appendChild(paragraph);
   }

  //  removes game score from DOM
  function removeScoreElement() {
    const placeholder = document.getElementById("score-container");
    placeholder.innerHTML = "";
  }

  //  Transforms milliseconds into min:sec
  function setTotalTime() {
    const milliseconds = score.finish_time - score.start_time;
    const minutes = Math.floor(milliseconds / 60000).toString();
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const total = `${minutes}:${ seconds < 10 ? "0" : ""}${seconds.toString()}`
    return total;
  }


  // Resets dice & tenzies for new game
  function resetDice() {
    setDice(numbersGenerator())
    setTenzies(false)
    removeScoreElement();
    setScore(generateNewScore())
  }

  // generates new game score
  function generateNewScore() {
    return  {rolls: 0, start_time: new Date().getTime(), finish_time: new Date().getTime(), total_time: ''}
  }

  // Creates instances of Dice components

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => {holdDice(die.id); setStartTime()}}
    />
  ));

  return (
    <main>
      { tenzies && <Confetti /> }
      <div className="container">
        <h1 className="main-title"> Tenzies</h1>
        <p className="main-subtitle">
          Roll until all dice are the same. Click each dice to freeze it at its
          current value between rolls.
        </p>

        <div className="dice-container">{diceElements}</div>

        <div id="score-container"></div>

        <div className="btn-container">
          <button id="btn" className="btn-play" onClick={ tenzies ? resetDice : rollDice }>
            { tenzies ? "New Game" : "Roll"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App
