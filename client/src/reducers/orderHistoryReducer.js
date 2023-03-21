import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: [] };
//[{date: , orders: }, ...]
const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {
    setHistory: (state, action) => {
      let filterByDateObj = action.payload.reduce((acc, cur) => {
        let orderDate = cur.createdAt.slice(0, 10);
        acc[orderDate] ? acc[orderDate].push(cur) : (acc[orderDate] = [cur]);
        return acc;
      }, {});

      let filterByDateArr = [];
      for (let date in filterByDateObj) {
        filterByDateArr.push({ date, orders: filterByDateObj[date] });
      }

      state.data = filterByDateArr;
    },
  },
});

export const { setHistory } = orderHistorySlice.actions;
export default orderHistorySlice.reducer;
