import { useState } from 'react';
import './App.css';
import Intro from './components/Intro';
import Quiz from './components/Quiz';

function App() {

  // State to conditionally render either of the components

  const [gameActive,setGameActive] = useState(false);

  function startGame(){
    setGameActive(true)
  }
  return (
    <>
    { gameActive ? <Quiz/> : <Intro onClick = {startGame} />}
    </>
  );
}

export default App;
