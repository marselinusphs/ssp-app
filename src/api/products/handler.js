class ProductsHandler {
  constructor(service) {
    this._service = service;

    this.postProductHandler = this.postProductHandler.bind(this);
    this.getProductsHandler = this.getProductsHandler.bind(this);
    this.getProductByIdHandler = this.getProductByIdHandler.bind(this);
    this.putProductByIdHandler = this.putProductByIdHandler.bind(this);
    this.deleteProductByIdHandler = this.deleteProductByIdHandler.bind(this);
  }

  postProductHandler(request, h) {
    try {
      const { title = 'untitled', body, tags } = request.payload;

      const productId = this._service.addProduct({ title, body, tags });

      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          productId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(400);
      return response;
    }
  }

  getProductsHandler() {
    const products = this._service.getProducts();
    return {
      status: 'success',
      data: {
        products,
      },
    };
  }

  getProductByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const product = this._service.getProductById(id);
      return {
        status: 'success',
        data: {
          product,
        },
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  putProductByIdHandler(request, h) {
    try {
      const { id } = request.params;

      this._service.editProductById(id, request.payload);

      return {
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  deleteProductByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.deleteProductById(id);
      return {
        status: 'success',
        message: 'Catatan berhasil dihapus',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = ProductsHandler;