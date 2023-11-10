import { useEffect, useRef } from 'react';
import { useGameStatsContext } from '../../contexts/GameStatsContext';
import { v4 as uuidv4 } from 'uuid';
import style from './game-stage-styles.module.scss';


const GameStage = () => {
  const {
    score,
    setScore,
    turn,
    setTurn,
    turnPhase,
    setTurnPhase,
    diceInsideBox,
    setDiceInsideBox,
    playerHand,
    setPlayerHand,
    playButtonMessage,
    setPlayButtonMessage,
    rollResult,
    setRollResult,
    brains,
    setBrains,
    shots,
    setShots
  } = useGameStatsContext();

  const playButtonRef = useRef(null);
  const skipButtonRef = useRef(null);

  let handSize = 3;

  const drawDice = () => {
    if (diceInsideBox.length < 3) handSize = diceInsideBox.length;
    else if (diceInsideBox.length === 0) {
      console.log('Dice box is empty, you lost the game!');
      return;
    };
    for (let i = 0; i < handSize; i++) {
      let randomDieIndex = Math.floor(Math.random() * diceInsideBox.length);
      diceInsideBox.splice(randomDieIndex, 1);
      let die = diceInsideBox[randomDieIndex]
      playerHand.push(die);
      setDiceInsideBox(diceInsideBox)
    };
    console.log(playerHand)
    setPlayerHand(playerHand);
  };

  const rollDice = () => {
    for (let i = 0; i < playerHand.length; i++) {
      let randomFaceIndex = Math.floor(Math.random() * 6);
      let face = playerHand[i].faces[randomFaceIndex];
      console.log(face);
      rollResult.push(face);
      if (face === 'brain') setBrains(brains + 1);
      else if (face === 'shot') setShots(shots + 1);
    };
  console.log(rollResult)
    setRollResult(rollResult);
    setRollCounter(rollCounter + 1);
    setPlayerHand([]);
  };

  const startTurn = () => {
    setTurn(turn + 1);
    setTurnPhase('Draw');
    setPlayButtonMessage('Roll');
    drawDice();
  };

  const proceedTurn = () => {
    setTurnPhase('Roll');
    setPlayButtonMessage('Draw');
    rollDice();
  };

  const endTurn = () => {
    setTurnPhase('Draw');
    setPlayerHand([]);
    setRollResult([]);
    setRollCounter(0);
    startTurn();
    setScore(score + rollResult.length)
  };

  const handlePlayButtonClick = () => {
    if (turnPhase === 'Draw') proceedTurn();
    else if (turnPhase === 'Roll') rollDice();
    else startTurn();
  };


  useEffect(() => {
    const playButton = playButtonRef.current;
    const skipButton = skipButtonRef.current;
  });



  return (
    <div className={style['container']}>
      {playerHand.length > 0 && turnPhase === 'Draw' && playerHand.map((die) => <span key={uuidv4()}>{die.color}</span>)}
      {rollResult.length > 0 && turnPhase === 'Roll' && rollResult.map((face) => <span key={uuidv4()}>{face}</span>)}
      <button ref={playButtonRef} onClick={handlePlayButtonClick}>{playButtonMessage}</button>
      <button ref={skipButtonRef} onClick={endTurn} style={{ visibility: turn === 0 ? 'hidden' : 'visible' }}>End Turn</button>
    </div>
  );
};

export default GameStage;