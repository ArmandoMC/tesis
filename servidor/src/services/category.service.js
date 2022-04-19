const boom = require('@hapi/boom');
// const{models}=require('../libs/sequelize');
const pool = require('../libs/postgres.pool');


class CategoryService {

  constructor(){
    this.pool = pool;
    this.pool.on('error',(err)=>console.error(err));

  }
  async create(data) {

    const { name,image } = data;
    const query = {
      text: `INSERT INTO categories(name,image) VALUES($1,$2) RETURNING *`,
      values: [name, image]
    };
    const newCategory = await this.pool.query(query);
    return newCategory.rows[0];
  }

  async find() {

    const query = 'SELECT * FROM categories';
    const categories = await this.pool.query(query);
    return categories.rows;

  }

  async findOne(id) {
    const query = {
      text: `SELECT * FROM categories WHERE id=$1`,
      values: [id]
    };
    const category = await this.pool.query(query);
    if (category.rows.length===0) {
      throw boom.notFound('category not found');
    }
    return category.rows[0];
  }

  async update(id, changes) {
    await this.findOne(id);
    const { name, image } = changes;
    const query = {
      text: `UPDATE categories SET name=$1, image=$2 WHERE id=$3 RETURNING *`,
      values: [name, image,id]
    };
    const rta = await this.pool.query(query);
    return rta.rows[0];
  }

  async delete(id) {
    await this.findOne(id);
    const query = {
      text: `DELETE FROM categories WHERE id=$1`,
      values: [id]
    }
    await this.pool.query(query);
    return { id };
  }

}

module.exports = CategoryService;
