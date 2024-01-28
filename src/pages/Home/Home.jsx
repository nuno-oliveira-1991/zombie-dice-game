import { useGameStatsContext } from '../../contexts/GameStatsContext';
import style from './home-styles.module.scss';
import GameStage from '../../components/GameStage/GameStage';
import GameRules from '../../components/GameRules/GameRules';

const Home = () => {
  const {
    rulesVisibility
  } = useGameStatsContext()


  return (
    <div className={style['container']}>
      <GameStage />
      {rulesVisibility === true && <GameRules />}
    </div>
  );
};

export default Home;