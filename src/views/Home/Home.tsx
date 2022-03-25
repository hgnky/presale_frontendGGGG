import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import styled from 'styled-components'
import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Balances from './components/Balances'
import { Input } from '@material-ui/core';
import * as bsc from '@binance-chain/bsc-use-wallet'
import { useWallet } from 'use-wallet'
import BigNumber from 'bignumber.js'
import usePresale from '../../hooks/usePresale'
import { deposit, claim, approveRIP } from '../../presale/utils'
import { useMediaQuery } from 'react-responsive'
import Value from '../../components/Value'
import Countdown from 'react-countdown'
import PresaleABI from '../../presale/lib/abi/presaleErc20.json'
import ERC20ABI from '../../presale/lib/abi/aRIP.json'
import aRIPMigrationABI from '../../presale/lib/abi/aRIPMigration.json'
import Web3 from 'web3'
//@ts-ignore
import { AbiItem } from 'web3-utils'
import Binance from 'binance-api-node'
import mainImg from '../../assets/img/main.gif'
import chef from '../../assets/img/r_rip.png'
import './Home.css';
import { getBalanceNumber } from '../../utils/formatBalance'
import { contractAddresses } from '../../constants/contractAddresses'
import { rpc_url } from '../../presale/lib/constants'

const binance = Binance()

const Home: React.FC = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 768px)'
  })

  const [balance, setBalance] = useState(new BigNumber(0))
  
  const { account }: { account: any } = bsc.useWallet()

  const wallet =  bsc.useWallet()

  let description = <div style={{textAlign:'center', fontSize:'26px', fontFamily: 'Optima', lineHeight:'48px', fontWeight:'bold'}}>
                    <span>Join The Presale</span>
                    </div>;

  const [leftTime, setCountTime] = useState(10000)
  const [firstTime] = useState(new Date().getTime())
  const [initialized, setInitialized] = useState(false)
  const [approved, setApproved] = useState(false)

  const web3 = new Web3(new Web3.providers.HttpProvider(rpc_url));
  const presaleContract = new web3.eth.Contract((PresaleABI as unknown) as AbiItem, contractAddresses.PresaleErc20[wallet.chainId]);
  const aRIPContract = new web3.eth.Contract((ERC20ABI as unknown) as AbiItem, contractAddresses.aRIP[wallet.chainId]);
  // const aRIPMigrationContract = new web3.eth.Contract((aRIPMigrationABI as unknown) as AbiItem, contractAddresses.aRIPMigration[wallet.chainId]);
  const getLoad = async () => {
    setCountTime(parseInt(await presaleContract.methods.endOfSale().call()) * 1000 - firstTime);
    // setInitialized(await aRIPMigrationContract.methods.isInitialized().call());
    setInitialized(false);
  }
  const getAllowance = async () => {
    console.log(parseInt(await aRIPContract.methods.allowance(wallet.account, contractAddresses.aRIPMigration[wallet.chainId]).call()));
    setApproved(parseInt((await aRIPContract.methods.allowance(wallet.account, contractAddresses.aRIPMigration[wallet.chainId]).call()).toString()) > 0)
  }

  useEffect(() => {
    getLoad()
  }, [])
  
  const [depositInput, setDepositNum] = useState(0)

  const depositInputChange = (e : any) => {
    let depositVal = e.target.value;
    setDepositNum (depositVal)
  }

  const presale = usePresale();

  const depositEther = () => {
    if(depositInput <= 0) return;
    deposit(presale, account, depositInput, wallet)
    .then(() => fetchBalance())
  };

  const claimEther = () => {
    if(depositInput <= 0) return;
    claim(presale, account, depositInput, wallet)
    .then(() => fetchBalance())
  };

  const approve = () => {
    // aRIPContract.methods.approve(contractAddresses.aRIPMigration[wallet.chainId], new BigNumber(100).times(new BigNumber(10).pow(9)).toString()).send({from: wallet.account})
    approveRIP(presale, account, contractAddresses.aRIPMigration[wallet.chainId], 100, wallet)
    .then(() => getAllowance())
  };

  const fetchBalance = useCallback(async () => {
    const aRIPBal = await aRIPContract.methods.balanceOf(wallet.account).call()
    console.log(aRIPBal);
    setBalance(new BigNumber(aRIPBal))
    // setCurrent(new Date().getTime());
  }, [account])

  useEffect(() => {
    if(account) {
      fetchBalance()
      // getAllowance()
      console.log(account);
    }
    else {
      setBalance(new BigNumber(0))
    }
  }, [account])

  return (
    <Page>        
      <StyledContainerG>
        <div style={{textAlign: "center"}}>
          <img style={{ width: "120px" }} src={chef} />
        </div>
        <h2 style={{textAlign: "center", margin: "0px", color: "red"}}>
          <Countdown date={leftTime+firstTime} />
        </h2>
        <div style={{display: isDesktopOrLaptop?'flex':'block', width: isDesktopOrLaptop?1072:'auto', margin: isDesktopOrLaptop?"auto":"auto", marginTop:"1rem"}}>
          <StyledContainer>
            <div style={{width:isDesktopOrLaptop?"456px":'auto', marginTop: "2rem"}}>
              <h1 style={{textAlign:'left'}}>Participant: Public</h1>
            </div>
            <div style={{textAlign: "center", borderBottom: "1px solid white", marginTop: "3rem"}}>
              <span>Maximum per wallet : 25 BNB</span>
            </div>
            <div style={{textAlign: "center", marginTop: "2rem"}}>
              <img src={chef} width="120" alt='logo' />
            </div>
            <Balances />
          </StyledContainer>
          <StyledContainerR>
            <div>
              {description}
            </div>
            <div className="borderLine" />
            <div className="bidAmount" style={{ marginTop: "1rem"}}>
              <span style={{fontSize: 15}}>Your Bid Amount: {getBalanceNumber(balance, 9)}BNB</span>
              <div style={{display:'flex', fontSize: 15}}>
                <span>Balance:&nbsp;</span>
                { wallet && 
                  <div>
                    <Value
                      value={new BigNumber(wallet.balance)
                          .div(new BigNumber(10).pow(18))
                          .toNumber()}
                    />
                  </div>
                }
                { !wallet &&
                  <span>--</span>
                }
                <span>BNB</span>
              </div>
            </div>
            <Input type='number' className="colorSecondary" onChange={depositInputChange} style={{width: '100%', bottom: 10, color: 'white', marginTop: "4rem", marginBottom: 0, }} placeholder='Bid Amount' />
            <div style={{marginTop:'50px'}}>
              <Button disabled ={!account || depositInput <=0} text="Deposit BNB" onClick={depositEther} variant="secondary" />
              <br />
              {
                approved?
                  <Button disabled ={!account || depositInput <=0 || !initialized || leftTime + firstTime > new Date().getTime()} text={!initialized?"Claim RIP":"Claim not started"} onClick={claimEther} variant="secondary" />
                  :<Button disabled ={!account || !initialized || leftTime + firstTime < new Date().getTime()} text={!initialized?"Approve RIP":"Claim not started"} onClick={approve} variant="secondary" />
              }
              {
                initialized&&
                  <small>
                    {/* <i className="fa fa-triangle" style={{fontSize:'10px', color: "black"}}></i> */}
                    After press approve button, button will be changed as claim button.
                  </small>
              }
            </div>
          </StyledContainerR>
        </div>
      </StyledContainerG>
    </Page>
  )
}

const StyledContainerG = styled.div`
  box-sizing: border-box;
  border: 1px solid #21c894;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 10%), 0 6px 20px 0 rgb(0 0 0 / 19%);
  background-color: rgb(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 2rem;
  margin-top: 2rem
`

const StyledContainer = styled.div`
  box-sizing: border-box;
  margin: 0px;
  max-width: 456px;
  width: 100%;
  padding: 20px;
  position: relative;
  border: 1px solid #21c894;
  border-radius: 20px;
  font-family: "Nunito";
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 10%), 0 6px 20px 0 rgb(0 0 0 / 19%);
  background-color: black;
  color: white;
  @media (max-width: 767px) {
    // width: auto;
    // padding: 0px;
    // left: 0;
  }
`
const StyledContainerR = styled.div`
  box-sizing: border-box;
  margin: 0px;
  max-width: 456px;
  width: 100%;
  padding: 20px;
  position: relative;
  border: 1px solid #21c894;
  border-radius: 20px;
  font-family: "Nunito";
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 10%), 0 6px 20px 0 rgb(0 0 0 / 19%);
  background-color: black;
  color: white;
  margin: auto 0 0 auto;
  padding: 48px 56px;
  min-height: 475px;
  vertical-align: middle;
  @media (max-width: 767px) {
    margin-top:30px;
    padding: 48px 20px;
    // width: auto;
    // left: 0;
  }
`

export default Home
