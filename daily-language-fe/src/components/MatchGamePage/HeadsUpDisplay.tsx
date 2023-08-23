import React from 'react';
import styles from './HeadsUpDisplay.module.scss';
import { IHUDProps, IRootState } from '../../interfaces/matchgame'
import { ReactComponent as Check } from "../../assets/check-solid.svg";
import { ReactComponent as XMark } from "../../assets/xmark-solid.svg";
import { useSelector } from 'react-redux';

const matchGame = (state: IRootState) => state.matchGame;

const HeadsUpDisplay:React.FC<IHUDProps>  = ({ resetMatchGame }) => {
  const { successes, mistakes } = useSelector(matchGame);

  const handleReset = () => {
    resetMatchGame();
  }

  return (
    <section className={styles['hud']}>
      <div className={styles['hud-score']}>
        <div><Check className={styles['check-icon']}/>{ successes }</div>
        <div><XMark className={styles['xmark-icon']}/>{ mistakes }</div>
      </div>
      <div className={styles['drop-down']} >
        <div className={styles['filter-by']} onClick={handleReset}>
          <p>Restart</p>
        </div>
      </div>
    </section>
  );
}

export default HeadsUpDisplay;