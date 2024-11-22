import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CheckOutlined, DeleteOutlined, EditOutlined, StarOutlined } from '@ant-design/icons'
import { Button, Checkbox, Flex, Tooltip } from 'antd'


import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { TTodoType, toggleTodo, deleteTodo, editTodo } from '../../store/slices/todoSlice'
import { addToFavorites } from '../../store/slices/favoritesSlice'



const TodoWrapper = styled.div`
  border: 1px solid rgba(0,0,0, .3);
  border-radius: 5px;
  margin: 3px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 15px;
`

const TodoTitle = styled.h4`
  font-family: Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 300;
  margin: 3px 0;
  cursor: default;
`
const TodoInputTitle = styled.input`
  border: none;
  font-family: Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 300;
  border-bottom: 1px solid #000;
  width: 100%;
  text-align: center;
  margin: 0 15px;
`



type TTodoProps = {
  todo: TTodoType
}




const TodoItem: React.FC<TTodoProps> = ({ todo }) => {

  const [status, setStatus] = useState(todo.completed)
  const [titleValue, setTitleValue] = useState(todo.title)

  const [isEditMode, setIsEditMode] = useState(false)

  const dispatch = useAppDispatch()
  const { todos } = useAppSelector(state => state.asyncTodos)


  useEffect(() => {
    const updateTodo = todos.find(t => t.id === todo.id)
    if (updateTodo) {
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

  const clickFavoritesHandler = () => {
    dispatch(addToFavorites({
      ...todo,
      favorite: true
    }))
  }


  return (
    <TodoWrapper>

      <Flex gap="small">
        <Checkbox
          checked={status}
          onChange={checkboxHandler}
          />
        <Tooltip title="favorites">
          <Button         
            icon={ <StarOutlined /> }
            onClick={clickFavoritesHandler}
            />
        </Tooltip>
      </Flex>

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

      <Flex gap="small">

        {isEditMode ? (
          <Tooltip title="save">
            <Button
              icon={<CheckOutlined />}
              onClick={clickSaveHandler}
            />
          </Tooltip>
        ) : (
          <Tooltip title="edit">
            <Button
              icon={<EditOutlined />}
              onClick={clickEditHandler}
            />
          </Tooltip>
        )}

        <Tooltip title="delete">
          <Button
            icon={<DeleteOutlined />}
            onClick={clickDeleteHandler}
          />
        </Tooltip>

      </Flex>

    </TodoWrapper>
  )
}

export default TodoItem