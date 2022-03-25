import React, { useCallback } from 'react'
import styled from 'styled-components'
import * as bsc from '@binance-chain/bsc-use-wallet'
import { BscConnector } from '@binance-chain/bsc-connector'
import useTokenA from '../../../hooks/useTokenA'
import Button from '../../Button'
import CardIcon from '../../CardIcon'
import Modal, { ModalProps } from '../../Modal'
import ModalActions from '../../ModalActions'
import ModalContent from '../../ModalContent'
import ModalTitle from '../../ModalTitle'
import Spacer from '../../Spacer'
import ripIcon from '../../../assets/img/r_rip.png'
import { contractAddresses } from '../../../constants/contractAddresses'

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { reset } = bsc.useWallet()

  const wallet = bsc.useWallet();
  const { ethereum }: { ethereum: any } = bsc.useWallet()

  const handleSignOutClick = useCallback(() => {
    onDismiss!()
    reset()
  }, [onDismiss, reset])

  const tokenA = useTokenA()

  const addRIP = async () => {
    const tokenAddress = contractAddresses.RIP[wallet.chainId];
    const tokenSymbol = 'RIP';
    const tokenDecimals = 9;
    const tokenImage = 'http://placekitten.com/200/300';

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            // image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log('Thanks for your interest!');
      } else {
        console.log('Your loss!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const addaRIP = async () => {
    const tokenAddress = contractAddresses.aRIP[wallet.chainId];
    const tokenSymbol = 'aRIP';
    const tokenDecimals = 9;
    const tokenImage = 'http://placekitten.com/200/300';
    try{
      const wasAdded = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            // image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log('Thanks for your interest!');
      } else {
        console.log('Your loss!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Modal>
        <ModalTitle text="My Account" />
        <ModalContent>
          <Spacer />

          <div style={{ display: 'flex' }}>
            <StyledBalanceWrapper>
              <CardIcon>
                <img style={{width: 70}} src={ripIcon}></img>
              </CardIcon>
              <StyledBalance>
              </StyledBalance>
            </StyledBalanceWrapper>
          </div>

          <Spacer />
          <div style={{width: 316, marginLeft: 'auto', marginRight: 'auto', position: 'relative', bottom: 12,}}>
            <Button
              href= {'https://bscscan.com/address/' + wallet.account}
              text="View on Bscscan"
              variant="secondary"
            />
          </div>
          <Spacer />
          <div style={{width: 316, marginLeft: 'auto', marginRight: 'auto', position: 'relative', bottom: 12,}}>
            <Button
              onClick={addRIP}
              text="Add RIP to Wallet"
              variant="secondary"
            />
          </div>
          <Spacer />
          <div style={{width: 316, marginLeft: 'auto', marginRight: 'auto', position: 'relative', bottom: 12,}}>
            <Button
              onClick={addaRIP}
              text="Add aRIP to Wallet"
              variant="secondary"
            />
          </div>
          <Spacer />
          <div style={{width: 316, marginLeft: 'auto', marginRight: 'auto', position: 'relative', bottom: 12,}}>
            <Button
              onClick={handleSignOutClick}
              text="Sign out"
              variant="secondary"
            />
          </div>
        </ModalContent>
        <ModalActions>
          <div style={{width: 180, marginLeft: 'auto', marginRight: 'auto', position: 'relative', bottom: 12,}}>
            <Button onClick={onDismiss} text="Cancel" />
          </div>
        </ModalActions>
      </Modal>
    </div>
  )
}

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

export default AccountModal
