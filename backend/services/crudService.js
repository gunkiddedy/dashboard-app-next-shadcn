const mongoose = require("mongoose");
const { Sequelize, Op } = require("sequelize");
const dbType = process.env.DB_TYPE || "mongodb";

class CrudService {
  constructor(model, dbType) {
    if (!model) throw new Error("Model not provided to CrudService");
    if (!dbType) throw new Error("dbType not provided to CrudService");
    this.model = model;
    this.dbType = dbType;
  }

  async create(data, transaction = null) {
    if (dbType === "mongodb") {
      return await this.model.create(data);
    } else if (dbType === "postgres") {
      return await this.model.create(data, { transaction });
    }
  }

  async findOne(query) {
    console.log(query);
    if (dbType === "mongodb") {
      return await this.model.findOne(query);
    } else if (dbType === "postgres") {
      return await this.model.findOne({ where: query });
    }
  }

  async findById(id) {
    if (dbType === "mongodb") {
      return await this.model.findById(id);
    } else if (dbType === "postgres") {
      return await this.model.findByPk(id);
    }
  }

  async findMany(query = {}) {
    if (dbType === "mongodb") {
      return await this.model.find(query);
    } else if (dbType === "postgres") {
      return await this.model.findAll({ where: query });
    }
  }

  async count(query = {}) {
    if (dbType === "mongodb") {
      return await this.model.countDocuments(query);
    } else if (dbType === "postgres") {
      return await this.model.count({ where: query });
    }
  }

  async update(id, data, transaction = null) {
    if (dbType === "mongodb") {
      return await this.model.findByIdAndUpdate(id, data, { new: true });
    } else if (dbType === "postgres") {
      return await this.model.update(data, { where: { id }, transaction });
    }
  }

  async delete(id, transaction = null) {
    if (dbType === "mongodb") {
      return await this.model.findByIdAndDelete(id);
    } else if (dbType === "postgres") {
      return await this.model.destroy({ where: { id }, transaction });
    }
  }

  async paginate(query = {}, options = { page: 1, limit: 10 }) {
    const { page, limit } = options;
    const offset = (page - 1) * limit;

    if (dbType === "mongodb") {
      const results = await this.model.find(query).skip(offset).limit(limit);
      const count = await this.model.countDocuments(query);
      return { results, total: count, page, pages: Math.ceil(count / limit) };
    } else if (dbType === "postgres") {
      const results = await this.model.findAndCountAll({
        where: query,
        limit,
        offset,
      });
      return {
        results: results.rows,
        total: results.count,
        page,
        pages: Math.ceil(results.count / limit),
      };
    }
  }

  async runTransaction(callback) {
    if (dbType === "postgres") {
      const sequelize = this.model.sequelize;
      return await sequelize.transaction(async (transaction) => {
        return await callback(transaction);
      });
    } else {
      throw new Error("Transactions are not supported in MongoDB.");
    }
  }
}

module.exports = CrudService;
