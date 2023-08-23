import React from 'react';
import { Link } from 'react-router-dom';
import styles from './VerbConjugationSection.module.scss';
import PlayGameButton from './PlayGameButton';


const VerbConjugationSection = () => {
  return (
    <div className={styles['section']}>
      <Link to="/verbconjugation"><PlayGameButton color="blue" /></Link>
      <div className={styles['title']}>
        <h3>Verb Conjugation</h3>
        <p>Practice conjugating verbs</p>
      </div>
    </div>
  );
}

export default VerbConjugationSection;