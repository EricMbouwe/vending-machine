// import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
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
    <Box>
      <h2>Products Menu</h2>
      <Box>
        <ProductList>
          {products &&
            products.map((product) => (
              <Product key={product.id}>
                <Box>{product.productName}</Box>
                <Box>{product.cost}</Box>
                {user.role === 'buyer' && (
                  <Button
                    onClick={() => handleSelect(product)}
                    disabled={product.amountAvailable === total}
                  >
                    Add
                  </Button>
                )}
              </Product>
            ))}
        </ProductList>
      </Box>
    </Box>
  );
}

const Box = styled.div``;
const ProductList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Product = styled.li`
  list-style-type: none;
  margin: 10px;
`;
const Button = styled.button`
  cursor: pointer;
`;

export default Menu;
