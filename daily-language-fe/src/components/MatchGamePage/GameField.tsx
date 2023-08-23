import React from 'react';
import styles from './GameField.module.scss';
import SpaSlot from './SpaSlot';
import EngSlot from './EngSlot';
import { IRootState } from '../../interfaces/matchgame'
import { useSelector } from 'react-redux';

const matchGame = (state: IRootState) => state.matchGame;

const GameField = () => {
  const { 
    spa0, spa1, spa2, spa3, spa4,
    eng0, eng1, eng2, eng3, eng4,
  } = useSelector(matchGame);

  const spaSlots = [spa0, spa1, spa2, spa3, spa4]
  const engSlots = [eng0, eng1, eng2, eng3, eng4]

  return (
    <div className={styles['match-game']}>
      <div className={styles['column']}>
        {spaSlots.map((slot) => {
          return <SpaSlot key={slot.id} slot={slot}/>
        })}
      </div>
      <div className={styles['column']}>
        {engSlots.map((slot) => {
          return <EngSlot key={slot.id} slot={slot}/>
        })}
      </div>
    </div>
  );
}

export default GameField;