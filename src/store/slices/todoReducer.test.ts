import {asyncTodoReducer, fetchTodos, toggleAsyncTodo, TTodosStateType} from './todoSlice'





describe("todoSlice tests fetchTodos", () => {
    const initialStateFetchTodo: TTodosStateType = {
        todos: [],
        loading: false,
        startElem: 0,
        error: null,
        message: null,
        categories: 'all',
    }

    it('should change status with "fetchTodos.pending" action', () => {
        const state = asyncTodoReducer(initialStateFetchTodo, fetchTodos.pending('todos/fetchTodos/pending', 0))
        expect(state.loading).toBe(true)
    })
    it('should fetch todos with "fetchTodos.fulfilled" action', () => {
        const mockArr = [{title: 'test', id: 1, userId: 1, completed: false}]
        const state = asyncTodoReducer(initialStateFetchTodo, fetchTodos.fulfilled(mockArr, 'todos/fetchTodos/fulfilled', 0))
        expect(state).toEqual({
            todos: mockArr,
            loading: false,
            startElem: 5,
            error: null,
            message: null,
            categories: 'all',
        })
    })
    it('should change status and error with "fetchTodos.rejected"', () => {
        const err = new Error('Error fetch todos')
        const state = asyncTodoReducer(initialStateFetchTodo, fetchTodos.rejected(new Error('rejected'), 'todos/fetchTodos/rejected', 0, 'Error fetch todos'))
        expect(state).toEqual({
            todos: [{id: 1, title: 'error', completed: false, userId: 1}],
            loading: false,
            startElem: 0,
            error: null,
            message: 'Error fetch todos',
            categories: 'all',
        })
    })
})

describe("todoSlice tests toggleTodo ", () => {

    const mockTodo = {title: 'test Toggle Todo ', id: 1, userId: 1, completed: false}

    const initialStateToggleTodo: TTodosStateType = {
        todos: [mockTodo],
        loading: false,
        startElem: 0,
        error: null,
        message: null,
        categories: 'all',
    }

    it('should change status todo "toggleAsyncTodo.fulfilled"', () => {
        const state = asyncTodoReducer(initialStateToggleTodo, toggleAsyncTodo.fulfilled({...mockTodo, completed: !mockTodo.completed}, 'todos/toggleTodo/fulfilled', mockTodo))
        expect(state.todos[0].completed).toBe(!mockTodo.completed)
    })

    it('should change message', () => {
        const state = asyncTodoReducer(initialStateToggleTodo, toggleAsyncTodo.rejected(new Error('rejected'), 'todos/toggleTodo/rejected', mockTodo, 'Error toggle todo'))
        console.log(state)
        expect(state.message).toBe('Error toggle todo')
    })
})