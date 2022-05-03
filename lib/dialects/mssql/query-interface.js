"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var query_interface_exports = {};
__export(query_interface_exports, {
  MsSqlQueryInterface: () => MsSqlQueryInterface
});
module.exports = __toCommonJS(query_interface_exports);
const _ = require("lodash");
const Utils = require("../../utils");
const { QueryTypes } = require("../../query-types");
const { Op } = require("../../operators");
const { QueryInterface } = require("../abstract/query-interface");
class MsSqlQueryInterface extends QueryInterface {
  async removeColumn(tableName, attributeName, options) {
    options = __spreadValues({ raw: true }, options);
    const findConstraintSql = this.queryGenerator.getDefaultConstraintQuery(tableName, attributeName);
    const [results0] = await this.sequelize.query(findConstraintSql, options);
    if (results0.length > 0) {
      const dropConstraintSql = this.queryGenerator.dropConstraintQuery(tableName, results0[0].name);
      await this.sequelize.query(dropConstraintSql, options);
    }
    const findForeignKeySql = this.queryGenerator.getForeignKeyQuery(tableName, attributeName);
    const [results] = await this.sequelize.query(findForeignKeySql, options);
    if (results.length > 0) {
      const dropForeignKeySql = this.queryGenerator.dropForeignKeyQuery(tableName, results[0].constraint_name);
      await this.sequelize.query(dropForeignKeySql, options);
    }
    const primaryKeyConstraintSql = this.queryGenerator.getPrimaryKeyConstraintQuery(tableName, attributeName);
    const [result] = await this.sequelize.query(primaryKeyConstraintSql, options);
    if (result.length > 0) {
      const dropConstraintSql = this.queryGenerator.dropConstraintQuery(tableName, result[0].constraintName);
      await this.sequelize.query(dropConstraintSql, options);
    }
    const removeSql = this.queryGenerator.removeColumnQuery(tableName, attributeName);
    return this.sequelize.query(removeSql, options);
  }
  async upsert(tableName, insertValues, updateValues, where, options) {
    const model = options.model;
    const wheres = [];
    options = __spreadValues({}, options);
    if (!Utils.isWhereEmpty(where)) {
      wheres.push(where);
    }
    let indexes = Object.values(model.uniqueKeys).map((item) => item.fields);
    indexes = indexes.concat(Object.values(model._indexes).filter((item) => item.unique).map((item) => item.fields));
    const attributes = Object.keys(insertValues);
    for (const index of indexes) {
      if (_.intersection(attributes, index).length === index.length) {
        where = {};
        for (const field of index) {
          where[field] = insertValues[field];
        }
        wheres.push(where);
      }
    }
    where = { [Op.or]: wheres };
    options.type = QueryTypes.UPSERT;
    options.raw = true;
    const sql = this.queryGenerator.upsertQuery(tableName, insertValues, updateValues, where, model, options);
    return await this.sequelize.query(sql, options);
  }
}
//# sourceMappingURL=query-interface.js.map
