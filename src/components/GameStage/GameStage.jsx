import { useEffect, useRef } from 'react';
import { useGameStatsContext } from '../../contexts/GameStatsContext';
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom"
import style from './game-stage-styles.module.scss';
import { diceBox } from './../../constants.js'
import DieThumbnail from './DieThumbnail/DieThumbnail.jsx';
import ScoreBoard from '../../components/ScoreBoard/ScoreBoard';

const GameStage = () => {
  const {
    rulesVisibility,
    setRulesVisibility,
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
    setLoadingMessage,
    gameOutcomeMessage,
    setGameOutcomeMessage
  } = useGameStatsContext();

  const playButtonRef = useRef(null);
  const skipButtonRef = useRef(null);

  const drawDice = () => {
    console.log('Drawing dice...');
    let handSize = 3;
    if (diceInsideBox.length < 3) { 
      console.log('Dice box has insufficient dice, you must end your turn!');
      setDiceInsideBox(diceBox);
      endTurn();
      return;
    };
    let updatedDiceInsideBox
    if (rollCounter === 0) updatedDiceInsideBox = [...diceBox];
    else updatedDiceInsideBox = [...diceInsideBox];

    const drawnDice = [];
    for (let i = 0; i < handSize; i++) {
      let randomDieIndex = Math.floor(Math.random() * updatedDiceInsideBox.length);
      let die = updatedDiceInsideBox[randomDieIndex];
      updatedDiceInsideBox.splice(randomDieIndex, 1);
      drawnDice.push(die);
    };
    setPlayerHand(drawnDice);
    setDiceInsideBox(updatedDiceInsideBox);
    setPlayButtonMessage('ROLL');
    setLoadingMessage('');
  };

  const rollDice = () => {
    console.log('Rolling dice...');
    let brainsRollCount = 0;
    let shotsRollCount = 0;
    let updatedDiceInsideBox = [...diceInsideBox];
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
      else updatedDiceInsideBox.push(playerHand[i]);
    };
    setBrains(brains + brainsRollCount);
    setShots(shots + shotsRollCount);
    setRollResult(rollResult);
    setRollCounter(rollCounter + 1);
    setPlayerHand([]);
    setDiceInsideBox(updatedDiceInsideBox);
    setPlayButtonMessage('DRAW');
    setLoadingMessage('');
  };

  const startTurn = () => {
    console.log('Turn is starting.');
    if (turn === 0) setTurn(turn + 1);
    setTurnPhase('DRAW');
    setPlayButtonMessage('ROLL');
    setLoadingMessage('Drawing dice ...');
  };

  const proceedTurn = () => {
    console.log('proceeding...');
    if (turnPhase === 'DRAW') {
      setTurnPhase('ROLL');
      setPlayButtonMessage('');
      setLoadingMessage('Rolling dice ...');
    } else {
      setTurnPhase('DRAW');
      setPlayButtonMessage('');
      setPlayerHand([]);
      setRollResult([]);
      setLoadingMessage('Drawing dice ...');
    }
  };

  const endTurn = () => {
    console.log('Turn is ending.');
    if (shots < 3) setScore(score + brains);
    setDiceInsideBox(diceBox);
    setRollResult([]);
    setRollCounter(0);
    setBrains(0);
    setShots(0);
    setPlayerHand([]);
    if (turn >= 10) {
      setTurn(0);
      setTurnPhase('');
      setLoadingMessage('');
    } 
    setTurn(turn + 1);
  };

  const handlePlayButtonClick = () => {
    if (loadingMessage !== '') return;
    setGameOutcomeMessage('');
    if (turnPhase !== '') proceedTurn();
    else startTurn();
  };

  const handleSkipButtonClick = () => {
    if (loadingMessage !== '') return;
    if ((turnPhase !== 'ROLL' && playerHand.length !== 3) || rollCounter === 0) return;
    endTurn();
  };

  const handleRulesButtonClick = (event) => {
    setRulesVisibility(true)
  }

  useEffect(() => {
    const playButton = playButtonRef.current;
    const skipButton = skipButtonRef.current;
  });


  useEffect(() => {
    if (turn > 1 && turn <= 10 && score < 13 && playerHand.length === 0) {
      console.log('You are still alive.')
      startTurn()
    }
  }, [turn]);


  useEffect(() => {
    if (shots >= 3) {
      console.log('You have been shot.')
      setLoadingMessage('You have been shot.')
      setTimeout(() => {
        endTurn();
      }, 1000);
    }
  }, [shots]);

  useEffect(() => {
    if (score >= 13) {
      console.log('You have won the game.');
      setTurn(0);
      setScore(0);
      setGameOutcomeMessage('VICTORY');
      setPlayButtonMessage('PLAY');
    }
    if (turn > 10 && score < 13) {
      console.log('You have lost the game.');
      setTurn(0);
      setScore(0);
      setGameOutcomeMessage('game-over');
      setPlayButtonMessage('PLAY');
    }
  }, [score, turn]);

  useEffect(() => {
    if (turnPhase === 'DRAW') {
      setTimeout(() => {
        drawDice();
      }, 1000);
    }
    if (turnPhase === 'ROLL') {
      setTimeout(() => {
        rollDice();
      }, 1000);
    } 
  }, [turnPhase]);

  return (
    <div className={style['container']}>
      <ScoreBoard />
      <div className={style['roll-panel']} style={{ visibility: (turn === 0 && gameOutcomeMessage === '') ? 'hidden' : 'visible' }}>
        {playerHand.length > 0 && score < 13 && turnPhase === 'DRAW' && playerHand.map((die) => <div key={uuidv4()} className={style['color-box']}><div style={{ backgroundColor: die.color }}></div></div>)}
        {rollResult.length > 0 && score < 13 && turnPhase === 'ROLL' && rollResult.map((die) => <DieThumbnail key={uuidv4()} color={die.color} face={die.face}/>)}
        {loadingMessage !== '' && <span>{loadingMessage}</span>}
        {gameOutcomeMessage === 'VICTORY' && <h2>VICTORY</h2>}
        {gameOutcomeMessage === 'game-over' && <h2>Game Over</h2>}
      </div>
      <div className={style['control-panel']}>
        {score <= 13 && 
          <button 
            ref={playButtonRef} 
            onClick={handlePlayButtonClick} 
            style={{ opacity: 
              turn === 0 ||
              playButtonMessage !== '' &&
              playerHand.length > 0 ||
              (rollResult.length > 0 &&
              playerHand.length === 0) 
              ? 
              '100%' 
              : 
              '40%'
              }}>{playButtonMessage}</button>}
        {turn !== 0 && score <= 13 &&
          <button 
            ref={skipButtonRef} 
            onClick={handleSkipButtonClick} 
            style={{ 
              opacity: (
                playerHand.length === 0 &&
                loadingMessage === '' &&
                rollCounter > 0 
              ) ? '100%' : '40%'
            }}
          >
            END TURN
          </button>}
        {turn === 0 && <button onClick={handleRulesButtonClick}>RULES</button>}
      </div>
    </div>
  );
};

export default GameStage;