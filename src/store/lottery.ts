import { observable } from 'mobx';

export interface Lottery {
  id: string;
  status: string;
  description: string;
  name: string;
  people: number;
  hashed?: boolean;
  rounds?: number[];
}

class LotteryState {
  @observable lotteries: Lottery[] = [
    {
      id: '233123',
      name: 'H1B Lottery',
      description: 'xxxx',
      people: 100,
      status: 'working',
    },
    {
      id: '213123333321',
      name: 'Company Lottery',
      description: 'xxxx',
      people: 100,
      status: 'working',
    },
    {
      id: '11111111',
      name: 'KKs Name',
      description: 'xxxx',
      people: 100,
      status: 'working',
    },
  ];

  @observable currentRound = 2;
  @observable rounds = [
    {
      num: 333,
      status: 'done',
      list: ['Yiwei Mao', 'Hello'],
    },
    {
      num: 323,
      status: '',
      list: [],
    },
    {
      num: 323,
      status: '',
      list: [],
    },
    {
      num: 123,
      status: '',
      list: [],
    },
  ];
}

const lotteryState = new LotteryState();

export default lotteryState;
