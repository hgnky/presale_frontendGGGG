import React from 'react'
import styled from 'styled-components'
import Footer from '../Footer'

const Page: React.FC = ({ children }) => (
  <StyledPage>
    <StyledMain>{children}</StyledMain>
    <Footer />
  </StyledPage>
)

const StyledPage = styled.div`
  padding: 0;
  min-height: calc(100vh - ${(props) => props.theme.topBarSize}px);
  display: flex;
  flex-direction: column;
`

const StyledMain = styled.div`

  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  // @media (max-height: 900px) {
  //   min-height: calc(100vh - ${(props) => props.theme.topBarSize * 3}px);
  // }
  // @media screen and (min-width: 901px) and (max-width:1024px) {
  //   min-height: calc(100vh - ${(props) => props.theme.topBarSize * 6}px);
  // }
`
export default Page
