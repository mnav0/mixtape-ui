import styled from 'styled-components'
import { Link } from "react-router-dom"
import { colors } from './colors'

const PageHeader = styled.h1`
  font-family: 'Hatton Bold';
  color: ${colors.darkBlue};
`

const TableHeader = styled.th`
  font-family: 'Telegraf';
  color: ${colors.darkBlue};
`

const TableLink = styled(Link)`
  position: relative;
  top: 10px;
  font-family: 'Gatwick';
  font-weight: 600;
  text-decoration: none;
  color: ${colors.darkBlue};
  &:hover {
    color: ${colors.blue};
    text-decoration: none;
  }
`

const TableBody = styled.p`
  padding-top: 10px;
  font-family: 'Gatwick';
  font-weight: 400;
  color: ${colors.darkBlue};
`

export {
    PageHeader,
    TableHeader,
    TableLink,
    TableBody
  }
  