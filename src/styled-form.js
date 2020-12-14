import styled from 'styled-components'
import { Link } from "react-router-dom"
import { colors } from './colors'

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

export {
    FormContainer,
    FormLabel,
    ButtonBody
}
  