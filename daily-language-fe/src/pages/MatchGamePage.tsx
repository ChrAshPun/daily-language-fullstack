import React from 'react';
import styles from "./MatchGamePage.module.scss";
import BackButton from '../components/VerbConjugationPage/BackButton';
import Content from '../components/MatchGamePage/Content';

const MatchGamePage = () => {
  return (
    <div className={styles['page']}>
      <BackButton />
      <Content />
      <div></div>
    </div>
  );
}

export default MatchGamePage;