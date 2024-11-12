import React, { useEffect } from 'react'
import styled from 'styled-components'
import Todo from '../Todo/Todo'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchTodos } from '../store/slices/todoSlice'

const TodosContainer = styled.div`
    padding: 10px 15px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 5px;
`

const TodosTitle = styled.h2`
  font-size: 28px;
  margin: 10px 0;
`

const TodosListContainer = styled.div`
  border: 1px solid #000;
  overflow-y: scroll;
  max-height: 350px;
  padding: 5px 8px;
`





const Todos: React.FC = () => {

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
      <TodosListContainer>
        {loading ? (

          <p>Loading...</p>

          ) : todos.length>0 ? (
            
            todos.map(todo => (
              <Todo todo={ todo } key={todo.id}  />
            ))

          ) : (
            <p>Todos netu!!</p>
          )
        }
      </TodosListContainer>
    </TodosContainer>
  )
}

export default Todos