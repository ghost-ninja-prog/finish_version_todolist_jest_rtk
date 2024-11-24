import React, { memo } from 'react'
import styled from 'styled-components'


import TodoItem from '../TodoItem/TodoItem'
import Skeleton from '../Skeleton/Skeleton'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { TCategoriesType} from '../../store/slices/todoSlice'


const TodosContainer = styled.div`
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


const TodoList: React.FC = memo( function TodoList() {


  const { data } = useAppSelector(state => state.asyncTodos)

  
  console.log('render TodoList')
  return (
    <TodosContainer>
      <TodosTitle>
        Todo List
      </TodosTitle>
      <TodosListContainer>
        {
          data.map(todo => (
            <TodoItem key={todo.id} title={todo.title} completed={todo.completed} id={todo.id} userId={todo.userId} />
          ))
        }

         
      </TodosListContainer>
    </TodosContainer>
  )
})

export default TodoList