import React from 'react'
import { Radio, RadioChangeEvent } from 'antd'
import styled from 'styled-components'

import { useAppDispatch } from '../../store/hooks'

import { changeCategories } from '../../store/slices/todoSlice'

const WrapperRadioButton = styled.div`
  padding: 15px 0;
  background-color: #fff;
`


const Categories:React.FC = () => {

  const dispatch = useAppDispatch()


  const changeHandler = (e: RadioChangeEvent) => {
    dispatch(changeCategories(e.target.value))
  }

  return (
    <WrapperRadioButton>

      <Radio.Group
        defaultValue={'all'}
        buttonStyle='solid'
        onChange={changeHandler}
      >
        <Radio.Button value="all">All</Radio.Button>
        <Radio.Button value="completed">Completed</Radio.Button>
        <Radio.Button value="active">Active</Radio.Button>
        <Radio.Button value="favorite">Favorite</Radio.Button>
      </Radio.Group>

    </WrapperRadioButton>
  )
}

export default Categories