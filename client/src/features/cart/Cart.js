import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { makePurchase } from '../user/userSlice';
import { removeFromCart, deleteFromCart } from './cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const { cartList, total, amount } = useSelector((state) => state.cart);

  const { returnedMoney, totalSpent, productsPurchasedList } = useSelector(
    (state) => state.user,
  );

  const formatChange = (denominationsHash) => {
    return Object.entries(denominationsHash).map(([key, value]) => (
      <div key={key}>
        <span>
          <b>{key} </b>:
        </span>
        <span> {value}</span>
      </div>
    ));
  };

  const handleBuy = () => {
    const productId = cartList[0].id;
    dispatch(makePurchase({ productId, quantity: total }));
  };

  // const handleChangeQuantity = (e) => {
  //   const value = parseInt(e.target.value);
  //   let totalTopay = 0;

  //   setQuantity(value);

  //   totalTopay = value * cartList[0]?.cost;
  //   setAmount(totalTopay);
  // };

  const handleRemoveItem = () => {
    dispatch(removeFromCart());
  };

  return (
    <div>
      <h2>
        Cart <span>[{total}]</span>
      </h2>

      <ul>
        {total > 0 && (
          <li>
            <span>{cartList[0].productName} </span>
            <span>{cartList[0].cost} </span>

            {/* <QuantityInput
            value={quantity}
            placeholder="quantity"
            type="number"
            min="0"
            onChange={handleChangeQuantity}
          /> */}

            <button onClick={handleRemoveItem}>Remove One</button>
            <button onClick={() => dispatch(deleteFromCart())}>Delete</button>
          </li>
        )}
      </ul>

      <div>
        <button onClick={handleBuy} disabled={total < 1}>
          Buy
        </button>
      </div>

      <div>
        <h3>Total</h3>
        <span>${amount}</span>

        <div>
          <div>
            <h4>Change returned</h4>
            {returnedMoney && formatChange(returnedMoney)}
          </div>

          <div>
            <h4>Product list</h4>
            <ul>
              {productsPurchasedList &&
                productsPurchasedList.map((product) => (
                  <li key={product.id}>{product.productName}</li>
                ))}
            </ul>
          </div>

          <div>
            <h4>Total spent</h4>
            <span>${totalSpent}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
