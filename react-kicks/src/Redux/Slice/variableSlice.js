import { createSlice } from '@reduxjs/toolkit'


export const variableSlice = createSlice({
    name: 'counter',

    initialState: {

    },


    reducers: {
        setisloading: (state, action) => {
            
        }
    },
})

export const { setisloading } = variableSlice.actions 

export default variableSlice.reducer