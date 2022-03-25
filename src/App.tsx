import React, { useCallback, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { UseWalletProvider } from '@binance-chain/bsc-use-wallet'
import MobileMenu from './components/MobileMenu'
import TopBar from './components/TopBar'
import ModalsProvider from './contexts/Modals'
import PresaleProvider from './contexts/PresaleProvider'
import {lightTheme} from './theme'
import Home from './views/Home'
import Background from "./assets/img/background.svg";
import { rpc_url } from './presale/lib/constants'

const GlobalStyle = createGlobalStyle`
  body {
    background: ${(props: any) => props.theme.backgroundColor};
    color: ${(props: any) => props.theme.bodycolor};
  }
`;
const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)
  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  return (
    <Providers>
      <div style={{ backgroundColor: "black" }}>
        <div
          style={{ backgroundImage: `url(${Background})`, backgroundSize: "cover" }}
        >
          <Router>
            <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
            <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    
    <ThemeProvider theme={lightTheme}>
    <GlobalStyle/>
      <UseWalletProvider
        chainId={56}
        connectors={{
          walletconnect: { rpcUrl: rpc_url },
          // walletconnect: { rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org/' },
        }}
      >
        <PresaleProvider>
          <ModalsProvider>{children}</ModalsProvider>
        </PresaleProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

export default App
