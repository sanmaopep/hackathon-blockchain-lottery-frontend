import { Lottery } from './../store/lottery';
import cosmosState from '@/store/comos';
import service from '@/utils/fetch';
import { toast } from 'react-toastify';

export async function createLottery(lottery: Lottery) {
  const response = await cosmosState.broadcastMsgs([
    {
      type: 'lotteryservice/MsgCreateLottery',
      value: {
        ...lottery,
        hashed: lottery.hashed ? lottery.hashed : false,
        // @ts-ignore
        rounds: lottery.rounds ? lottery.rounds.map(num => String(num)) : [],
        owner: cosmosState.address,
      },
    },
  ]);

  toast.success('Add Successfully!');
  toast.success(JSON.stringify(response.raw_log));
}

export async function getLotteries() {
  const response = await service.get(cosmosState.lcdUrl + '/lotteryservice/lotteries');

  return [
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

export async function getLottery(id: string) {}
