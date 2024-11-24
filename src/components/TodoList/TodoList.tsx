import React, { memo, useEffect } from 'react'
import styled from 'styled-components'


import TodoItem from '../TodoItem/TodoItem'
import Skeleton from '../Skeleton/Skeleton'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { editMessage } from '../../store/slices/todoSlice'


const TodosContainer = styled.div`
    position: relative;
    padding: 10px 15px;
    border-radius: 0 0 5px 5px;
    background-color: #fff;
`

const TodosTitle = styled.h2`
  font-size: 28px;
  margin: 10px 0;
`

const TodosListContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, .3);
  border-radius: 5px;
  overflow-y: scroll;
  height: 350px;
  padding: 5px 8px;
  scrollbar-width: thin;
  scrollbar-color: #dad8d8 #fff;
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: coral;
  }
`

const TodoSkeletonContainer = styled.div`
  border: 1px solid rgba(0,0,0, .3);
  border-radius: 5px;
  padding: 7px 15px;
  margin: 3px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DisplayMessage = styled.span`
  position: absolute;
  z-index: 2000;
  right: 10px;
  top: 20px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 18px;
  color: #fff;
  padding: 10px 20px;
  width: auto;
  border-radius: 8px;
  border: 1px solid #00009995;
  background-color: rgba(22, 119, 255, .86);
  box-shadow: 0px 0px 16px 3px rgb(40 221 233 / 94%);
`


const TodoList: React.FC = memo( function TodoList() {

  const { message, todos } = useAppSelector(state => state.asyncTodos)
    const dispatch = useAppDispatch()

  useEffect(() => {
    if(message) {
      setTimeout(() => dispatch(editMessage(null)), 2000)
    }
  }, [message])



  
  console.log('render TodoList')
  return (
    <TodosContainer>
      {
        message &&  <DisplayMessage> { message } </DisplayMessage>
      }
      <TodosTitle>
        Todo List
      </TodosTitle>
      <TodosListContainer>
        {
          todos.map(todo => (
            <TodoItem key={todo.id} title={todo.title} completed={todo.completed} id={todo.id} userId={todo.userId} />
          ))
        }

         
      </TodosListContainer>
    </TodosContainer>
  )
})

export default TodoList