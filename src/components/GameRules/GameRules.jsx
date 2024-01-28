import { useGameStatsContext } from '../../contexts/GameStatsContext'
import style from './game-rules-styles.module.scss'

const GameRules = () => {
  const {
    setRulesVisibility
  } = useGameStatsContext();

  return (
    <div className={style['container']}>
      <div className={style['text-container']}>
        <h2>Zombie Dice Rules</h2>
        <p>You are hungry zombie looking for brains in an apocalyptical scenario. Throw dice to hunt humans, each throw you get 3 dice, that each contain faces with brain, escape, or shot. You have 10 turns to win the game by obtaining 13 or more brains.</p>
        <p>You have unlimited throws per turn and you get to collect brains as long as you don't accumulate 3 shots, but you'll only score them if you pass the turn. The dice you get with escapes go back in the dice box.</p>
        <p>There are 13 dice, 6 green, 4 yellow, 3 red. Red has more faces with shots and green has more faces with brains, yellow has less shots and brains and more escapes.</p>
        <h4>Are you ready for some braaaaaains!?</h4>
      </div>
      <button className='btn' onClick={() => setRulesVisibility(false)}>PLAY</button>
    </div>

  )
}

export default GameRules;