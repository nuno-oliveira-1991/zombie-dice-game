import { useEffect, useRef } from 'react';
import { useGameStatsContext } from '../../contexts/GameStatsContext';
import { v4 as uuidv4 } from 'uuid';
import style from './game-stage-styles.module.scss';
import { diceBox } from './../../constants.js'
import DieThumbnail from './DieThumbnail/DieThumbnail.jsx';


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
    setShots,
    loadingMessage,
    setLoadingMessage
  } = useGameStatsContext();

  const playButtonRef = useRef(null);
  const skipButtonRef = useRef(null);

  const drawDice = () => {
    console.log('Drawing dice...');
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
    console.log(`Dice put in the box - ${diceInsideBox.length}`);
    setPlayerHand(drawnDice);
    setLoadingMessage('');
  };

  const rollDice = () => {
    console.log('Rolling dice...');
    let brainsRollCount = 0;
    let shotsRollCount = 0;
    for (let i = 0; i < playerHand.length; i++) {
      let randomFaceIndex = Math.floor(Math.random() * 6);
      let face = playerHand[i].faces[randomFaceIndex];
      let color = playerHand[i].color;
      let resultDie = {
        color: color,
        face: face
      };
      rollResult.push(resultDie);
      if (face === 'brain') brainsRollCount += 1;
      else if (face === 'shot') shotsRollCount += 1;
      else diceInsideBox.push(playerHand[i]);
    };
    setBrains(brains + brainsRollCount);
    setShots(shots + shotsRollCount);
    setRollResult(rollResult);
    setRollCounter(rollCounter + 1);
    setPlayerHand([]);
    setLoadingMessage('');
  };

  const startTurn = () => {
    console.log('Turn is starting.');
    if (turn === 0) setTurn(1);
    setTurnPhase('Draw');
    setPlayButtonMessage('Roll');
    setTimeout(drawDice, 1000);
    setLoadingMessage('Drawing dice ...');
  };

  const proceedTurn = () => {
    console.log('proceeding...');
    if (turnPhase === 'Draw') {
      setTurnPhase('Roll');
      setPlayButtonMessage('Draw');
      setTimeout(rollDice, 1000);
      setLoadingMessage('Rolling dice ...');
    } else {
      setTurnPhase('Draw');
      setPlayButtonMessage('Roll');
      setPlayerHand([]);
      setRollResult([]);
      setTimeout(drawDice, 1000);
      setLoadingMessage('Drawing dice ...');
    }
  };

  const endTurn = () => {
    console.log('Turn is ending.');
    if (shots < 3) {
      setScore(score + brains);
      setDiceInsideBox(diceBox);
      console.log(`Dice put in the box - ${diceInsideBox.length}`);
    } else {
      setDiceInsideBox(diceBox);
      setLoadingMessage('You died. Drawing dice ...');
      console.log(`Dice put in the box - ${diceInsideBox.length}`);
    }
    setRollResult([]);
    setRollCounter(0);
    setBrains(0);
    setShots(0);
    setPlayerHand([]);
    setTurnPhase('');
    setTurn(turn + 1);
    setTimeout(startTurn, 2000);
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

  useEffect(() => {
    if (turnPhase === '' && turn !== 0) setPlayButtonMessage('Draw')
  });


  return (
    <div className={style['container']}>
      <div className={style['roll-panel']} style={{ visibility: turn === 0 ? 'hidden' : 'visible' }}>
        {playerHand.length > 0 && score < 13 && turnPhase === 'Draw' && playerHand.map((die) => <div key={uuidv4()} className={style['color-box']}><div style={{ backgroundColor: die.color }}></div></div>)}
        {rollResult.length > 0 && score < 13 && turnPhase === 'Roll' && rollResult.map((die) => <DieThumbnail key={uuidv4()} color={die.color} face={die.face}/>)}
        {loadingMessage !== '' && <span>{loadingMessage}</span>}
        {score >= 13 && <h2>Victory!</h2>}
      </div>
      <div className={style['control-panel']}>
        {score <= 13 && <button ref={playButtonRef} onClick={handlePlayButtonClick} style={{ visibility: turn === 0 || playerHand.length > 0 || rollResult.length > 0 ? 'visible' : 'hidden'}}>{playButtonMessage}</button>}
        {score <= 13 && <button ref={skipButtonRef} onClick={handleSkipButtonClick} style={{ visibility: turnPhase !== '' && playerHand.length > 0 || rollResult.length > 0 ? 'visible' : 'hidden'}}>End Turn</button>}
      </div>
    </div>
  );
};

export default GameStage;