import { Reducer } from 'redux';
import { IMatchGame } from '../interfaces/matchgame'

const initGameState: IMatchGame = {
  dictionary: [],
  spa0: { id: 0, state: 'idle', lang: 'spa', word: '' },
  spa1: { id: 1, state: 'idle', lang: 'spa', word: '' },
  spa2: { id: 2, state: 'idle', lang: 'spa', word: '' },
  spa3: { id: 3, state: 'idle', lang: 'spa', word: '' },
  spa4: { id: 4, state: 'idle', lang: 'spa', word: '' },
  eng0: { id: 0, state: 'idle', lang: 'eng', word: '' },
  eng1: { id: 1, state: 'idle', lang: 'eng', word: '' },
  eng2: { id: 2, state: 'idle', lang: 'eng', word: '' },
  eng3: { id: 3, state: 'idle', lang: 'eng', word: '' },
  eng4: { id: 4, state: 'idle', lang: 'eng', word: '' },
  selectedSpa: null,
  selectedEng: null,
  refillState: 'listening',
  successes: 0,
  mistakes: 0,
};

const matchGameReducer: Reducer<IMatchGame, any> = (state = initGameState, action: any) => {
  if (action.type === 'SET_DICTIONARY') {
    return {
      ...state,
      dictionary: action.value,
    }
  }
  if (action.type === 'SETUP_MATCHGAME') {
    return {
      dictionary: state.dictionary,
      ...action.value, // game field
      selectedSpa: null,
      selectedEng: null,
      refillState: 'listening',
      successes: 0,
      mistakes: 0,
    }
  }
  if (action.type === 'REFILL_GAMEFIELD') {
    return {
      ...state,
      ...action.value,
    }
  }
  if (action.type === 'SELECTED_SPANISH') {
    // if no selections have been made
    if (!state.selectedSpa && !state.selectedEng) { 
      return {
        ...state,
        [`spa${action.value.id}`]: action.value,
        selectedSpa: action.value,
      }
    }

    // deselect
    else if (state.selectedSpa && action.value.id === state.selectedSpa.id) {
      return {
        ...state,
        [`spa${action.value.id}`]: { ...action.value, state: 'idle' },
        selectedSpa: null,
      }
    } 

    // change selection
    else if (state.selectedSpa && action.value.id !== state.selectedSpa.id) {
      return {
        ...state,
        [`spa${action.value.id}`]: { ...action.value, state: 'selected' },
        [`spa${state.selectedSpa.id}`]: { ...state.selectedSpa, state: 'idle' },
        selectedSpa: { ...action.value },
      }
    } 

    // if there is a eng selection, check for match
    else if (state.selectedEng) {
      // get matching word from dict
      const word = state.dictionary.find(word => word?.spa === action.value.word)
      const matchStatus = (word?.spa === action.value.word && word?.eng === state.selectedEng.word) ? 
        'matchfound' : 'notamatch'

      // if selectedSpa, set that slot back to idle
      if (state.selectedSpa) {
        return {
          ...state,
          [`spa${action.value.id}`]: { ...action.value, state: matchStatus },
          [`eng${state.selectedEng.id}`]: { ...state.selectedEng, state: matchStatus },
          [`spa${state.selectedSpa.id}`]: { ...state.selectedSpa, state: 'idle' }, // back to idle
          selectedSpa: null,
          selectedEng: null,
          successes: (matchStatus === 'matchfound') ? state.successes + 1 : state.successes,
          mistakes: (matchStatus === 'notamatch') ? state.mistakes + 1 : state.mistakes,
        }
      } 
      return {
        ...state,
        [`spa${action.value.id}`]: { ...action.value, state: matchStatus },
        [`eng${state.selectedEng.id}`]: { ...state.selectedEng, state: matchStatus },
        selectedSpa: null,
        selectedEng: null,
        successes: (matchStatus === 'matchfound') ? state.successes + 1 : state.successes,
        mistakes: (matchStatus === 'notamatch') ? state.mistakes + 1 : state.mistakes,
      }
    }
    
  }
  if (action.type === 'SELECTED_ENGLISH') {
    // if no selections have been made
    if (!state.selectedSpa && !state.selectedEng) { 
      return {
        ...state,
        [`eng${action.value.id}`]: action.value,
        selectedEng: action.value,
      }
    }

    // deselect
    else if (state.selectedEng && action.value.id === state.selectedEng.id) {
      return {
        ...state,
        [`eng${action.value.id}`]: { ...action.value, state: 'idle' },
        selectedEng: null,
      }
    } 

    // change selection
    else if (state.selectedEng && action.value.id !== state.selectedEng.id) {
      return {
        ...state,
        [`eng${action.value.id}`]: { ...action.value, state: 'selected' },
        [`eng${state.selectedEng.id}`]: { ...state.selectedEng, state: 'idle' },
        selectedEng: { ...action.value },
      }
    }

    // if there is a spa selection, check for match
    else if (state.selectedSpa) {
      // get matching word from dict
      const word = state.dictionary.find(word => word?.eng === action.value.word)
      const matchStatus = (word?.eng === action.value.word && word?.spa === state.selectedSpa.word) ? 
        'matchfound' : 'notamatch'

      // if selectedSpa, set that slot back to idle
      if (state.selectedEng) {
        return {
          ...state,
          [`spa${state.selectedSpa.id}`]: { ...state.selectedSpa, state: matchStatus },
          [`eng${action.value.id}`]: { ...action.value, state: matchStatus },
          [`eng${state.selectedEng.id}`]: { ...state.selectedEng, state: 'idle' }, // back to idle
          selectedSpa: null,
          selectedEng: null,
          successes: (matchStatus === 'matchfound') ? state.successes + 1 : state.successes,
          mistakes: (matchStatus === 'notamatch') ? state.mistakes + 1 : state.mistakes,
        }
      } 
      return {
        ...state,
        [`spa${state.selectedSpa.id}`]: { ...state.selectedSpa, state: matchStatus },
        [`eng${action.value.id}`]: { ...action.value, state: matchStatus },
        selectedSpa: null,
        selectedEng: null,
        successes: (matchStatus === 'matchfound') ? state.successes + 1 : state.successes,
        mistakes: (matchStatus === 'notamatch') ? state.mistakes + 1 : state.mistakes,
      }
    }
    
  }
  if (action.type === 'RESET_SELECTIONS') {
    return {
      ...state,
      selectedSpa: null,
      selectedEng: null,
    }
  }
  if (action.type === 'DISABLE_SLOT') {
    return {
      ...state,
      [`${action.value.lang}${action.value.id}`]: { ...action.value, state: 'disabled' },
      refillState: 'queued' // start refill bc matchfound
    }
  }
  // if matchnotfound, re-enable slot
  if (action.type === 'ENABLE_SLOT') {
    return {
      ...state,
      [`${action.value.lang}${action.value.id}`]: { ...action.value, state: 'idle' },
    }
  }
  if (action.type === 'UPDATE_REFILLSTATE') {
    return {
      ...state,
      refillState: action.value,
    }
  }
  return { ...state };
};

export default matchGameReducer;