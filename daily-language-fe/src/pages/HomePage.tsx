import React from 'react';
import styles from './HomePage.module.scss';
import Content from '../components/HomePage/Content';


const HomePage = () => {
  return (
    <div className={styles['home-page']}>
      <Content />
    </div>
  );
}

export default HomePage;