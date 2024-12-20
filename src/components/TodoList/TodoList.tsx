import React, { useEffect } from 'react'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroll-component'


import TodoItem from '../TodoItem/TodoItem'
import Skeleton from '../Skeleton/Skeleton'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { editMessage, fetchTodos } from '../../store/slices/todoSlice'


const TodosContainer = styled.div`
    position: relative;
    padding: 10px 15px;
    border-radius: 0 0 5px 5px;
    background-color: #fff;
`

const TodosTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  margin: 10px 0;
`

const TodosListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, .3);
  border-radius: 5px;
  overflow: auto;
  height: 250px;
  padding: 5px 8px;
  scrollbar-width: thin;
  scrollbar-color: #dad8d8 #fff;
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: coral;
  }
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


const TodoList: React.FC = () => {

  const { message, todos, categories } = useAppSelector(state => state.asyncTodos)
  const { todosFavorite } = useAppSelector(state => state.favorites)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodos(0))
  }, [dispatch])

  useEffect(() => {
    if(message) {
      setTimeout(() => dispatch(editMessage(null)), 5000)
    }
  }, [message, dispatch])


  
  console.log('render TodoList')
  return (
    <TodosContainer>
      {
        message &&  <DisplayMessage> { message } </DisplayMessage>
      }
      <TodosTitle>
        "Todo List"
      </TodosTitle>
      {categories !== 'favorite' ? (

      <TodosListContainer
        id='scrollableDiv'
      >
        <InfiniteScroll
          dataLength={todos.length}
          next={() => {dispatch(fetchTodos(todos.length))}}
          hasMore={todos.length < 200}
          loader={<Skeleton />}
          scrollableTarget='scrollableDiv'
        >
          {
            todos.filter(todo => {
              if(categories === 'all') {
                return todo
              } 
              if (categories === 'completed') {
                return todo.completed === true
              }
              if(categories === 'active') {
                return todo.completed === false
              }
              return todo
            }).map(todo => {
              const idx = todosFavorite.findIndex(t => t.id === todo.id)
              return (idx === -1) ? (<TodoItem key={todo.id} todo={todo} favorite={false} />) : ( <TodoItem key={todo.id} todo={todo} favorite={true} /> )
              
            })
          }
        </InfiniteScroll>
      </TodosListContainer>

      ) : (
          <TodosListContainer>
            {
              todosFavorite.map(todo => (
                <TodoItem key={todo.id} todo={todo} favorite={true} />
              ))
            }
          </TodosListContainer>
      )}         
      
    
    </TodosContainer>
  )
}

export default TodoList