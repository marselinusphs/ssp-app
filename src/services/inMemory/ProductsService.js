const { nanoid } = require('nanoid')
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class ProductsService {
  constructor() {
    this._products = [];
  }

  addProduct({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newProduct = {
      title, tags, body, id, createdAt, updatedAt,
    };

    this._products.push(newProduct);

    const isSuccess = this._products.filter((product) => product.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Catatan gagal ditambahkan');
    }

    return id;
  }

  getProducts() {
    return this._products;
  }

  getProductById(id) {
    const product = this._products.filter((n) => n.id === id)[0];
    if (!product) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }
    return product;
  }

  editProductById(id, { title, body, tags }) {
    const index = this._products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this._products[index] = {
      ...this._products[index],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  deleteProductById(id) {
    const index = this._products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
    }
    this._products.splice(index, 1);
  }
}

module.exports = ProductsService;