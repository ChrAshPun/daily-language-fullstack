import React from 'react';
import styles from "./VerbConjugationPage.module.scss";
import Content from '../components/VerbConjugationPage/Content'
import BackButton from '../components/VerbConjugationPage/BackButton';

const VerbConjugationPage = () => {
  return (
    <div className={styles['page']}>
      <BackButton />
      <Content />
      <div></div> 
    </div>
  );
}

export default VerbConjugationPage;