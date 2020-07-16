export interface Message {
    author: string;
    message: string;
  }

export interface Dice {
  id: number;
  label: string;
  range: number;
  qty: number;
  factor: number;
  mod: number;
}

export interface DiceInput {
  dice: Dice[];
  texture: string;
  fontColor: string;
  modifier: string;
  wipe: boolean;
  sound: string;
}

export interface DiceResult extends Dice {
  result: number[];
}

export interface DiceOutput {
  dice: DiceResult[];
  texture: string;
  fontColor: string;
  modifier: string;
  wipe: boolean;
  sound: string;
  result: number;
}
