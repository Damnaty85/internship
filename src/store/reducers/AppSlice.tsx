import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IAppContextType {
	data?: {},
    query?: string,
    toggle?: boolean
}

const initialState: IAppContextType = {
    data: {},
    query: "",
    toggle: false
}

export const appReducer = createSlice({
    name: 'AppProps',
    initialState,
    reducers: {
        handleSubmit(state, action: PayloadAction<IAppContextType>) {
            state.data = action.payload;
        },
        handleChange(state, action) {
            state.query = action.payload
        },
        handleChangeTheme(state, action) {
            state.toggle = action.payload
        }
    }
})

export default appReducer.reducer