function canViewProduct(user, product) {
  return product.sellerId === user.id;
}

function canUpdateProduct(user, product) {
  return product.sellerId === user.id;
}

function canDeleteProduct(user, product) {
  return product.sellerId === user.id;
}

module.exports = {
  canViewProduct,
  canUpdateProduct,
  canDeleteProduct,
};
