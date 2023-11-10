import style from './home-styles.module.scss';
import { diceBox } from './../../constants';
import ScoreBoard from './../../components/ScoreBoard/ScoreBoard';
import GameStage from './../../components/GameStage/GameStage';

const Home = () => {

  return (
    <div className={style['container']}>
      <ScoreBoard />
      <GameStage />
    </div>
  );
};

export default Home;