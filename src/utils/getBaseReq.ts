const cosmosjs = require('@cosmostation/cosmosjs');

export const lcdUrl = '';
export const chainId = '';

export function getBaseReq() {
  const cosmos = cosmosjs.network(lcdUrl, chainId);
  const mnemonic = '...';

  const address = cosmos.getAddress(mnemonic);

  return {
    from: address,
    chainId,
  };
}
