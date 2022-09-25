const ClientError = require('../../exceptions/ClientError');
 
class ProductsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
 
    this.postProductHandler = this.postProductHandler.bind(this);
    this.getProductsHandler = this.getProductsHandler.bind(this);
    this.getProductByIdHandler = this.getProductByIdHandler.bind(this);
    this.putProductByIdHandler = this.putProductByIdHandler.bind(this);
    this.deleteProductByIdHandler = this.deleteProductByIdHandler.bind(this);
  }
 
  async postProductHandler(request, h) {
    try {
      this._validator.validateProductPayload(request.payload);
      const { title = 'untitled', body, tags } = request.payload;
 
      const productId = await this._service.addProduct({ title, body, tags });
 
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
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
 
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
 
  async getProductsHandler() {
    const products = await this._service.getProducts();
    return {
      status: 'success',
      data: {
        products,
      },
    };
  }
 
  async getProductByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const product = await this._service.getProductById(id);
      return {
        status: 'success',
        data: {
          product,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
 
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
 
  async putProductByIdHandler(request, h) {
    try {
      this._validator.validateProductPayload(request.payload);
      const { id } = request.params;
      const { title, body, tags } = request.payload;
 
      await this._service.editProductById(id, request.payload);
 
      return {
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
 
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
 
  async deleteProductByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteProductById(id);
 
      return {
        status: 'success',
        message: 'Catatan berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
 
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(404);
      console.error(error);
      return response;
    }
  }
}
 
module.exports = ProductsHandler;