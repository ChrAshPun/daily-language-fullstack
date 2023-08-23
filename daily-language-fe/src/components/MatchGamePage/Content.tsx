import React, { useState, useEffect } from 'react';
import axios from "axios";
import styles from './Content.module.scss';
import HeadsUpDisplay from './HeadsUpDisplay';
import GameField from './GameField';
import { IWord, ISlot, IRootState } from '../../interfaces/matchgame'
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const matchGame = (state: IRootState) => state.matchGame;

const Content = () => {
  const [ errorMessage, setErrorMessage ] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();

  const { 
    dictionary,
    spa0, spa1, spa2, spa3, spa4,
    eng0, eng1, eng2, eng3, eng4,
    refillState,
  } = useSelector(matchGame);

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const updateGameField = (count: number, dict: IWord[], spaColumn: ISlot[], engColumn: ISlot[]) => {
    const updateColumn = (column: ISlot[], wordsList: IWord[], lang: string): ISlot[] => {
      const wordsListCopy = [ ...wordsList ]
      return column.map((slot: ISlot) => {
        if (slot.state === 'disabled') {
          let random: number = Math.floor(Math.random() * 2)
          let word: any = random === 0 ? wordsListCopy.pop() : wordsListCopy.shift()
          return { id: slot.id, state: 'idle', lang, word: word[lang] }
        }
        return slot
      });
    };

    // get a sample list from the dictionary
    let wordList = []
    let i = 0;
    while (i < count) {
      let randomIdx: number = Math.floor(Math.random() * dict.length);
      const word: IWord = dict[randomIdx];
      wordList.push(word);
      i++;
    }
    
    // add new words to both columns
    const _spaColumn: ISlot[] = updateColumn(spaColumn, wordList, 'spa');
    const _engColumn: ISlot[] = updateColumn(engColumn, wordList, 'eng');
    
    return {        
      spa0: _spaColumn[0],
      spa1: _spaColumn[1],
      spa2: _spaColumn[2],
      spa3: _spaColumn[3],
      spa4: _spaColumn[4],
      eng0: _engColumn[0],
      eng1: _engColumn[1],
      eng2: _engColumn[2],
      eng3: _engColumn[3],
      eng4: _engColumn[4],
    } 
  }

  const resetMatchGame = async () => {
    // fetch dictionary
    let dict;
    if (dictionary.length > 0) {
      dict = dictionary
    } else {
      try {
        const querySize: string = '30';
        const res = await axios.get(
          "https://christinapunla.dev/api/spanishdict/",
          { params: { sample: querySize } },
        );
        dispatch({ type: 'SET_DICTIONARY', value: res.data });
        dict = res.data;
      } catch (error: any) {
        console.error(error);
        setErrorMessage(`Sorry, there was a ${ error.name }: ${ error.message }`)
      }
    }
    
    // create empty columns
    const emptySpaColumn = [ 
      { id: 0, state: 'disabled', lang: 'spa', word: '' }, 
      { id: 1, state: 'disabled', lang: 'spa', word: '' },
      { id: 2, state: 'disabled', lang: 'spa', word: '' },
      { id: 3, state: 'disabled', lang: 'spa', word: '' },
      { id: 4, state: 'disabled', lang: 'spa', word: '' },
    ];
    const emptyEngColumn = [ 
      { id: 0, state: 'disabled', lang: 'eng', word: '' }, 
      { id: 1, state: 'disabled', lang: 'eng', word: '' },
      { id: 2, state: 'disabled', lang: 'eng', word: '' },
      { id: 3, state: 'disabled', lang: 'eng', word: '' },
      { id: 4, state: 'disabled', lang: 'eng', word: '' },
    ];

    const gameState = updateGameField(5, dict, emptySpaColumn, emptyEngColumn);
    dispatch({ type: 'SETUP_MATCHGAME', value: gameState });
    setErrorMessage('')
  }

  useEffect(() => {
    const initMatchGame = async () => {
      if (location.pathname === '/matchgame') {
        await resetMatchGame();
      }
    }

    initMatchGame();
  }, [location]);

  useEffect(() => {
    const runDelay = async () => {
      // if matchfound, queue refill process
      if (refillState === 'listening') {
        const triggerRefill = [spa0, spa1, spa2, spa3, spa4].some(slot => slot.state === 'disabled');
        if (triggerRefill) {
          dispatch({ type: 'UPDATE_REFILLSTATE', value: 'queued' });
        }
      }
      // wait 2.5s before refilling game field
      else if (refillState === 'queued') {
        await delay(2500)
        dispatch({ type: 'UPDATE_REFILLSTATE', value: 'inprogress' });
      }
      // after delay, update game field
      else if (refillState === 'inprogress') {
        let spaSlots: ISlot[] = [spa0, spa1, spa2, spa3, spa4]
        let engSlots: ISlot[] = [eng0, eng1, eng2, eng3, eng4]
  
        // count matchesfound
        const count = spaSlots.reduce((count, slot) => {
          if (slot.state === 'disabled') {
            return count + 1;
          }
          return count;
        }, 0);

        // create new game field and update
        const newGameField = updateGameField(count, dictionary, spaSlots, engSlots);
        dispatch({ type: 'REFILL_GAMEFIELD', value: {
            ...newGameField,
            refillState: 'listening', // reset refill process
          }
        });
         
      }
    }

    runDelay();
  }, [refillState])

  return (
    <>
      { dictionary.length > 0 ? 
        <section className={styles['content']}>
          <div className={styles['position-abs']}>
            <HeadsUpDisplay resetMatchGame={resetMatchGame} />
            <h3 className={styles['instructions']}>Match all the words!</h3>
            <GameField />
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

export default Content;