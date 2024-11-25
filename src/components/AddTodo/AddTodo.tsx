import React, { useState } from 'react'

import { SaveOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'

import styled from 'styled-components'

import { useAppDispatch } from '../../store/hooks'

import { createAsyncTodo } from '../../store/slices/todoSlice'
// import { generationId } from '../../features/generationId'


const InputWrapper = styled.div`
    display: flex;
    column-gap: 8px;
    padding: 8px 15px;
    `
const AddTodoContainer = styled.div`
    border-radius: 5px 5px 0 0 ;
    background-color: #fff;
    padding: 10px 20px;
`
const AddTodoTitle = styled.h3`
    font-family: 'Courier New', Courier, monospace;
    font-size: 22px;
    font-weight: 600;
`


const AddTodo = () => {

    const [inputValue, setInputValue] = useState('')
    const dispatch = useAppDispatch()


    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }


    const clickButtonHandler = () => {
        if(!inputValue.trim()) {
            setInputValue('')
            return
        }

        const newTodo = {
            title: inputValue.trim(),
            userId: 1,
            completed: false,
        }

        dispatch(createAsyncTodo(newTodo))
        setInputValue('')
    }



    return (
        <AddTodoContainer>
            <AddTodoTitle>
                Enter todo
            </AddTodoTitle>
            <InputWrapper>
                <Input
                    value={inputValue}
                    onChange={inputChangeHandler}
                    onPressEnter={clickButtonHandler}
                    />
                <Button
                    icon={<SaveOutlined />}
                    onClick={clickButtonHandler}
                    />
            </InputWrapper>
        </AddTodoContainer>
    )
}

export default AddTodo