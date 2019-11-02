import { observable } from 'mobx';

export interface Lottery {
  id: string;
  status: string;
  description: string;
  title: string;
  people: number;
  hashed?: boolean;
  rounds?: number[];
  currentRound?: number;
  candidateNum?: number;
}

class LotteryState {
  @observable lotteries: Lottery[] = [];
  @observable currLottery: Lottery | undefined;
  @observable pplList: string[] = [];
}

const lotteryState = new LotteryState();

export default lotteryState;
