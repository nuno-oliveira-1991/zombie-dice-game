import { createContext, useContext, useState } from 'react';
import { diceBox } from './../constants'

const GameStatsContext = createContext();

export const useGameStatsContext = () => {
  const context = useContext(GameStatsContext);
  if (!context) {
    throw new Error('useGameStatsContext must be used within a GameStatsContextProvider');
  };
  return context;
};

export const GameStatsContextProvider = ({ children }) => {
  const [rulesVisibility, setRulesVisibility] = useState(false);
  const [gameOutcomeMessage, setGameOutcomeMessage] = useState('');
  const [score, setScore] = useState(0);
  const [turn, setTurn] = useState(0);
  const [turnPhase, setTurnPhase] = useState('');
  const [brains, setBrains] = useState(0);
  const [shots, setShots] = useState(0);
  const [rollCounter, setRollCounter] = useState(0);
  const [diceInsideBox, setDiceInsideBox] = useState(diceBox);
  const [playerHand, setPlayerHand] = useState([]);
  const [playButtonMessage, setPlayButtonMessage] = useState('PLAY');
  const [rollResult, setRollResult] = useState([])
  const [loadingMessage, setLoadingMessage] = useState('')

  const contextValue = {
    rulesVisibility,
    setRulesVisibility,
    score, 
    setScore,
    turn,
    setTurn,
    turnPhase,
    setTurnPhase,
    brains,
    setBrains,
    shots,
    setShots,
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
    loadingMessage,
    setLoadingMessage,
    gameOutcomeMessage,
    setGameOutcomeMessage
  };

  return (
    <GameStatsContext.Provider value={contextValue}>
      {children}
    </GameStatsContext.Provider>
  );
};