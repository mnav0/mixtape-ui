import styled from 'styled-components'

const FormContainer = styled.div`
  position: relative;
  top: 30px;
  margin-bottom: 30px;
`
const FormLabel = styled.label`
  font-family: 'Telegraf';
`

const ButtonBody = styled.p`
   font-family: 'Telegraf';
   font-weight: 600;
   margin-bottom: 0px;
   color: #fff;
`

const UnstyledButtonContainer = styled.div`
   & > button {
    background-color: #3228B2;
    border-style: none;
    padding: 10px;
    &: hover {
      box-shadow:
      6px 8px 0 0px #fff,
      8px 6px 0 0px #0D052C,
      8px 10px 0 0px #0D052C,
      4px 10px 0 0px #0D052C;
    }
    &:focus {
      outline: 0;
    }
   }
`

export {
    FormContainer,
    FormLabel,
    ButtonBody,
    UnstyledButtonContainer
}
  