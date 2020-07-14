export interface Message {
    author: string;
    message: string;
  }

export interface Dice {
  id: number;
  label: string;
  range: number;
  qty: number;
}

export interface DiceInput {
  dice: Dice[];
  mod: number;
}

export interface DiceResult extends Dice {
  result: number[];
}

export interface DiceOutput {
  dice: DiceResult[];
  mod: number;
  result: number;
}
