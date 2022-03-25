import BigNumber from 'bignumber.js'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import usePresale from '../../../hooks/usePresale'
import { getDepositAmount } from '../../../presale/utils'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import PresaleABI from '../../../presale/lib/abi/presaleErc20.json'
import ERC20ABI from '../../../presale/lib/abi/aRIP.json'
import Web3 from 'web3'
// @ts-ignore
import { AbiItem } from 'web3-utils'
import { contractAddresses } from '../../../constants/contractAddresses'
import { useWallet } from '@binance-chain/bsc-use-wallet'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const PrettoSlider = withStyles({
  root: {
    color: '#21c894',
    height: 3,
    width: '100%',
  },
  thumb: {
    height: 34,
    width: 20,
    borderRadius: 'inherit',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    zIndex: 0,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 5,
    borderRadius: 1,
    display: 'block',
  },
  rail: {
    height: 5,
    borderRadius: 20,
    display: 'block',
  },
})(Slider);

const Balances: React.FC = () => {
  const classes = useStyles();
  const [depositAmount, setDepositAmount] = useState<number>()
  const presale = usePresale();
  const wallet = useWallet();
  const initialBlock = 16176579;

  // const [depositNum, setNum] = useState(0)
  const [blockNum, setBlockNum] = useState(initialBlock)

  const web3 = new Web3(new Web3.providers.HttpProvider("https://speedy-nodes-nyc.moralis.io/9f1fe98d210bc4fca911bee2/bsc/mainnet/archive"));
  const web3Wss = new Web3(new Web3.providers.WebsocketProvider("wss://speedy-nodes-nyc.moralis.io/9f1fe98d210bc4fca911bee2/bsc/mainnet/archive/ws"));
  const presaleContract = new web3.eth.Contract((PresaleABI as unknown) as AbiItem[], contractAddresses.PresaleErc20[wallet.chainId]);
  const aRIPContract = new web3Wss.eth.Contract((ERC20ABI as unknown) as AbiItem[], contractAddresses.aRIP[wallet.chainId]);

  // const handledeposit = useCallback(async () => {    
  //   setNum(parseFloat(web3.utils.fromWei(await web3.eth.getBalance(contractAddresses.PresaleErc20[wallet.chainId]))))
  // }, [])

  // handledeposit();

  useEffect(() => {
    const getBlockNum = async () => {
      setBlockNum(await web3.eth.getBlockNumber())
    }
    getBlockNum()
  }, [])

  useEffect(() => {
    async function fetchDepositAmount() {
      const amount = await getDepositAmount(presaleContract)
      setDepositAmount(parseFloat(web3.utils.fromWei(amount.toString(), "gwei")))
    }
    fetchDepositAmount()
    let options = {
      filter: {
          value: [] as any[],
      },
      fromBlock: blockNum,
      toBlock: 'latest'
    };
    // if(blockNum >= initialBlock) {
    aRIPContract.events.Transfer(options)
    .on('data', (event: any) => {
      console.log(event)
      if (presaleContract) {
        fetchDepositAmount()
      }
    })
    .on('changed', (changed: any) => console.log(changed))
    .on('error', (err: any) => console.log(err))
    .on('connected', (str: string) => console.log(str))
    // }
  }, [blockNum])

  return (
    <div>
      <div style={{display: 'inline-flex', width:'100%' }}>
        <StyledBalance>
          <div style={{ flex: 1, }}>
            <div style={{display: 'flex', placeContent:'center'}}>
              <Label text="Presale progress: " />
              <span>&nbsp;</span>
              <Value
                value={depositAmount}
              />
              <Label text=" BNB / 2000 BNB" />
            </div>
            <div className={classes.root}>
              <PrettoSlider className='' key={`PrettoSlider-${depositAmount}`}
                valueLabelDisplay="off" defaultValue={depositAmount} min={0} max={375}
                value={depositAmount}
                // onChange={handleSliderChange}
                aria-labelledby="continuous-slider"
              />
            </div>
          </div>

        </StyledBalance>
      </div>
      <div style={{display: "block", textAlign: "center"}}>{depositAmount?(depositAmount/2000*100).toFixed(2):0} %</div>
  </div>
)
}

const StyledBalance = styled.div`
  margin-top: 40px;
  width: 100%
  align-items: center;
  display: flex;
  flex: 1;
`

export default Balances
