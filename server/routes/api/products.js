const router = require('express').Router();
const { Product, User } = require('../../db/models');

// find All
// /api/products
router.get('/', async (req, res, next) => {
  try {
    // if (!req.user) {
    //   return res.sendStatus(401);
    // }

    let products = await Product.findAll();
    // products = await Product.setQuantities(products);

    res.json(products);
  } catch (error) {
    next(error);
  }
});

// Find all by seller
// /api/products/sellerId
router.get('/:sellerId', async (req, res, next) => {
  try {
    // if (!req.user) {
    //   return res.sendStatus(401);
    // }

    const { sellerId } = req.params;

    const seller = await User.findOne({
      where: {
        id: sellerId,
      },
    });

    // if not existing return 404
    if (!seller) {
      return res.status(404).send('The seller with the given id was not found');
    }

    const products = await Product.findProductsBySeller(sellerId);

    res.json(products);
  } catch (error) {
    next(error);
  }
});

// Create a new product
// /api/products
router.post('/', async (req, res, next) => {
  try {
    // if (!req.user) {
    //   return res.sendStatus(401);
    // }

    // const sellerId = req.user.id;
    const { productName, cost, sellerId } = req.body;

    if (!productName || !cost) {
      return res.status(400).json({ error: 'productName, and cost required' });
    }

    if (productName.length < 3) {
      return res
        .status(400)
        .json({ error: 'productName must be at least 3 characters' });
    }

    if (typeof cost != 'number') {
      return res.status(400).json({ error: 'cost must be a valid number' });
    }

    let product = await Product.create({
      productName,
      cost,
      sellerId,
    });

    product.amountAvailable = 1;
    await product.save();

    res.json(product.dataValues);
  } catch (error) {
    next(error);
  }
});

// Update a product
// /api/products/productId
router.put('/:productId', async (req, res, next) => {
  try {
    // if (!req.user) {
    //   return res.sendStatus(401);
    // }

    let product = await Product.findOne({
      where: {
        id: req.params.productId,
      },
    });

    const { productName, cost } = req.body;

    // if not existing return 404
    if (!product) {
      return res
        .status(404)
        .send('The product with the given id was not found');
    }

    if (!productName || !cost) {
      return res.status(400).json({ error: 'productName, and cost required' });
    }

    if (productName.length < 3) {
      return res
        .status(400)
        .json({ error: 'productName must be at least 3 characters' });
    }

    if (typeof cost != 'number') {
      return res.status(400).json({ error: 'cost must be a valid number' });
    }

    product = await product.update({
      productName: req.body.productName,
      cost: req.body.cost,
    });

    res.send(product);
  } catch (error) {
    next(error);
  }
});

// Delete a product
// /api/products/productId
router.delete('/:productId', async (req, res, next) => {
  try {
    // if (!req.user) {
    //   return res.sendStatus(401);
    // }

    const product = await Product.findOne({
      where: {
        id: req.params.productId,
      },
    });

    // if not existing return 404
    if (!product) {
      return res
        .status(404)
        .send('The product with the given id was not found');
    }

    await Product.destroy({
      where: {
        id: req.params.productId,
      },
    });

    // product.setAmountAvailable();
    Product.setAmountAvailable(product);

    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
