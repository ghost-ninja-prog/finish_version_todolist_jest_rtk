import React from 'react';
// import { unmountComponentAtNode } from 'react-dom'
import { render, screen } from '@testing-library/react';
import {act} from '@testing-library/react'

import App from './App';
import {Provider} from "react-redux";
import {store} from "./store/store";



jest.mock("./components/TodoList/TodoList", () => {
    return function TodoList() {
        console.log('render mockTodoList')
        return (
            <div data-testid="map">
                <p>TodoList</p>
            </div>
        );
    };
});

// let container = null;

// beforeEach(() => {
//     // подготавливаем DOM-элемент, куда будем рендерить
//     container = document.createElement("div");
//     document.body.appendChild(container);
// });
//
// afterEach(() => {
//     // подчищаем после завершения
//     unmountComponentAtNode(container);
//     container.remove();
//     container = null;
// });

test("should render title App", () => {
    act(() => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
    )
    const titleElement = screen.getByText("Todo List React+RTK+Jest")
    expect(titleElement).toBeInTheDocument()
})