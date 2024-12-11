import {
    asyncTodoReducer,
    createAsyncTodo,
    deleteAsyncTodo, editAsyncTodo,
    fetchTodos,
    toggleAsyncTodo,
    TTodosStateType
} from './todoSlice'





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

    it('should change message with "toggleAsyncTodo.rejected"', () => {
        const state = asyncTodoReducer(initialStateToggleTodo, toggleAsyncTodo.rejected(new Error('rejected'), 'todos/toggleTodo/rejected', mockTodo, 'Error toggle todo'))
        expect(state.message).toBe('Error toggle todo')
    })
})

describe('todoSlice test createAsyncTodo', () => {
    const initialStateCreateTodo: TTodosStateType = {
        todos: [],
        loading: false,
        startElem: 0,
        error: null,
        message: null,
        categories: 'all',
    }

    const mockTodo = {
        title: 'test create todo',
        userId: 1,
        completed: false,
    }
    it('should increment todos arr', () => {
        const state = asyncTodoReducer(initialStateCreateTodo, createAsyncTodo.fulfilled({...mockTodo, id: 201}, 'todos/createAsyncTodo/fulfilled', mockTodo))
        expect(state.todos).toHaveLength(1)
    })
    it('should change message with "createAsyncTodo.rejected" ', () => {
        const state = asyncTodoReducer(initialStateCreateTodo, createAsyncTodo.rejected(new Error('rejected'), 'todos/createAsyncTodo/rejected', mockTodo, 'Error creation todos'))
        expect(state.message).toBe('Error creation todos')
    })
})

describe('todoSlice test deleteAsyncTodo', () => {
    const mockTodo = {title: 'test Delete Todo ', id: 1, userId: 1, completed: false}

    const initialStateDeleteTodo: TTodosStateType = {
        todos: [mockTodo],
        loading: false,
        startElem: 0,
        error: null,
        message: null,
        categories: 'all',
    }
    it('should decrement arr todos', () => {
        const state = asyncTodoReducer(initialStateDeleteTodo, deleteAsyncTodo.fulfilled(mockTodo.id, 'todos/deleteTodo/fulfilled', mockTodo.id))
        expect(state.todos).toHaveLength(0)
    })
    it('should change message with "deleteAsyncTodo.rejected"', () => {
        const state = asyncTodoReducer(initialStateDeleteTodo, deleteAsyncTodo.rejected(new Error('rejected'), 'todos/deleteTodo/rejected', mockTodo.id, 'Error delete todo'))
        expect(state.message).toBe('Error delete todo')
    })
})

describe('todoSlice test editAsyncTodo', () => {
    const mockTodo = {title: 'test Edit Todo ', id: 1, userId: 1, completed: false}

    const initialStateEditTodo: TTodosStateType = {
        todos: [mockTodo],
        loading: false,
        startElem: 0,
        error: null,
        message: null,
        categories: 'all',
    }
    it('should edit todo from arr todos', () => {
        const state = asyncTodoReducer(initialStateEditTodo, editAsyncTodo.fulfilled({...mockTodo, title: 'new title Edit todo'}, 'todos/editTodo/fulfilled', mockTodo))
        expect(state.todos[0]).toEqual({...mockTodo, title: 'new title Edit todo'})
    })
    it('should change message with "deleteAsyncTodo.rejected"', () => {
        const state = asyncTodoReducer(initialStateEditTodo, editAsyncTodo.rejected(new Error('rejected'), 'todos/editTodo/rejected', mockTodo, 'Error edit todo'))
        expect(state.message).toBe('Error edit todo')
    })
})