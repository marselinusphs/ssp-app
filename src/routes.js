const {
  addProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  editProductByIdHandler,
  deleteProductByIdHandler,
} = require('./handler');

const routes = [
  // {
  //   method: 'GET',
  //   path: '/',
  //   handler: './home.html'
  // },
  {
    method: 'POST',
    path: '/products',
    handler: addProductHandler,
  },
  {
    method: 'GET',
    path: '/products',
    handler: getAllProductsHandler,
  },
  {
    method: 'GET',
    path: '/products/{id}',
    handler: getProductByIdHandler,
  },
  {
    method: 'PUT',
    path: '/products/{id}',
    handler: editProductByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/products/{id}',
    handler: deleteProductByIdHandler,
  },
];
module.exports = routes;
