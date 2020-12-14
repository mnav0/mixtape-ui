import styled from 'styled-components'

const EntryButton = styled.button`
  background-color: #3228B2;
  text-decoration: none;
  border-style: none;
  & > p {
      color: #fff;
      font-family: 'Telegraf';
      font-weight: 600;
      font-size: 20px;
      padding: 14px 40px 0 40px;
  }
  &:hover {
    box-shadow:
    6px 8px 0 0px #fff,
    8px 6px 0 0px #0D052C,
    8px 10px 0 0px #0D052C,
    4px 10px 0 0px #0D052C;
  }
  margin-top: 20px;
`

export {
    EntryButton
}