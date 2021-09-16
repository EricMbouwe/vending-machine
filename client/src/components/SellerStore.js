import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  createProductAsync,
  deleteProductAsync,
} from '../features/product/productSlice';

function SellerStore() {
  const { sellerProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    productName: '',
    cost: 0,
  });

  const { productName, cost } = state;

  const handleCreateProduct = async (event) => {
    event.preventDefault();
    console.log(productName);
    console.log(cost);
    dispatch(createProductAsync({ productName, cost }));
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  return (
    <Box>
      <hr />
      <h2>My Store</h2>
      <Box>
        <ProductList>
          {sellerProducts.map((product) => (
            <Product key={product?.id}>
              <Box>{product?.productName}</Box>
              <Box>{product?.cost}</Box>
              <Button onClick={() => console.log('Open edit form')}>
                Edit
              </Button>
              <Button onClick={() => dispatch(deleteProductAsync(product.id))}>
                Delete
              </Button>
            </Product>
          ))}
        </ProductList>
      </Box>

      <hr />

      <Box>
        <h2>Create a new product</h2>
        <form onSubmit={handleCreateProduct}>
          <Grid>
            <FormControl>
              <TextField
                aria-label="productName"
                name="productName"
                value={productName}
                onChange={handleChange}
                type="text"
                placeholder="productName"
                required
              />
            </FormControl>
          </Grid>

          <Grid>
            <FormControl>
              <TextField
                aria-label="cost"
                type="number"
                min="0"
                placeholder="cost"
                name="cost"
                value={cost}
                onChange={handleChange}
                required
              />
            </FormControl>
          </Grid>
          <Button type="submit">New Product</Button>
        </form>
      </Box>
    </Box>
  );
}

const Box = styled.div``;
const Grid = styled.div`
  margin: 0.5rem 0;
`;
const FormControl = styled.div``;
const TextField = styled.input``;
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

export default SellerStore;
