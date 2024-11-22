import React, { useEffect } from 'react'
import styled from 'styled-components'

import { generationId } from '../../features/generationId'

import TodoItem from '../TodoItem/TodoItem'
import Skeleton from '../Skeleton/Skeleton'
import Categories from '../Categories/Categories'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchTodos } from '../../store/slices/todoSlice'


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




const TodoList: React.FC = () => {

  const { todos, loading } = useAppSelector(state => state.asyncTodos)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  return (
    <TodosContainer>
      <TodosTitle>
        Todo List
      </TodosTitle>
      <Categories />
      <TodosListContainer>
        {loading ? (
          <>
            <p>Loading...</p>
            <TodoSkeletonContainer>
              <Skeleton />
            </TodoSkeletonContainer>
            <TodoSkeletonContainer>
              <Skeleton />
            </TodoSkeletonContainer>
            <TodoSkeletonContainer>
              <Skeleton />
            </TodoSkeletonContainer>
          </>

          ) : todos.length>0 ? (
            
            todos.map(todo => (
              <TodoItem todo={ todo } key={generationId()}  />
            ))

          ) : (
            <p>Todos netu!!</p>
          )
        }
      </TodosListContainer>
    </TodosContainer>
  )
}

export default TodoList