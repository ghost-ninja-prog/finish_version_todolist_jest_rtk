import { Radio, RadioChangeEvent } from 'antd'
import React from 'react'
import styled from 'styled-components'

const WrapperRadioButton = styled.div`
  margin: 15px auto;
  max-width: 80%;
`



const options = [
  {label: 'All', value: 'all'},
  {label: 'Completed', value: 'completed'},
  {label: 'Active', value: 'active'},
  {label: 'Favorite', value: 'favorite'}
]



const Categories = () => {


    const changeHandler = (e: RadioChangeEvent) => {
        console.log(e.target.value)
    }

  return (
    <WrapperRadioButton>
        <Radio.Group 
          block
          options={options}
          defaultValue={'all'}
          optionType='button'
          buttonStyle='solid'
          onChange={changeHandler}
        />
      </WrapperRadioButton>
  )
}

export default Categories