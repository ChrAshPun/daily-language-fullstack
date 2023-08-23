import React, { useEffect, useRef, useState } from "react";
import styles from "./PlayGameButton.module.scss";

interface Props {
  color: string,
}

const PlayGameButton:React.FC<Props> = ({ color }) => {
  const [btnDown, setBtnDown] = useState<boolean>(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (btnRef.current) {
      btnRef.current.addEventListener('mousedown', () => setBtnDown(true));
      btnRef.current.addEventListener('mouseup', () => setBtnDown(false));
    }
  }, [])

  return (
    <div 
      className={
        `${styles['button-bg']}
        ${ color === 'purple' ? styles['purple-bg'] : styles['blue-bg']}`
      }
    >
      <button
        ref={btnRef}
        className={`
          ${btnDown ? styles['button-down'] : styles['button-up']}
          ${ color === 'purple' ? styles['purple'] : styles['blue']}
        `}
      >
        Play Game
      </button>
    </div>
  )
}

export default PlayGameButton