import { Reducer } from 'redux';
import { IState } from '../interfaces/verbconjugation'

export interface IVerb {
  mood: string,
  tense: string,
  pronoun: string,
  infinitiveSpa: string,
  infinitiveEng: string,
  conjugatedSpa: string,
  conjugatedEng: string,
}

const initialState: IState = {
  dictionary: [],
  verb: {
    mood: '',
    tense: '',
    pronoun: '',
    infinitiveSpa: '',
    infinitiveEng: '',
    conjugatedSpa: '',
    conjugatedEng: '',
  },
  isMatch: false,
  inputBorderColor: 'none',
  successes: 0,
  mistakes: 0,
};

const verbConjugationReducer: Reducer<IState, any> = (state = initialState, action) => {
  if (action.type === 'SETUP_GAME') {
    return {
      ...action.value,
    }
  }
  if (action.type === 'CHECK_ANSWER') {
    return {
      ...state,
      isMatch: action.value,
      inputBorderColor: (action.value) ? 'green' : 'red',
      successes: action.value ? state.successes + 1 : state.successes,
      mistakes: !action.value ? state.mistakes + 1 : state.mistakes,
    }
  }
  if (action.type === 'NEXT_VERB') {
    return {
      ...state,
      verb: state.dictionary[Math.floor(Math.random() * state.dictionary.length)],
      isMatch: false,
      inputBorderColor: 'none',
    }
  }
  return {
    dictionary: [],
    verb: {
      mood: '',
      tense: '',
      pronoun: '',
      infinitiveSpa: '',
      infinitiveEng: '',
      conjugatedSpa: '',
      conjugatedEng: '',
    },
    isMatch: false,
    inputBorderColor: 'none',
    successes: 0,
    mistakes: 0,
  }
}

export default verbConjugationReducer;