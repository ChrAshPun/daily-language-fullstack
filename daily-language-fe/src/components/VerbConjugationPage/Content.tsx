import React, { useEffect, useState, useRef } from 'react';
import styles from "./Content.module.scss";
import axios from "axios";
import HeadsUpDisplay from './HeadsUpDisplay';
import { IRootState } from '../../interfaces/verbconjugation'
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const verbConjugation = (state: IRootState) => state.verbConjugation;

const VerbConjugationMain = () => {
  const { dictionary, verb, inputBorderColor } = useSelector(verbConjugation);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const dispatch = useDispatch();

  const [ userInput, setUserInput ] = useState('');
  const [ runMatchCheck, setRunMatchCheck ] = useState(false);
  const [ errorMessage, setErrorMessage ]  = useState('');

  const resetGame = async (infinitive: string) => {
    // fetch dictionary
    try {
      const res = await axios.get(
        "https://christinapunla.dev/api/spanishverbs/",
        { params: { filterby: infinitive }},
      );
      const dict = res.data.map((verb: any) => {
        return {
          mood: verb.mood.toLowerCase(),
          tense: verb.tense.toLowerCase(),
          pronoun: verb.pronoun,
          infinitiveSpa: verb.infinitive_spa,
          infinitiveEng: verb.infinitive_eng,
          conjugatedSpa: verb.conjugated_spa,
          conjugatedEng: verb.conjugated_eng,
        }
      })

      // reset game state
      dispatch({ type: 'SETUP_GAME', value: {
          dictionary: dict,
          verb: dict[Math.floor(Math.random() * dict.length)],
          isMatch: false,
          inputBorderColor: 'none',
          successes: 0,
          mistakes: 0,
        } 
      });
  
      // reset UI
      setUserInput('');
      setRunMatchCheck(false);
      setErrorMessage('')
      inputRef?.current?.focus()
    } 
    catch (err: any) {
      console.error(err);
      setErrorMessage(`Sorry, there was a ${ err.name }: ${ err.message }`)
    }
  }

  useEffect(() => {
    const initGame = async () => {
      if (location.pathname === '/verbconjugation') {
        await resetGame('any');
      }
    }

    initGame()
  }, [location]);

  useEffect(() => {
    if (runMatchCheck) {
      // run a match check and change input color during 2s delay
      inputRef?.current?.blur()
      dispatch({ type: 'CHECK_ANSWER', value: userInput === verb.conjugatedSpa });

      // set input color back to default and get next verb
      const runColorInterval = setInterval(() => {
        // reset input and set next verb
        dispatch({ type: 'NEXT_VERB' })

        // reset UI
        setUserInput('')
        setRunMatchCheck(false)
        inputRef?.current?.focus()
      }, 2000); 
      
      return () => { 
        clearInterval(runColorInterval); 
      };
    }
  }, [runMatchCheck])

  const handleDropDown = async (infinitive: string) => {
    await resetGame(infinitive);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      setRunMatchCheck(true);
    }
  };

  return (
    <>
      { dictionary.length > 0 ? 
        <section className={styles['content']}>
          <div className={styles['position-abs']}>
            <HeadsUpDisplay handleDropDown={handleDropDown} />
            <h3 className={styles['infinitive']}>{verb.infinitiveSpa} - {verb.infinitiveEng}</h3>
            <p className={styles['mood-tense-pronoun']}>{verb.mood} {verb.tense} | {verb.pronoun}</p>
            <div className={styles['english-phrase']}>{verb.conjugatedEng}</div>
            <input 
              className={`${styles['input']} ${styles[inputBorderColor + '-input'] || ''}`} 
              type="text" 
              ref={inputRef}
              value={(inputBorderColor !== 'none') ? verb.conjugatedSpa : userInput} // show answer on match check
              onChange={handleInputChange}
              onKeyDown={handleKeyDown} 
            ></input>
          </div>
        </section>
      : 
        <section className={styles['content']}>
          <div className={styles['network-error']}>
            <h3 className={styles['message']}>{ errorMessage }</h3>
          </div>
        </section> 
      }
    </>
  );
}

export default VerbConjugationMain;