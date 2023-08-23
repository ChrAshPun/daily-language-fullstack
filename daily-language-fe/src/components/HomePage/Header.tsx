import React from 'react';
import styles from './Header.module.scss';
import { ReactComponent as Profile } from "../../assets/user-solid.svg";
import { ReactComponent as GitHub } from "../../assets/github.svg";

const Header = () => {
  return (
    <section className={styles['header']}>
      <div className={styles['title']}>
        <p>project by Christina Punla</p>
        <h2>Daily Language</h2>
      </div>
      <div className={styles['links']}>
        <a
          href="https://christinapunla.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Profile className={styles['svg']} />
        </a>
        <a
          href="https://github.com/chrashpun"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub className={styles['svg']} />
        </a>
      </div>
    </section>
  );
}

export default Header;