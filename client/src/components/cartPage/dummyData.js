export const resEx = {
  data: {
    totalPrice: 25090,
    mealboxes: [
      {
        mealboxId: 1, // 같으면 구성품 같음
        cartMealboxId: 1, // 장바구니에 담긴 갯수
        name: '맛있는 밀박스',
        mealboxInfo: 'NO_REC_MEALBOX',
        quantity: 3,
        weight: 300,
        kcal: 400,
        price: 9000,
        products: [
          {
            productName: '사과',
            productQuantity: 1,
          },
          {
            productName: '사과',
            productQuantity: 2,
          },
          {
            productName: '사과',
            productQuantity: 2,
          },
        ],
      },
      {
        mealboxId: 2,
        cartMealboxId: 2,
        name: '!! 밀박스',
        mealboxInfo: 'NO_REC_MEALBOX',
        quantity: 1,
        weight: 300,
        kcal: 500,
        price: 11000,
        products: [
          {
            productName: '딸기',
            productQuantity: 1,
          },
          {
            productName: '딸기',
            productQuantity: 2,
          },
          {
            productName: '딸기',
            productQuantity: 2,
          },
        ],
      },
    ],
  },
};
