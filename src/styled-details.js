import styled from 'styled-components'

const DetailsHeader = styled.h1`
   font-family: 'Gatwick';
   font-weight: 700;
   font-size: 16px;
   margin: 0;
`

const Name = styled.h2`
   margin-top: 50px;
   font-family: 'Hatton Bold';
   font-weight: 700;
   font-size: 36px;
`

const DetailsLabel = styled.p`
   font-family: 'Telegraf';
   font-size: 18px;
   display: inline-block;
`

const DetailsBody = styled.p`
   font-family: 'Gatwick';
   display: inline-block;
   padding: 5px 0 0 10px;
   font-size: 24px;
   font-weight: 700;
`

const ButtonContainer = styled.div`
   display: inline-block;
   & * {
       display: inline-block;
   }
`

const Permissions = styled.div`
   margin-top: 50px;
   margin-bottom: 50px;
`

export {
    DetailsHeader,
    Name,
    DetailsLabel,
    DetailsBody,
    ButtonContainer,
    Permissions
}
  