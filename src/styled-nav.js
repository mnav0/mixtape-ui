import styled from 'styled-components'
import { Link } from "react-router-dom";
import { colors } from './colors.js'

const HomeLink = styled(Link)`
  margin-top: 20px;
  height: 100px;
  font-family: 'Telegraf';
  text-decoration: none;
  color: ${colors.darkBlue};
  font-size: 16px;
  font-weight: 600;
  position: relative;
`

const LinkContainer = styled.div`
  margin: 25px 0 20px 0;
  font-family: 'Telegraf';
  & > a {
    text-decoration: none;
    color: ${colors.darkBlue};
    font-size: 16px;
    font-weight: 400;
    margin-right: 25px;
    &:hover {
      color: ${colors.blue};
    }
  }
`


export {
    LinkContainer
}
  