import React from 'react';
import styled from 'styled-components';


import AddTodo from './components/AddTodo/AddTodo';
import Categories from './components/Categories/Categories';
import TodoList from './components/TodoList/TodoList';


const AppContainer = styled.div`
  padding: 10px 20px;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 5px 5px 0 0;
`
const Title = styled.h1`
  font-family: 'Courier New', Courier, monospace;
  font-weight: 600;
  font-size: 32px;
  color: #0404b7;
  text-shadow: 5px -7px 3px rgba(38, 114, 179,  72%);
`



const App: React.FC = () => {

    console.log('render App')

  return (
    <AppContainer>
      <Title>
        Todo List React+RTK+Jest
      </Title>
      <AddTodo />
      <Categories />
      <TodoList />
    </AppContainer>
  );
}

export default App;
