async function main() {
  require("dotenv").config();
  const { API_URL, PRIVATE_KEY, TRANSFER_TO } = process.env;
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
  const web3 = createAlchemyWeb3(API_URL);
  const myAddress = "0x1c0f0Af3262A7213E59Be7f1440282279D788335";

  const nonce = await web3.eth.getTransactionCount(myAddress, "latest");

  const transaction = {
    to: TRANSFER_TO,
    value: 10000000000000000000, //10 ETH
    gas: 30000,
    nonce: nonce,
  };

  const signedTx = await web3.eth.accounts.signTransaction(
    transaction,
    PRIVATE_KEY
  );

  web3.eth.sendSignedTransaction(
    signedTx.rawTransaction,
    function (error, hash) {
      if (!error) {
        console.log(
          "🎉 The hash of your transaction is: ",
          hash,
          "\n Check Alchemy's Mempool to view the status of your transaction!"
        );
      } else {
        console.log(
          "❗Something went wrong while submitting your transaction:",
          error
        );
      }
    }
  );
}

main();
