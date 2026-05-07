    import { createSlice } from "@reduxjs/toolkit";

    const initialState = {
    value: null,
    };

    const QueryReducer = createSlice({
    name: "Query",

    initialState,

    reducers: {
        setQuery: (state, action) => {
        state.value = action.payload;
        },
    },
    });

    export const { setQuery } = QueryReducer.actions;

    export default QueryReducer.reducer;