// import axios from 'axios'
// import { fetchTodos } from './todoSlice'
//
// jest.mock('axios')
// const mockedAxios = axios as jest.Mocked<typeof axios>;
//
// describe('todoThunk', () => {
//     it('should fetchTodos with resolved response', async () => {
//         const mockTodos = [{
//             id: 1, title: 'test', completed: false, userId: 1
//         }]
//         const resp = {data: mockTodos, status: 200}
//         mockedAxios.get.mockResolvedValue(resp)
//
//         const dispatch = jest.fn()
//         const thunk = fetchTodos(0)
//
//         await thunk(dispatch, () => ({}), {})
//
//         const { calls } = dispatch.mock
//         expect(calls).toHaveLength(2)
//         const [start, end] = calls
//         expect(start[0].type).toBe('todos/fetchTodos/pending')
//         expect(end[0].type).toBe('todos/fetchTodos/fulfilled')
//         expect(end[0].payload).toEqual(mockTodos)
//
//     })
//     it('should fetchTodos with rejected response', async () => {
//
//         const resp = {status: 404}
//         mockedAxios.get.mockResolvedValue(resp)
//
//
//         const dispatch = jest.fn()
//         const thunk = fetchTodos(0)
//
//         await thunk(dispatch, () => ({}), {})
//
//         const { calls } = dispatch.mock
//         expect(calls).toHaveLength(2)
//
//         const [start, end] = calls
//         expect(start[0].type).toBe('todos/fetchTodos/pending')
//         expect(end[0].type).toBe('todos/fetchTodos/rejected')
//         expect(end[0].payload).toBe('Error load data!!!!')
//         expect(end[0].meta.rejectedWithValue).toBe(true)
//     })
// })


import {fetchTodos, createAsyncTodo, deleteAsyncTodo, editAsyncTodo, toggleAsyncTodo} from "./todoSlice";



///////////////////     Test fetchAsyncTodo     ////////////////////

describe('todoThunk fetchTodos resolved', () => {
    let originalFetch: any
    const mockTodos = [
        {id: 1, title: 'test', completed: false, userId: 1}
    ]

    beforeEach(() => {
        originalFetch = global.fetch
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockTodos)
        } as Response))
    })

    afterEach(() => {
        global.fetch = originalFetch
    })



    it('should fetchTodos with resolved response', async () => {
        const dispatch = jest.fn()
        const thunk = fetchTodos(0)

        await thunk(dispatch, () => ({}), {})

        const {calls} = dispatch.mock
        expect(calls).toHaveLength(2)
        const [start, end] = calls
        expect(start[0].type).toBe('todos/fetchTodos/pending')
        expect(end[0].type).toBe('todos/fetchTodos/fulfilled')
        expect(end[0].payload).toEqual(mockTodos)
    })
})

describe('todoThunk fetchTodos rejected', () => {
    let originalFetch: any

    beforeEach(() => {
        originalFetch = global.fetch
        global.fetch = jest.fn(() => Promise.resolve({
            ok: false
        } as Response))
    })

    afterEach(() => {
        global.fetch = originalFetch
    })

    it('should fetchTodos with rejected response', async () => {

        const dispatch = jest.fn()
        const thunk = fetchTodos(0)

        await thunk(dispatch, () => ({}), {})

        const {calls} = dispatch.mock
        expect(calls).toHaveLength(2)
        const [start, end] = calls
        expect(start[0].type).toBe('todos/fetchTodos/pending')
        expect(end[0].type).toBe('todos/fetchTodos/rejected')
        expect(end[0].meta.rejectedWithValue).toBe(true)

    })
})





///////////////////     Test Created AsyncTodo     ////////////////////

const mockCreateTodo = {
    title:"created todo",
    completed: false,
    userId: 2
}

describe('created todo resolved', () => {
    let origFetch = global.fetch
    
    beforeEach(() => {
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({...mockCreateTodo, id: 1})
        } as Response))
    })
    afterEach(() => {
        global.fetch = origFetch
    })
    it('should createAsyncTodo with resolved response', async () => {
        const dispatch = jest.fn()
        const thunk = createAsyncTodo(mockCreateTodo)

        await thunk(dispatch, () => ({}), {})

        const {calls} = dispatch.mock
        expect(calls).toHaveLength(2)
        const [start, end] = calls
        expect(start[0].type).toBe('todos/createAsyncTodo/pending')
        expect(end[0].type).toBe('todos/createAsyncTodo/fulfilled')
        expect(end[0].payload).toEqual({...mockCreateTodo, id: 1})
    })
})

describe('created todo rejected', () => {
    let origFetch = global.fetch

    beforeEach(() => {
        global.fetch = jest.fn(() => Promise.resolve({
            ok: false
        } as Response))
    })

    afterEach(() => {
        global.fetch = origFetch
    })

    it('created todo rejected', async () => {
        const thunk = createAsyncTodo(mockCreateTodo)
        const dispatch = jest.fn()
        await thunk(dispatch, () => {}, {})

        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2)
        expect(calls[0][0].type).toBe('todos/createAsyncTodo/pending')
        expect(calls[1][0].type).toBe('todos/createAsyncTodo/rejected')
        expect(calls[1][0].payload).toBe('Error creation todos')
        expect(calls[1][0].meta.rejectedWithValue).toBe(true)

    })
})




///////////////////     Test remove AsyncTodo     ////////////////////

describe('remove todo resolved', () => {
    let origFetch = global.fetch
    beforeEach(() => {
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true
        } as Response))
    })
    afterEach(() => {
        global.fetch = origFetch
    })

    it('remove todo resolved', async () => {
        const id = 1
        const thunk = deleteAsyncTodo(id)
        const dispatch = jest.fn()
        await thunk(dispatch, () => {}, {})
        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2)
        expect(calls[0][0].type).toBe('todos/deleteTodo/pending')
        expect(calls[1][0].type).toBe('todos/deleteTodo/fulfilled')
        expect(calls[1][0].payload).toBe(id)
    })
})

describe('remove todo rejected', () => {
    let origFetch = global.fetch
    beforeEach(() => {
        global.fetch = jest.fn(() => Promise.resolve({
            ok: false
        } as Response))
    })
    afterEach(() => {
        global.fetch = origFetch
    })

    it('remove todo rejected', async () => {
        const id = 1
        const thunk = deleteAsyncTodo(id)
        const dispatch = jest.fn()
        await thunk(dispatch, () => {}, {})
        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2)
        expect(calls[0][0].type).toBe('todos/deleteTodo/pending')
        expect(calls[1][0].type).toBe('todos/deleteTodo/rejected')
        expect(calls[1][0].payload).toBe('error delete todo')
        expect(calls[1][0].meta.rejectedWithValue).toBe(true)
    })
})




///////////////////     Test toggle AsyncTodo     ////////////////////

const mockToggleTodo = {
    id: 3,
    userId: 1,
    completed: false,
    title: 'test todo'
}

describe('toggle todo resolved', () => {
    let origFetch = global.fetch
    beforeEach(() => {
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                ...mockToggleTodo,
                completed: !mockToggleTodo.completed
            })
        } as Response))
    })

    afterEach(() => {
        global.fetch = origFetch
    })

    it('toggle todo resolved' ,async () => {
        const thunk = toggleAsyncTodo(mockToggleTodo)
        const dispatch = jest.fn()
        await thunk(dispatch, () => {}, {})
        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2)
        expect(calls[0][0].type).toBe('todos/toggleTodo/pending')
        expect(calls[1][0].type).toBe('todos/toggleTodo/fulfilled')
        expect(calls[1][0].payload).toEqual({
            ...mockToggleTodo,
            completed: !mockToggleTodo.completed
        })

    })
})

describe('toggle todo rejected', () => {
    let origFetch = global.fetch
    beforeEach(() => {
        global.fetch = jest.fn(() => Promise.resolve({
            ok: false
        } as Response))
    })
    afterEach(() => {
        global.fetch = origFetch
    })
    it('toggle todo rejected', async () => {
        const dispatch = jest.fn()
        const thunk = toggleAsyncTodo(mockToggleTodo)
        await thunk(dispatch, () => {}, {})
        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2)
        expect(calls[0][0].type).toBe('todos/toggleTodo/pending')
        expect(calls[1][0].type).toBe('todos/toggleTodo/rejected')
        expect(calls[1][0].payload).toBe('Error toggle todo')
        expect(calls[1][0].meta.rejectedWithValue).toBe(true)
    })
})




///////////////////     Test edit AsyncTodo     ////////////////////

const mockEditTodo = {
    id: 4,
    userId: 1,
    completed: true,
    title: 'test edit todo'
}

describe('edit todo resolved', () => {
    let origFetch = global.fetch
    beforeEach(() => {
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                ...mockEditTodo,
            })
        } as Response))
    })

    afterEach(() => {
        global.fetch = origFetch
    })

    it('edit todo resolved' ,async () => {
        const thunk = editAsyncTodo(mockEditTodo)
        const dispatch = jest.fn()
        await thunk(dispatch, () => {}, {})
        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2)
        expect(calls[0][0].type).toBe('todos/editTodo/pending')
        expect(calls[1][0].type).toBe('todos/editTodo/fulfilled')
        expect(calls[1][0].payload).toEqual(mockEditTodo)

    })
})

describe('edit todo rejected', () => {
    let origFetch = global.fetch
    beforeEach(() => {
        global.fetch = jest.fn(() => Promise.resolve({
            ok: false
        } as Response))
    })
    afterEach(() => {
        global.fetch = origFetch
    })
    it('edit todo rejected', async () => {
        const dispatch = jest.fn()
        const thunk = editAsyncTodo(mockToggleTodo)
        await thunk(dispatch, () => {}, {})
        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2)
        expect(calls[0][0].type).toBe('todos/editTodo/pending')
        expect(calls[1][0].type).toBe('todos/editTodo/rejected')
        expect(calls[1][0].payload).toBe('Error edit todo')
        expect(calls[1][0].meta.rejectedWithValue).toBe(true)
    })
})