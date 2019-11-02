import React from 'react';
import styles from './index.css';
const cosmosjs = require('@cosmostation/cosmosjs');

export default function() {
  const chainId = 'cosmoshub-2';
  const cosmos = cosmosjs.network('10.10.200.243', chainId);

  const mnemonic =
    'inherit peanut drastic rigid wheat current gown monster color marine hire key surface among group burst limit slogan stereo oyster license salad lecture spawn';
  const address = cosmos.getAddress(mnemonic);
  const ecpairPriv = cosmos.getECPairPriv(mnemonic);

  return (
    <div className={styles.normal}>
      <p>{address}</p>
      <p>{ecpairPriv}</p>
    </div>
  );
}
