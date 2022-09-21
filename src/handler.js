const { nanoid } = require('nanoid');
const products = require('./products');
// const http = require('http');

// const getHome = (request, h) => ({
//   status: 'success',
//   h.end("")
// });

const addProductHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newProduct = {
    title, tags, body, id, createdAt, updatedAt,
  };
  products.push(newProduct);
  const isSuccess = products.filter((product) => product.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        productId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllProductsHandler = () => ({
  status: 'success',
  data: {
    products,
  },
});

const getProductByIdHandler = (request, h) => {
  const { id } = request.params;
  const product = products.filter((n) => n.id === id)[0];
  if (product !== undefined) {
    return {
      status: 'success',
      data: {
        product,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editProductByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = products.findIndex((product) => product.id === id);
  if (index !== -1) {
    products[index] = {
      ...products[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteProductByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = products.findIndex((product) => product.id === id);

  if (index !== -1) {
    products.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  editProductByIdHandler,
  deleteProductByIdHandler,
};
