import React from 'react';
import styles from "./BackButton.module.scss";
import { ReactComponent as ArrowLeft } from '../../assets/arrow-left-solid.svg';
import { Link } from 'react-router-dom';

function BackButton() {
  return (
    <Link to='/' className={styles['back-button']}>
        <ArrowLeft className={styles['arrow-left']}/>
        Back
    </Link>
  );
}

export default BackButton;