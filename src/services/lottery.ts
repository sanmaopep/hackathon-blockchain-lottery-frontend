import { Lottery } from './../store/lottery';
import cosmosState from '@/store/comos';
import { router } from 'umi';
import service from '@/utils/fetch';
import { toast } from 'react-toastify';

export async function createLottery(lottery: Lottery) {
  const response = await cosmosState.broadcastMsgs([
    {
      type: 'lotteryservice/MsgCreateLottery',
      value: {
        ...lottery,
        hashed: lottery.hashed ? lottery.hashed : false,
        rounds: lottery.rounds ? lottery.rounds.map(num => String(num)) : [],
        owner: cosmosState.address,
      },
    },
  ]);

  toast.success('Add Successfully!');
  toast.success(JSON.stringify(response.raw_log));
  router.replace('/lottery');
}

export async function getLotteries() {
  const response = await service.get(cosmosState.lcdUrl + '/lotteryservice/lotteries');

  if (!response) return;

  return response.result;
}

export async function getLottery(id: string) {
  const response = await service.get(cosmosState.lcdUrl + '/lotteryservice/lottery/' + id);
  const Lottery = response.result.Lottery;
  Lottery.currentRound = Number(Lottery.currentRound);

  return Lottery;
}

export async function addPplToLottery(lotteryId: string, candidates: string[]) {
  const response = await cosmosState.broadcastMsgs([
    {
      type: 'lotteryservice/MsgAddCandidates',
      value: {
        sender: cosmosState.address,
        id: lotteryId,
        candidates,
      },
    },
  ]);

  toast.success('Add Successfully!');
  toast.success(JSON.stringify(response.raw_log));
}

export async function getLotteryPpl(id: string) {
  const response = await service.get(
    cosmosState.lcdUrl + '/lotteryservice/lottery/' + id + '/candidates',
  );
  if (!response || !response.result) {
    return [];
  }

  return response.result;
}
