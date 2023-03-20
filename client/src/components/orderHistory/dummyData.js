export const data = [
  {
    username: '맹쥬',
    orderNumber: '20230320193217123456',
    createdAt: '2023-03-20T19:32:17.008', // localdate time
    deliveryDate: null,
    orderStatus: '주문완료', //주문 완료, 주문 취소, 배송중, 배송완료, 환불대기중, 환불완료
    mealboxes: [
      {
        mealboxName: '20일 밀박스이름입니다',
        mealboxPrice: 19000,
        mealboxQuantity: 1,
        mealboxKcal: 320,
        product: [
          {
            productName: '구성품이름입니다',
            productQuantity: 2,
          },
        ],
      },
      {
        mealboxName: '밀박스이름입니다2',
        mealboxPrice: 17000,
        mealboxQuantity: 2,
        mealboxKcal: 320,
        product: [
          {
            productName: '구성품이름입니다2',
            productQuantity: 1,
          },
        ],
      },
    ],
  },
  {
    username: '맹쥬',
    orderNumber: '20230318143217123456',
    createdAt: '2023-03-18T14:32:17.008', // localdate time
    deliveryDate: '2023-03-19',
    orderStatus: '배송완료', //주문 완료, 주문 취소, 배송중, 배송완료, 환불대기중, 환불완료
    mealboxes: [
      {
        mealboxName: '18일 두번째 밀박스이름입니다',
        mealboxPrice: 11000,
        mealboxQuantity: 1,
        mealboxKcal: 490,
        product: [
          {
            productName: '18일구성품이름입니다',
            productQuantity: 1,
          },
        ],
      },
    ],
  },
  {
    username: '맹쥬',
    orderNumber: '20230318113217123456',
    createdAt: '2023-03-18T11:32:17.008', // localdate time
    deliveryDate: '2023-03-19',
    orderStatus: '배송완료', //주문 완료, 주문 취소, 배송중, 배송완료, 환불대기중, 환불완료
    mealboxes: [
      {
        mealboxName: '18일 첫추문 밀박스이름입니다',
        mealboxPrice: 11000,
        mealboxQuantity: 1,
        mealboxKcal: 490,
        product: [
          {
            productName: '18일구성품이름입니다',
            productQuantity: 1,
          },
        ],
      },
    ],
  },
  {
    username: '맹쥬',
    orderNumber: '20230311193217123456',
    createdAt: '2023-03-11T19:32:17.008', // localdate time
    deliveryDate: '2023-03-12',
    orderStatus: '배송완료', //주문 완료, 주문 취소, 배송중, 배송완료, 환불대기중, 환불완료
    mealboxes: [
      {
        mealboxName: '11일밀박스이름입니다',
        mealboxPrice: 11000,
        mealboxQuantity: 1,
        mealboxKcal: 490,
        product: [
          {
            productName: '11일구성품이름입니다',
            productQuantity: 1,
          },
        ],
      },
    ],
  },
];
