
import { Button } from 'antd'
import React, { memo } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../../store/hooks'
import { removeCard } from '../../store/slices/testSlice'

const Text = styled.p`
    height: 20px;
    width: 100%;
    background-color: #fff;
    color: #000;
    font-family: 'Courier New', Courier, monospace;
    font-size: 18px;
    `

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 10px;
    width: 100%;
    background-color: #fff;
    height: 60px;
    padding: 5px 10px;
`

type Props = {
    text: string,
    desc: string,
    id: number
}

const TestFormDisplay: React.FC<Props> = memo( function TestFormDisplay ({ text, desc, id }) {

    const dispatch = useAppDispatch()

    const buttonHandler = () => {
        dispatch(removeCard(id))
    }

    console.log('render testFormDisplay')
  
    return (
    <Wrapper>
        <div>
            <Text>{ text }</Text>
            <Text>{ desc }</Text>
        </div>
        <Button
            type='primary'
            onClick={buttonHandler}
        >
            DEL
        </Button>
    </Wrapper>
  )
})

export default TestFormDisplay