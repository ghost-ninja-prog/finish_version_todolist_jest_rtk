import React, { useEffect } from 'react';
import styled from 'styled-components';
import Todos from './components/Todos/Todos';
import { useAppDispatch, useAppSelector } from './components/store/hooks';
import { clearErrorMessage } from './components/store/slices/todoSlice';


const AppContainer = styled.div`
  padding: 10px 20px;
  text-align: center;
`
const Title = styled.h1`
  font-size: 32px;
  color: coral;
  text-shadow: 1px 1px 3px coral;
`

const DisplayMessage = styled.div`
  position: absolute;
  right: 10px;
  bottom: 20px;
  padding: 10px 15px;
  width: auto;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #00009995;
  background-color: #00009958;
`

const App: React.FC = () => {

    const { error } = useAppSelector(state => state.asyncTodos)
    const dispatch = useAppDispatch()

    useEffect(() => {
      if(error) {
        setTimeout(() => dispatch(clearErrorMessage()), 2000)
      }
    }, [error, dispatch])

  return (
    <AppContainer>
      <Title>
        Todo List React+RTK+Jest
      </Title>
      <Todos />
      {error &&  <DisplayMessage>
        { error }
      </DisplayMessage>
      }
    </AppContainer>
  );
}

export default App;
