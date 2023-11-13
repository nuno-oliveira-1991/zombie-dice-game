import { useEffect, useRef } from 'react';
import { useGameStatsContext } from '../../contexts/GameStatsContext';
import { v4 as uuidv4 } from 'uuid';
import style from './game-stage-styles.module.scss';
import { diceBox } from './../../constants.js'


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
    rollCounter,
    setRollCounter,
    brains,
    setBrains,
    shots,
    setShots
  } = useGameStatsContext();

  const playButtonRef = useRef(null);
  const skipButtonRef = useRef(null);

  const drawDice = () => {
    let handSize = 3;
    if (diceInsideBox.length < 3) { 
      console.log('Dice box is empty, you must end your turn!');
      endTurn();
    };
    const updatedDiceInsideBox = [...diceInsideBox];
    const drawnDice = [];
    for (let i = 0; i < handSize; i++) {
      let randomDieIndex = Math.floor(Math.random() * updatedDiceInsideBox.length);
      let die = updatedDiceInsideBox[randomDieIndex];
      updatedDiceInsideBox.splice(randomDieIndex, 1);
      drawnDice.push(die);
    };
    setDiceInsideBox(updatedDiceInsideBox);
    setPlayerHand(drawnDice);
    console.log(drawnDice)
  };

  const rollDice = () => {
    let brainsRollCount = 0
    let shotsRollCount = 0
    for (let i = 0; i < playerHand.length; i++) {
      let randomFaceIndex = Math.floor(Math.random() * 6);
      let face = playerHand[i].faces[randomFaceIndex];
      rollResult.push(face);
      if (face === 'brain') brainsRollCount += 1;
      else if (face === 'shot') shotsRollCount += 1;
      else diceInsideBox.push(playerHand[i]);
    };
    setBrains(brains + brainsRollCount);
    setShots(shots + shotsRollCount);
    setRollResult(rollResult);
    setRollCounter(rollCounter + 1);
    setPlayerHand([]);
    console.log(rollResult)
  };

  const startTurn = () => {
    if (turn === 0) setTurn(1);
    setDiceInsideBox(diceBox);
    setTurnPhase('Draw');
    setPlayButtonMessage('Roll');
    drawDice();
  };

  const proceedTurn = () => {
    if (turnPhase === 'Draw') {
      setTurnPhase('Roll');
      setPlayButtonMessage('Draw');
      rollDice();
    } else {
      setTurnPhase('Draw');
      setPlayButtonMessage('Roll');
      setPlayerHand([]);
      setRollResult([]);
      drawDice();
    }
  };

  const endTurn = () => {
    if (shots < 3) {
      setScore(score + brains);
      setDiceInsideBox(diceBox);
    } else {
      setDiceInsideBox(diceBox);
    }
    setRollResult([]);
    setRollCounter(0);
    setBrains(0);
    setShots(0);
    setPlayerHand([]);
    setTurnPhase('');
    setTurn(turn + 1);
  };

  const handlePlayButtonClick = () => {
    if (turnPhase !== '') proceedTurn();
    else startTurn();
  };

  const handleSkipButtonClick = () => {
    setDiceInsideBox([...diceBox]);
    endTurn();
  };


  useEffect(() => {
    const playButton = playButtonRef.current;
    const skipButton = skipButtonRef.current;
  });

  useEffect(() => {
    if (shots >= 3) endTurn();
  }, [shots]);


  return (
    <div className={style['container']}>
      <div className={style['roll-panel']} style={{ visibility: turn === 0 ? 'hidden' : 'visible' }}>
        {playerHand.length > 0 && score < 13 && turnPhase === 'Draw' && playerHand.map((die) => <span key={uuidv4()}>{die.color}</span>)}
        {rollResult.length > 0 && score < 13 &&turnPhase === 'Roll' && rollResult.map((face) => <span key={uuidv4()}>{face}</span>)}
        {score >= 13 && <h2>Victory!</h2>}
      </div>
      <div className={style['control-panel']}>
        {score <= 13 &&<button ref={playButtonRef} onClick={handlePlayButtonClick}>{playButtonMessage}</button>}
        {score <= 13 &&<button ref={skipButtonRef} onClick={handleSkipButtonClick} style={{ visibility: turnPhase === '' ? 'hidden' : 'visible' }}>End Turn</button>}
      </div>
    </div>
  );
};

export default GameStage;