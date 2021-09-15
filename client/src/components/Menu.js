import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addToCart } from '../features/cart/cartSlice';

function Menu() {
  const { products } = useSelector((state) => state.products);
  const { cartList, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleSelect = (product) => {
    // Check if cart contains at least one product
    if (total > 0) {
      alert('You can not add two different product at a time');
      return;
    }
    console.log('SELECTED PRD', product);
    // Check if product already in cart

    dispatch(addToCart(product));
  };

  console.log('CARTLIST', cartList);

  return (
    <Box>
      <h2>Menu</h2>
      <Box>
        <ProductList>
          {products.map((product) => (
            <Product key={product.id}>
              <Box>{product.productName}</Box>
              <Box>{product.cost}</Box>
              <Button onClick={() => handleSelect(product)}>Add</Button>
            </Product>
          ))}
        </ProductList>
      </Box>
    </Box>
  );
}

const Box = styled.div``;
const ProductList = styled.ul``;
const Product = styled.li`
  list-style-type: none;
`;
const Button = styled.button`
  cursor: pointer;
`;

export default Menu;
