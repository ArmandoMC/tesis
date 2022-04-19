// const faker = require('faker');
// const {Op} = require('sequelize');

const boom = require('@hapi/boom');
// const { models } = require('../libs/sequelize');
const pool = require('../libs/postgres.pool');

class ProductsService {

  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }


  async create(data) {
    const { name, price, description, image, categoryId } = data;
    const query = {
      text: `INSERT INTO products(name,image,description,price,category_id) VALUES($1,$2,$3,$4,$5) RETURNING *`,
      values: [name, image, description, price, categoryId]
    };
    const newProduct = await this.pool.query(query);
    return newProduct.rows[0];
  }

  async find(query) {
    const sql = 'SELECT * FROM products';
    const products = await this.pool.query(sql);
    return products.rows;
  }

  async findOne(id) {

    const query = {
      text: `SELECT * FROM products WHERE id=$1`,
      values: [id]
    };
    const product = await this.pool.query(query);
    if (product.rows.length === 0) {
      throw boom.notFound('product not found');
    }
    return product.rows[0];
  }

  async update(id, changes) {

    await this.findOne(id);
    const { name, image, description, price, categoryId } = changes;
    const query = {
      text: `UPDATE products SET name=$1, image=$2,description=$3,price=$4,category_id=$5 WHERE id=$6 RETURNING *`,
      values: [name, image, description, price, categoryId, id]
    };
    const rta = await pool.query(query);
    return rta.rows[0];
  }

  async delete(id) {
    await this.findOne(id);
    const query = {
      text: `DELETE FROM products WHERE id=$1`,
      values: [id]
    }
    await this.pool.query(query);
    return { id };
  }

}

module.exports = ProductsService;
