import { createSlice } from '@reduxjs/toolkit';
import { loremIpsum } from "lorem-ipsum";
import { v4 as uuid } from 'uuid';


const initialState = [
  {
    "id": 1,
    "type": "foo",
    "count": 5,
    "selected": false
  },
  {
    "id": 2,
    "type": "foo",
    "count": 27,
    "selected": false
  },
  {
    "id": 3,
    "type": "bar",
    "count": 49,
    "name": "test",
    "selected": false
  }
]

export const listSlice = createSlice({
  name: 'list',
  initialState,

  reducers: {
    moveDown: (state) => {
      function isSelected(element, index, array) {
        if (element.selected) return element
      }
      
      const index = state.findIndex(isSelected)

      function swap(arr, a, b) {
        if (a === arr.length - 1) return
        arr[a] = arr.splice(b, 1, arr[a])[0];
      }

      swap(state, index, index + 1)
    },

    moveUp: (state) => {
      function isSelected(element, index, array) {
        if (element.selected) return element
      }
      
      const index = state.findIndex(isSelected)

      function swap(arr, a, b) {
        if (a === 0) return
        arr[a] = arr.splice(b, 1, arr[a])[0];
      }

      swap(state, index, index - 1)
    },

    addObj: (state) => {
      const obj = {
        "id": uuid(),
        "type": Math.random() < 0.5 ? "foo" : "bar",
        "count": Math.floor(Math.random() * 50) + 1,
        "selected": false
      }
      if (obj.type === "bar") {
        obj.name = loremIpsum({ sentenceUpperBound: 5})
      }
      state.push(obj)
    },

    selectListItem: (state, action) => {
      state.map((item) => {
        item.selected = false
        if (item.id === action.payload) item.selected = true
      })
    },

    deSelect: (state) => {
      state.map((item) => item.selected = false)
    },

    cleanList: () => {
      return []
    },
    
    changeValue: (state, action) => {
      state.map((item) => {
        if (item.selected) {
          item.count = action.payload
        }
      })
    },

    changeName: (state, action) => {
      state.map((item) => {
        if (item.selected && item.type === "bar") {
          item.name = action.payload
        }
      })
    },
  },
  

});

export const { moveDown, moveUp, changeValue, changeName, addObj, selectListItem, deSelect, cleanList } = listSlice.actions;


export const selectList = (state) => state.list;
export const selectedItem = (state) => state.list.find((item) => item.selected);



export default listSlice.reducer;
