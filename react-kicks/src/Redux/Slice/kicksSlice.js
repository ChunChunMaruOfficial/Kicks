import { createSlice } from '@reduxjs/toolkit'


export const kicksSlice = createSlice({
    name: 'counter',

    initialState: {
        isloading: true,
        kicksarray: [],
        itemsarray: [],
        sorting: '',
        order: ''
    },


    reducers: {
        setisloading: (state, action) => {
            state.isloading = action.payload
        },
        init: (state, action) => {
            state.kicksarray = action.payload
        },
        add: (state, action) => {
            state.itemsarray.push(action.payload)

            let userobj = JSON.parse(localStorage.getItem('activeuser'))
            let usersarray = JSON.parse(localStorage.getItem('users'))

            let coincidence = usersarray.findIndex(v => v.email === userobj.email);
            usersarray[coincidence].items = state.itemsarray
            userobj.items = state.itemsarray

            localStorage.setItem('users', JSON.stringify(usersarray))
            localStorage.setItem('activeuser', JSON.stringify(userobj))
        },
        del: (state, action) => {
            state.itemsarray.splice(action.payload, 1)
        },
        plus: (state, action) => {
            state.itemsarray[action.payload].count += 1
        },
        minus: (state, action) => {
            state.itemsarray[action.payload].count -= 1
        },
        setsorting: (state, action) => {
            state.sorting = `&orderBy=${action.payload}`
            state.isloading = true
        },
        setorder: (state, action) => {
            state.order = `&order=${action.payload}`
            state.isloading = true
        },
        setsize: (state, action) => {
            // state.itemsarray[action.payload[0]].size.open = action.payload[1]
            // action.payload[2] ? state.itemsarray[action.payload[0]].size.sizenum = action.payload[2] : ''

            let userobj = JSON.parse(localStorage.getItem('activeuser'))
            userobj.items[action.payload[0]].size.open = action.payload[1]
            action.payload[2] ? userobj.items[action.payload[0]].size.sizenum = action.payload[2] : ''
        },
        likemethod: (state, action) => {
            let elementToMove
            action.payload[1] ? state.itemsarray[action.payload[0]].liked = false : (state.itemsarray[action.payload[0]].liked = true,
                elementToMove = state.itemsarray.splice(action.payload[0], 1)[0],
                state.itemsarray.unshift(elementToMove))

        }
    },
})

export const { init, add, del, likemethod, plus, minus, setsize, setsorting, setisloading, setorder } = kicksSlice.actions  //импортируются все методы

export default kicksSlice.reducer