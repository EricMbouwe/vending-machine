import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { makePurchase } from '../user/userSlice';
import { removeFromCart } from './cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const { cartList, total } = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(0);

  const handleBuy = () => {
    const productId = cartList[0].id;
    dispatch(makePurchase({ productId, quantity }));
  };

  const handleChangeQuantity = (e) => {
    const value = parseInt(e.target.value);
    let totalTopay = 0;

    setQuantity(value);

    totalTopay = value * cartList[0]?.cost;
    setAmount(totalTopay);
  };

  const handleRemoveItem = () => {
    dispatch(removeFromCart(cartList[0].id));
    setAmount(0);
    setQuantity(0);
  };

  return (
    <Box>
      <h2>Cart</h2>
      <span>Number of items: {total}</span>
      {total > 0 && (
        <Product>
          <span>{cartList[0].productName} </span>
          <span>{cartList[0].cost} </span>

          <QuantityInput
            value={quantity}
            placeholder="quantity"
            type="number"
            min="0"
            onChange={handleChangeQuantity}
          />

          <Button onClick={handleBuy}>Buy</Button>
          <Button onClick={handleRemoveItem}>Remove</Button>
        </Product>
      )}
      <Box>
        <h3>Total</h3>
        <span>{amount}</span>
      </Box>
    </Box>
  );
}

const Box = styled.div``;
const Product = styled.div`
  margin: 10px 0;
`;
const Button = styled.button`
  cursor: pointer;
  margin-left: 5px;
`;
const QuantityInput = styled.input`
  width: 60px;
`;

export default Cart;
