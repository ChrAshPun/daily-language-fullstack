import React, { useState, useEffect } from 'react';
import styles from "./HeadsUpDisplay.module.scss";
import axios from "axios";
import { IRootState } from '../../interfaces/verbconjugation'
import { useSelector} from 'react-redux';
import { IHUDProps } from '../../interfaces/verbconjugation'
import { ReactComponent as Check } from "../../assets/check-solid.svg";
import { ReactComponent as XMark } from "../../assets/xmark-solid.svg";
import { ReactComponent as ChevronDown } from "../../assets/chevron-down-solid.svg";
import { ReactComponent as ChevronUp } from "../../assets/chevron-up-solid.svg";

const verbConjugation = (state: IRootState) => state.verbConjugation;

const HeadsUpDisplay: React.FC<IHUDProps> = ({ handleDropDown }) => {
  const { successes, mistakes } = useSelector(verbConjugation);
  const [ options, setOptions ] = useState<string[]>([]);
  const [ showOptions, setShowOptions ] = useState(false);

  const toggleShowOptions = () => {
    setShowOptions(prev => !prev)
  }

  const onHandleFilter = (option: string) => {
    setShowOptions(false)
    handleDropDown(option)
  }

  useEffect(() => {
    const fetchDropDownOptions = async () => {
      await axios.get("https://christinapunla.dev/api/spanishinfinitives/")
        .then(res => {
          setOptions(['any', ...res.data]);
        })
        .catch(err => console.error(err))
    }

    fetchDropDownOptions();
  }, [])

  return (
    <div className={styles['hud']}>
      <div className={styles['hud-score']}>
        <div><Check className={styles['check-icon']}/>{ successes }</div>
        <div><XMark className={styles['xmark-icon']}/>{ mistakes }</div>
      </div>
      <div className={styles['drop-down']} >
        <div className={styles['filter-by']} onClick={toggleShowOptions}>
          <p>Filter By</p>
          { showOptions ? 
            <ChevronUp className={styles['chevron-icon']}/> 
            : <ChevronDown className={styles['chevron-icon']}/>
          }
        </div>
        { showOptions && (
          <ul className={styles['filter-options']}>
            {options.map(option => (
              <li key={option} value={option} onClick={() => onHandleFilter(option)}>
                { option }
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default HeadsUpDisplay;