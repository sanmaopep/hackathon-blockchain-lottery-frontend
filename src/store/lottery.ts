import { autorun, computed, observable, toJS } from 'mobx';

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
  stopEnroll?: boolean;
}

export enum LotteryStatus {
  NotStart,
  Playing,
  Finish,
}

class LotteryState {
  @observable lotteries: Lottery[] = [];
  @observable currLottery: Lottery | undefined;
  @observable pplList: string[] = [];
  @observable winner: string[][] | null = null;

  @computed
  get status(): LotteryStatus {
    if (!this.currLottery) {
      return LotteryStatus.NotStart;
    }
    if (!this.currLottery.stopEnroll) {
      return LotteryStatus.NotStart;
    }
    if (this.winner !== null) {
      return LotteryStatus.Finish;
    } else {
      return LotteryStatus.Playing;
    }
  }

  @computed
  get sortedPpl(): string[] {
    let list = this.pplList.slice(0).reverse();

    if (this.winner) {
      let winnerList = this.winner.reduce((acm, curr) => {
        return acm.concat(curr);
      }, []);

      let loserList = this.pplList.filter(ppl => {
        return winnerList.indexOf(ppl) === -1;
      });

      list = winnerList.concat(loserList);
    }

    return list;
  }
}

const lotteryState = new LotteryState();

export default lotteryState;
