import React, { useEffect, useMemo } from 'react';
import styles from './SpaSlot.module.scss';
import { ISlot, ISlotProps } from '../../interfaces/matchgame'
import { useDispatch } from 'react-redux';

const Slot:React.FC<ISlotProps> = ({ slot }) => {
  const dispatch = useDispatch();
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  const slotState = useMemo(() => slot.state, [slot.state]);

  const handleSpaSelect = (slot: ISlot) => {
    if (slot.state === 'idle' || slot.state === 'selected') {
      dispatch({ type: 'SELECTED_SPANISH', value: { ...slot, state: 'selected' } });
    }
  }

  useEffect(() => {
    const runDelay = async () => {
      if (slot.state === 'matchfound') {
        await delay(300);
        dispatch({ type: 'DISABLE_SLOT', value: slot });
      } else if (slot.state === 'notamatch') {
        await delay(300);
        dispatch({ type: 'ENABLE_SLOT', value: slot });
      }
    }
    runDelay();
  }, [slotState])

  return (
      <>
      { slot.state !== 'disabled' ?
        <div 
          className={`${styles['slot']}`}
          onClick={() => handleSpaSelect(slot)}
         >
          <button className={`
            ${styles['button']} 
            ${(slot.state !== 'idle') ? styles['button-down'] : styles['button-up']}
            ${(slot.state === 'selected') ? styles['selected-color'] : 
            (slot.state === 'matchfound') ? styles['matchfound-color'] :
            (slot.state === 'notamatch') ? styles['notamatch-color']: ''}
          `}>
            { slot.word }
          </button>
          <div className={styles['button-background']}></div>
        </div>
        :
        <div className={styles['placeholder']}></div>
      }
    </>
  );
}

export default Slot;

function classnames(arg0: string, arg1: boolean, arg2: string, arg3: boolean, arg4: string, arg5: boolean) {
  throw new Error('Function not implemented.');
}
