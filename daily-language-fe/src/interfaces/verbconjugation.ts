export interface IVerb {
  mood: string,
  tense: string,
  pronoun: string,
  infinitiveSpa: string,
  infinitiveEng: string,
  conjugatedSpa: string,
  conjugatedEng: string,
}

export interface IHUDProps {
  handleDropDown: (option: string) => void,
}

export interface IState {
  dictionary: IVerb[],
  verb: IVerb,
  isMatch: boolean,
  inputBorderColor: string,
  successes: number,
  mistakes: number,
}

export interface IRootState {
  verbConjugation: IState;
};
