import React from 'react';
import styles from './Content.module.scss';
import Header from './Header';
import MatchGameSection from './MatchGameSection';
import VerbConjugationSection from './VerbConjugationSection';


const Content = () => {
  return (
    <section className={styles['content']}>
      <div className={styles['position-abs']}>
        <Header />
        <div className={styles['exercises']}>
          <MatchGameSection />
          <VerbConjugationSection />
        </div>
        <div></div>
      </div>
    </section>
  );
}

export default Content;