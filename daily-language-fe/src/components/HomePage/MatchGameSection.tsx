import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MatchGameSection.module.scss';
import PlayGameButton from './PlayGameButton';


const MatchGameSection = () => {
  return (
    <div className={styles['section']}>
      <div>
        <h3>Match Game</h3>
        <p>Match as many words as you can</p>
      </div>
      <Link to="/matchgame">
        <PlayGameButton color="purple" />
      </Link>
    </div>
  );
}

export default MatchGameSection;