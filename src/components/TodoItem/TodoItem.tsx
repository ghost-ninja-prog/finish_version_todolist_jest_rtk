import React, { memo, ReactHTMLElement, useState } from 'react'
import styled from 'styled-components'
import { CheckOutlined, DeleteOutlined, EditOutlined, StarFilled, StarOutlined, StarTwoTone } from '@ant-design/icons'
import { Button, Checkbox, Flex, Tooltip } from 'antd'


import { useAppDispatch } from '../../store/hooks'
import { TEditTodoType, TTodoType, changeStatus, deleteElem, editMessage, editTodo } from '../../store/slices/todoSlice'
import { addToFavorites, deleteFromFavorites, editInFavorites, changeStatusInFavorites } from '../../store/slices/favoritesSlice'



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

type TodoItemProps = {
  todo: TTodoType,
  favorite: boolean
}



const TodoItem: React.FC<TodoItemProps> = memo( function TodoItem ({ todo, favorite }) {

  const [titleValue, setTitleValue] = useState(todo.title)
  const [isEditMode, setIsEditMode] = useState(false)

  const dispatch = useAppDispatch()


  const checkboxHandler = () => {
    if(favorite) {
      dispatch(changeStatus(todo.id))
      dispatch(changeStatusInFavorites(todo.id))
    } else {
      dispatch(changeStatus(todo.id))
    }
  }


  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value)
  }


  const clickEditHandler = () => {
    setIsEditMode(true)
    setTitleValue(todo.title)
  }


  const clickSaveHandler = () => {
    setIsEditMode(false)
    if(!titleValue.trim()) {
      dispatch(editMessage('Введите текст задачи'))
      return
    }
    const updatedTodo: TEditTodoType = {
      id: todo.id,
      title: titleValue.trim(),
    }
    if(favorite) {
      dispatch(editInFavorites(updatedTodo))
      dispatch(editTodo(updatedTodo))
    } else {
      dispatch(editTodo(updatedTodo))
    }
    setTitleValue(todo.title)
  }

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      clickSaveHandler()
    }
  }


  const clickDeleteHandler = () => {
    if (favorite) {
      dispatch(deleteFromFavorites(todo.id))
      dispatch(deleteElem(todo.id))
    } else {
      dispatch(deleteElem(todo.id))
    }
  }

  const clickFavoritesHandler = () => {
    favorite ? dispatch(deleteFromFavorites(todo.id)) : dispatch(addToFavorites(todo))
  }


  console.log('render TodoItem')
  return (
    <TodoWrapper>

      <Flex gap="small">
        <Checkbox
          checked={todo.completed}
          onChange={checkboxHandler}
          />

        <Tooltip title="favorites">
          {favorite ? (

            <Button         
              icon={ <StarFilled /> }
              onClick={clickFavoritesHandler}
              />
          
          ) : (
        
            <Button         
              icon={ <StarOutlined /> }
              onClick={clickFavoritesHandler}
              />
        
            )
          }
        </Tooltip>

      </Flex>

      {isEditMode ? (
        <TodoInputTitle
          value={titleValue}
          type='text'
          onChange={inputHandler}
          onKeyDown={onPressEnter}
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
})

export default TodoItem