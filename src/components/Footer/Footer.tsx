import React from 'react'
import styled from 'styled-components'

import Nav from './components/Nav'
import bgImg from '../../assets/img/footerbg.svg'

const Footer: React.FC = () => (
  <StyledFooter>
    <StyledFooterInner>
      <Nav />
    </StyledFooterInner>
  </StyledFooter>
)

const StyledFooter = styled.footer`
  padding-top: 4%;
  justify-content: center;
  margin-bottom: 2rem;
`
const StyledFooterInner = styled.div`
  align-items: start;
  display: flex;
  justify-content: center;
  width: 100%;
`
const StyledImg = styled.div`
background-position: center bottom;
background-repeat: repeat-x;
padding-bottom: 17%;
background-size: 50%;
`

export default Footer