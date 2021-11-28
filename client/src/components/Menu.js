import React from 'react';
// import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addToCart } from '../features/cart/cartSlice';

function Menu() {
  const { products } = useSelector((state) => state.products);
  const { cartList, total } = useSelector((state) => state.cart);
  const { data: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // const [isDisable, setIsDisable] = useState(false);

  const handleSelect = (product) => {
    // Check if cart contains at least one product
    if (total > 0 && product?.id !== cartList[0].id) {
      alert('You can not add two different product at a time');
      return;
    }

    // if (product.amountAvailable === total) {
    //   setIsDisable(true);
    // }

    // Add to cart or increment qty if already in cart
    dispatch(addToCart(product));
  };

  return (
    <div>
      <h2>Products Menu</h2>
      <div>
        <ul>
          {products &&
            products.map((product) => (
              <li key={product.id}>
                <div>{product.productName}</div>
                <div>{product.cost}</div>
                {user.role === 'buyer' && (
                  <button
                    onClick={() => handleSelect(product)}
                    disabled={product.amountAvailable === total}
                  >
                    Add
                  </button>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Menu;
