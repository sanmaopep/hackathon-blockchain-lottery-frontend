import { Lottery } from './../store/lottery';
import { getBaseReq } from '@/utils/getBaseReq';
import service from '@/utils/fetch';
import { toast } from 'react-toastify';

export async function createLottery(lottery: Lottery) {
  toast(JSON.stringify(lottery));
  return service.post('/lotteryservice/lottery', {
    ...lottery,
    // base_req: getBaseReq(),
  });
}

export async function getLotteries() {}

export async function getLottery(id: string) {}
