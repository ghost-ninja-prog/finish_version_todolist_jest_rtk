import React, { memo, useState } from 'react'
import styled from 'styled-components'
import { CheckOutlined, DeleteOutlined, EditOutlined, StarOutlined } from '@ant-design/icons'
import { Button, Checkbox, Flex, Tooltip } from 'antd'


import { useAppDispatch } from '../../store/hooks'
import { TEditTodoType, TTodoType, changeStatus, deleteElem, editMessage, editTodo } from '../../store/slices/todoSlice'
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




const TodoItem: React.FC<TTodoType> = memo( function TodoItem ({ title, id, completed, userId }) {

  const [titleValue, setTitleValue] = useState(title)
  const [isEditMode, setIsEditMode] = useState(false)

  const dispatch = useAppDispatch()


  const checkboxHandler = () => {    
    dispatch(changeStatus(id))
  }


  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value)
  }


  const clickEditHandler = () => {
    setIsEditMode(true)
    setTitleValue(title)
  }


  const clickSaveHandler = () => {
    setIsEditMode(false)
    if(!titleValue.trim()) {
      dispatch(editMessage('Введите текст задачи'))
      return
    }
    const updatedTodo: TEditTodoType = {
      id: id,
      title: titleValue.trim(),
    }
    dispatch(editTodo(updatedTodo))
    setTitleValue(title)
  }


  const clickDeleteHandler = () => {
    dispatch(deleteElem(id))
  }

  const clickFavoritesHandler = () => {
    dispatch(addToFavorites({
      id,
      userId,
      title,
      completed,
      favorite: true
    }))
  }


  console.log('render TodoItem')
  return (
    <TodoWrapper>

      <Flex gap="small">
        <Checkbox
          checked={completed}
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
          {title}
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