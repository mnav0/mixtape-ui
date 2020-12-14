import styled from 'styled-components'

const WelcomeHeader = styled.h1`
  font-family: 'Hatton Bold';
  margin: 50px 0 30px 0;
  padding: 0;
  left: 0;
`

const Artist = styled.div`
  font-family: 'Gatwick';
  background-color: #E3DAFD;
  height: 300px;
  padding-top: 110px;
  text-align: center;
  margin: 10px 8px 20px 0;
  width: calc(50% - 8px);
  & > h2 {
    font-size: 24px;
    font-weight: 900;
  }
  cursor: pointer;
  &:hover {
    box-shadow:
    6px 8px 0 0px #fff,
    8px 6px 0 0px #0D052C,
    8px 10px 0 0px #0D052C,
    4px 10px 0 0px #0D052C;
  }
`

const Listener = styled.div`
  font-family: 'Gatwick';
  font-weight: 900;
  height: 300px;
  padding-top: 110px;
  margin: 10px 0 20px 8px;
  width: calc(50% - 8px);
  text-align: center;
  background-color: #FFF3C9;
  & > h2 {
    font-size: 24px;
    font-weight: 900;
  }
  cursor: pointer;
  &:hover {
    box-shadow:
    6px 8px 0 0px #fff,
    8px 6px 0 0px #0D052C,
    8px 10px 0 0px #0D052C,
    4px 10px 0 0px #0D052C;
  }
`

export {
    WelcomeHeader,
    Artist,
    Listener
}