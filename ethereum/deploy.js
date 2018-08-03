const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('./build/ElectionFactory.json');

const provider = new HDWalletProvider(
  process.env.WORD_SEED,
  process.env.INFURA_URL
);

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(
      JSON.parse(compiledFactory.interface)
    )
      .deploy({ data: '0x' + compiledFactory.bytecode })
      .send({ from: accounts[0], gas: '1000000' });
    console.log('Contract deployed to', result.options.address);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

deploy();
