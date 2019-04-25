import React from 'react'
import { Icon, } from 'semantic-ui-react'
import styled from 'styled-components'


const AlertStyle = styled.div`
  margin-top: 10px;
  background-color: #ededed;
  color: #119e40;
  padding: 12px;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  border: 5px solid #119e40;
  opacity: .9;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.03);
  letter-spacing: 1.5px;
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
  min-width: 450px;
  min-height: 75px;
  box-sizing: border-box;
`
const ErrorStyle = styled.div`
  margin-top: 10px;
  background-color: #ededed;
  font-weight: bold;
  border: 5px solid #c90000;
  color: #c90000;
  padding: 12px;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.03);
  letter-spacing: 1.5px;
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
  min-width: 450px;
  min-height: 75px;
  box-sizing: border-box;
  opacity: .8;
`


const RenderOption = ({message, options, style,}) => {
  if (options.type === 'error') {
    return(

    <ErrorStyle>
      <Icon name='exclamation' size='large' />
      <h2 style={{margin: 0}}>{message}</h2>
    </ErrorStyle>
      )
  } else if (options.type === 'success') {
    return(
      <AlertStyle>
      <Icon name='check circle outline' size='large' />
      <h2 style={{margin: 0}}>{message}</h2>
    </AlertStyle>
      )
  }
}
const AlertTemplate = ({ message, options, style,}) => {

  return (
    <>
    <RenderOption message={message} options={options} syle={style}/>
    </>
    // <AlertStyle>
    //   {options.type === 'info' && <Icon name='exclamation'/>}
    //   {options.type === 'success' && <Icon name='pencil'/>}
    //   {options.type === 'error' && <Icon name='exclamation' size='large' />}
    //   <span>{message}</span>
    // </AlertStyle>
  )
}

export default AlertTemplate