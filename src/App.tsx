import React from 'react';
import styled from 'styled-components';


import TestForm from './components/TestForm/TestForm';
import AddTodo from './components/AddTodo/AddTodo';
import Categories from './components/Categories/Categories';
import TodoList from './components/TodoList/TodoList';


const AppContainer = styled.div`
  padding: 10px 20px;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
`
const Title = styled.h1`
  font-size: 32px;
  color: coral;
  text-shadow: 1px 1px 3px coral;
`



const App: React.FC = () => {

    console.log('render App')

  return (
    <AppContainer>
      <TestForm />
      <Title>
        Todo List React+RTK+Jest
      </Title>
      <AddTodo />
      <Categories 
      />
      <TodoList 
      />
    </AppContainer>
  );
}

export default App;
