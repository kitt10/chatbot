import React from 'react'
//@ts-ignore
import { Text } from 'react-native-web'
import { StyleI, useMainContext } from '../../context/MainContext'

const componentS = (style: StyleI) => {
  return {
    marginTop: '100px',
    marginLeft: '10px',
    marginRight: '10px',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: style.colors.primary,
    color: style.colors.blond,
    width: 'fit-content',
    height: 'fit-content',
    textAlign: 'center',
    lineHeight: '1.7em'
  }
}

const _Temp: React.FunctionComponent = props => {

  const { style } = useMainContext()

  return (
    <Text style={componentS(style)}>
        Mobile version not ready. Use your PC.
    </Text>
  )
}

export default _Temp