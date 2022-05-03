"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var mixin_exports = {};
__export(mixin_exports, {
  Mixin: () => Mixin
});
module.exports = __toCommonJS(mixin_exports);
const _ = require("lodash");
const { HasOne } = require("./has-one");
const { HasMany } = require("./has-many");
const { BelongsToMany } = require("./belongs-to-many");
const { BelongsTo } = require("./belongs-to");
function isModel(model, sequelize) {
  return model && model.prototype && model.prototype instanceof sequelize.Sequelize.Model;
}
const Mixin = {
  hasMany(target, options = {}) {
    if (!isModel(target, this.sequelize)) {
      throw new Error(`${this.name}.hasMany called with something that's not a subclass of Sequelize.Model`);
    }
    const source = this;
    options.hooks = options.hooks === void 0 ? false : Boolean(options.hooks);
    options.useHooks = options.hooks;
    Object.assign(options, _.omit(source.options, ["hooks"]));
    if (options.useHooks) {
      this.runHooks("beforeAssociate", { source, target, type: HasMany }, options);
    }
    const association = new HasMany(source, target, options);
    source.associations[association.associationAccessor] = association;
    association._injectAttributes();
    association.mixin(source.prototype);
    if (options.useHooks) {
      this.runHooks("afterAssociate", { source, target, type: HasMany, association }, options);
    }
    return association;
  },
  belongsToMany(target, options = {}) {
    if (!isModel(target, this.sequelize)) {
      throw new Error(`${this.name}.belongsToMany called with something that's not a subclass of Sequelize.Model`);
    }
    const source = this;
    options.hooks = options.hooks === void 0 ? false : Boolean(options.hooks);
    options.useHooks = options.hooks;
    options.timestamps = options.timestamps === void 0 ? this.sequelize.options.timestamps : options.timestamps;
    Object.assign(options, _.omit(source.options, ["hooks", "timestamps", "scopes", "defaultScope"]));
    if (options.useHooks) {
      this.runHooks("beforeAssociate", { source, target, type: BelongsToMany }, options);
    }
    const association = new BelongsToMany(source, target, options);
    source.associations[association.associationAccessor] = association;
    association._injectAttributes();
    association.mixin(source.prototype);
    if (options.useHooks) {
      this.runHooks("afterAssociate", { source, target, type: BelongsToMany, association }, options);
    }
    return association;
  },
  getAssociations(target) {
    return Object.values(this.associations).filter((association) => association.target.name === target.name);
  },
  getAssociationForAlias(target, alias) {
    return this.getAssociations(target).find((association) => association.verifyAssociationAlias(alias)) || null;
  }
};
function singleLinked(Type) {
  return function declareAssociation(target, options = {}) {
    const source = this;
    if (!isModel(target, source.sequelize)) {
      throw new Error(`${source.name}.${_.lowerFirst(Type.name)} called with something that's not a subclass of Sequelize.Model`);
    }
    options.hooks = options.hooks === void 0 ? false : Boolean(options.hooks);
    options.useHooks = options.hooks;
    if (options.useHooks) {
      source.runHooks("beforeAssociate", { source, target, type: Type }, options);
    }
    const association = new Type(source, target, Object.assign(options, source.options));
    source.associations[association.associationAccessor] = association;
    association._injectAttributes();
    association.mixin(source.prototype);
    if (options.useHooks) {
      source.runHooks("afterAssociate", { source, target, type: Type, association }, options);
    }
    return association;
  };
}
Mixin.hasOne = singleLinked(HasOne);
Mixin.belongsTo = singleLinked(BelongsTo);
//# sourceMappingURL=mixin.js.map
