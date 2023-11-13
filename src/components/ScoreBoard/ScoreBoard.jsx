import { useEffect } from 'react';
import { useGameStatsContext } from '../../contexts/GameStatsContext';
import style from './score-board-styles.module.scss'

const ScoreBoard = () => {
  const {
    score,
    turn,
    turnPhase,
    diceInsideBox,
    shots,
    brains,
    rollCounter,
    playerHand
  } = useGameStatsContext();

  return (
    <div className={style['container']}>
      <div className={style['score-panel']}>
        <span>{`Turn : ${turn}`}</span>
        <span>{`Phase : ${turnPhase}`}</span>
        <span>{`Dice in Box : ${diceInsideBox.length}`}</span>
        <span>{`Dice in Hand : ${playerHand.length}`}</span>
      </div>
      <div className={style['score-panel']}>
        <span>{`Score : ${score}`}</span>
        <span>{`Rolls : ${rollCounter}`}</span>
        <span className={style['brain-counter']}>{`Brains : ${brains}`}</span>
        <span className={style['shot-counter']}>{`Shots : ${shots}`}</span>
      </div>
    </div>
  )
}

export default ScoreBoard;