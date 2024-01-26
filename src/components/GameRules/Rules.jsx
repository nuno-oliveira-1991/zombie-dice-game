import style from './game-rules-styles.module.scss'

const GameRules = () => {

  return (
    <div className={style['container']}>
      <h2>Zombie Dice Rules</h2>
      <p>You are hungry zombie looking for brains in an apocalyptical scenario. Throw dice to hunt humans, each throw you get 3 dice, that can contain a face with brain, steps, or shot. You have 10 turns to win the game by obtaining 13 or more brains.</p>
      <p>You have unlimited throws per turn and you get to collect brains as long as you don't accumulate 3 shots, but you'll only score them if pass the turn.</p>
      <p>There are 13 dice, 6 green, 4 yellow, 3 red. Red has more faces with shots and green has more faces with brains, yellow has less shots and brains and more steps, which by the way means that if you don't pass the turn you'll have to include it in the next throw.</p>
      <h4>Are you ready for some braaaaaains!?</h4>
    </div>

  )
}

export default GameRules;