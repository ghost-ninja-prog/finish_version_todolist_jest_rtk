import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Checkbox } from 'antd'


import { useAppDispatch, useAppSelector } from '../store/hooks'
import { TTodoType, toggleTodo, deleteTodo, editTodo } from '../store/slices/todoSlice'



const TodoWrapper = styled.div`
  border: 1px solid rgba(0,0,0, .3);
  border-radius: 5px;
  padding: 5px 10px;
  margin: 3px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 15px;
`

const TodoTitle = styled.h4`
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: .1em;
  text-transform: uppercase;
  font-size: 20px;
  margin: 3px 0;
  cursor: default;
`
const TodoInputTitle = styled.input`
  border: none;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 600;
  border-bottom: 1px solid #000;
`

const TodoBtnWrapper = styled.div`
  display: flex;
  column-gap: 15px;
`





type TTodoProps = {
  todo: TTodoType
}

const Todo: React.FC<TTodoProps> = ({ todo }) => {

  const [status, setStatus] = useState(todo.completed)
  const [titleValue, setTitleValue] = useState(todo.title)

  const [isEditMode, setIsEditMode] = useState(false)

  const dispatch = useAppDispatch()
  const { todos } = useAppSelector(state => state.asyncTodos)


  useEffect(() => {
    const updateTodo = todos.find(t => t.id === todo.id)
    if(updateTodo) {
      setStatus(updateTodo.completed)
    }
  }, [todos])



  const checkboxHandler = () => {
    dispatch(toggleTodo(todo))
  }

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value)
  }

  const clickEditHandler = () => {
    setIsEditMode(true)
  }

  const clickSaveHandler = () => {
    setIsEditMode(false)
    const updatedTodo: TTodoType = {
      id: todo.id,
      title: titleValue,
      completed: status,
      userId: todo.userId
    }
    dispatch(editTodo(updatedTodo))
  }

  const clickDeleteHandler = () => {
    dispatch(deleteTodo(todo.id))
  }


  return (
    <TodoWrapper>
      <Checkbox
        checked={status}
        onChange={checkboxHandler}
      />
      {isEditMode ? (
        <TodoInputTitle
          value={titleValue}
          type='text'
          onChange={inputHandler}
        />
      ) : (
          <TodoTitle>
            {todo.title}
          </TodoTitle>
      )}
      <TodoBtnWrapper>

        {isEditMode ? (
          <Button
          icon={<CheckOutlined />}
          onClick={clickSaveHandler}
          />
        ) : (
          <Button
          icon={<EditOutlined/>}
          onClick={clickEditHandler}
          />
        )}
        <Button
          icon={<DeleteOutlined />}
          onClick={clickDeleteHandler}
        />
      </TodoBtnWrapper>
    </TodoWrapper>
  )
}

export default Todo