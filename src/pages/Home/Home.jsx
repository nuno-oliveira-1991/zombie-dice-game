import style from './home-styles.module.scss';
import GameStage from '../../components/GameStage/GameStage';
import GameRules from '../../components/GameRules/Rules';

const Home = () => {
  return (
    <div className={style['container']}>
      <GameStage />
      <GameRules />
    </div>
  );
};

export default Home;