import styled from 'styled-components'

const StyledButton = styled.button`
   background-color: ${props => props.color ? props.color : '#3228B2'};
   text-decoration: none;
   border-style: none;
   border: none;
   margin-right: 12px;
   & > p {
    font-family: 'Telegraf';
    font-weight: 600;
    margin-bottom: 0px;
    font-size: 16px;
    color: ${props => props.color ? '#0D052C' : '#fff'};
    padding: 10px;
   }
   &:hover {
      box-shadow:
      6px 8px 0 0px #fff,
      8px 6px 0 0px #0D052C,
      8px 10px 0 0px #0D052C,
      4px 10px 0 0px #0D052C;
    }
    &:focus {
      outline: 0;
    }
`

export { StyledButton }