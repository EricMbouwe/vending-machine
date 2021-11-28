import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
    dispatch(createProductAsync({ productName, cost }));
    setState({
      productName: '',
      cost: 0,
    });
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  return (
    <div>
      <hr />
      <h2>My Store</h2>
      <div>
        <ul>
          {sellerProducts &&
            sellerProducts.map((product) => (
              <li key={product?.id}>
                <div>{product?.productName}</div>
                <div>{product?.cost}</div>
                <button onClick={() => console.log('Open edit form')}>
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteProductAsync(product.id))}
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>

      <hr />

      <div>
        <h2>Create a new product</h2>
        <form onSubmit={handleCreateProduct}>
          <div>
            <div>
              <input
                aria-label="productName"
                name="productName"
                value={productName}
                onChange={handleChange}
                type="text"
                placeholder="productName"
                required
              />
            </div>
          </div>

          <div>
            <div>
              <input
                aria-label="cost"
                type="number"
                min="0"
                placeholder="cost"
                name="cost"
                value={cost}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default SellerStore;
