import { convertStringToBytes, sortObject } from '@/utils/utils';

import { Mnemonic } from './../utils/constants';
import service from '@/utils/fetch';
import { toast } from 'react-toastify';

const cosmosjs = require('@cosmostation/cosmosjs');

interface Msg {
  type: string;
  [key: string]: any;
}

class CosmosState {
  lcdUrl = 'http://192.168.137.171';
  chainId = 'cosmoshub-lotterychain';
  cosmos;

  // info for current user
  address;
  ecpairPriv;
  account_number;
  sequence;
  mnemonic;

  constructor() {
    this.cosmos = cosmosjs.network(this.lcdUrl, this.chainId);

    this.setMnemonic(Mnemonic);
  }

  setMnemonic(mnemonic) {
    this.mnemonic = mnemonic;
    this.address = this.cosmos.getAddress(mnemonic);
    this.ecpairPriv = this.cosmos.getECPairPriv(mnemonic);
  }

  async getAccount() {
    const { result } = await service.get(this.lcdUrl + '/auth/accounts/' + this.address);
    const { account_number, sequence } = result.value;

    this.account_number = account_number;
    this.sequence = sequence;

    return result.value;
  }

  async broadcastMsgs(msgs: Msg[]) {
    const { chainId } = this;

    const { account_number, sequence } = await this.getAccount();

    const msgJson = {
      chain_id: chainId,
      account_number,
      sequence,
      fee: {
        amount: [],
        gas: '200000',
      },
      msgs: msgs,
      memo: '',
    };

    const stdSignMsg = {
      json: msgJson,
      bytes: convertStringToBytes(JSON.stringify(sortObject(msgJson))),
    };

    const signedTx = this.cosmos.sign(stdSignMsg, this.ecpairPriv);

    const response = await this.cosmos.broadcast(signedTx);

    if (response.code) {
      const errMsg = JSON.parse(response.raw_log).message;
      toast.error(errMsg);
      throw { msg: errMsg };
    }

    return response;
  }
}

const cosmosState = new CosmosState();
export default cosmosState;
