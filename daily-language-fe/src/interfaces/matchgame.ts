export interface IWord {
  spa: string,
  eng: string,
}

export interface ISlot {
  id: number,
  state: string,
  lang: string,
  word: string,
}

export interface IHUDProps {
  resetMatchGame: () => void,
}

export interface IMatchGame {
  dictionary: IWord[],
  spa0: ISlot,
  spa1: ISlot,
  spa2: ISlot,
  spa3: ISlot,
  spa4: ISlot,
  eng0: ISlot,
  eng1: ISlot,
  eng2: ISlot,
  eng3: ISlot,
  eng4: ISlot,
  selectedSpa: ISlot | null,
  selectedEng: ISlot | null,
  refillState: string,
  successes: number,
  mistakes: number,
}

export interface ISlotProps {
  slot: ISlot,
}

export interface IRootState {
  matchGame: IMatchGame;
};