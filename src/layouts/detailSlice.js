
import { createSlice } from '@reduxjs/toolkit';

export const detailSlice = createSlice({
    name: 'detail',
    initialState: {
      data: {}
    },
    reducers: {
      addCharacter: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
      clearCharacter: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
      
    }
    
});

//exporto las ACCIONES.....

//Modo ESCRITURA
export const { addCharacter, clearCharacter } = detailSlice.actions;


//Modo LECTURA
export const detailData = (state) => state.detail;

export default detailSlice.reducer;