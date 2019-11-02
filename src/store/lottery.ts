import { observable } from 'mobx';

interface Lottery {
  id: string;
  status: string;
  description: string;
  name: string;
  people: number;
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
}

const lotteryState = new LotteryState();
export default lotteryState;
