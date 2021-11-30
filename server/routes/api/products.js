const router = require('express').Router();
const { Product, User } = require('../../db/models');
const { authRole } = require('../../authHelper');
const {
  canUpdateProduct,
  canDeleteProduct,
} = require('../permissions/product');

// find All
// /api/products
router.get('/', async (req, res, next) => {
  try {
    let products = await Product.findAll();

    res.json(products);
  } catch (error) {
    next(error);
  }
});

// Find One by id
// /api/products/productId
router.get('/:productId', setProduct, async (req, res, next) => {
  try {
    const { product } = req;
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// Find all by seller
// /api/products/seller/sellerId
router.get('/seller/:sellerId', async (req, res, next) => {
  try {
    const { sellerId } = req.params;

    const seller = await User.findOne({
      where: {
        id: sellerId,
      },
    });

    if (!seller) {
      return res
        .status(404)
        .json({ error: 'The seller with the given id was not found' });
    }

    const products = await Product.findProductsBySeller(sellerId);

    res.json(products);
  } catch (error) {
    next(error);
  }
});

// Create a new product
// /api/products
router.post('/', authRole('seller'), async (req, res, next) => {
  try {
    const sellerId = req.user.id;
    const { productName, cost } = req.body;

    if (!productName || !cost) {
      return res.status(400).json({ error: 'productName, and cost required' });
    }

    if (productName.length < 3) {
      return res
        .status(400)
        .json({ error: 'productName must be at least 3 characters' });
    }

    let product = await Product.create({
      productName,
      cost,
      sellerId,
    });

    const { count, rows } = await Product.calculateAvailableAmount(product);

    product.update({ amountAvailable: count });
    Product.updateAmountAvailableForAll(rows, count); // to restore after tests

    res.status(201).json({ ...product.dataValues, count, rows });
  } catch (error) {
    next(error);
  }
});

// Update a product
// /api/products/productId
router.put(
  '/:productId',
  setProduct,
  authRole('seller'),
  authUpdateProduct,
  async (req, res, next) => {
    try {
      let product = req.product;

      const { productName, cost } = req.body;

      if (!productName || !cost) {
        return res
          .status(400)
          .json({ error: 'productName, and cost required' });
      }

      if (productName.length < 3) {
        return res
          .status(400)
          .json({ error: 'productName must be at least 3 characters' });
      }

      await product.update({
        productName: req.body.productName,
        cost: req.body.cost,
      });

      res.send(product);
    } catch (error) {
      next(error);
    }
  },
);

// Delete a product
// /api/products/productId
router.delete(
  '/:productId',
  setProduct,
  authRole('seller'),
  authDeleteProduct,
  async (req, res, next) => {
    try {
      const product = req.product;

      await product.destroy();

      const { count, rows } = await Product.calculateAvailableAmount(product);

      product.update({ amountAvailable: count });
      Product.updateAmountAvailableForAll(rows, count);

      res.send(product);
    } catch (error) {
      next(error);
    }
  },
);

async function setProduct(req, res, next) {
  req.product = await Product.findOne({
    where: {
      id: req.params.productId,
    },
  });

  // if not existing return 404
  if (!req.product) {
    return res
      .status(404)
      .json({ error: 'The product with the given id was not found' });
  }

  next();
}

function authUpdateProduct(req, res, next) {
  if (!canUpdateProduct(req.user, req.product)) {
    res.status(403);
    return res.send({ error: 'Not Allowed' });
  }

  next();
}

function authDeleteProduct(req, res, next) {
  if (!canDeleteProduct(req.user, req.product)) {
    res.status(403);
    return res.send({ error: 'Not Allowed' });
  }

  next();
}

module.exports = router;
