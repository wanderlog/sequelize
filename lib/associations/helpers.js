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
var helpers_exports = {};
__export(helpers_exports, {
  addForeignKeyConstraints: () => addForeignKeyConstraints,
  checkNamingCollision: () => checkNamingCollision,
  mixinMethods: () => mixinMethods
});
module.exports = __toCommonJS(helpers_exports);
function checkNamingCollision(association) {
  if (Object.prototype.hasOwnProperty.call(association.source.rawAttributes, association.as)) {
    throw new Error(`Naming collision between attribute '${association.as}' and association '${association.as}' on model ${association.source.name}. To remedy this, change either foreignKey or as in your association definition`);
  }
}
function addForeignKeyConstraints(newAttribute, source, target, options, key) {
  if (options.foreignKeyConstraint || options.onDelete || options.onUpdate) {
    const primaryKeys = Object.keys(source.primaryKeys).map((primaryKeyAttribute) => source.rawAttributes[primaryKeyAttribute].field || primaryKeyAttribute);
    if (primaryKeys.length === 1 || !primaryKeys.includes(key)) {
      newAttribute.references = {
        model: source.getTableName(),
        key: key || primaryKeys[0]
      };
      newAttribute.onDelete = options.onDelete;
      newAttribute.onUpdate = options.onUpdate;
    }
  }
}
function mixinMethods(association, obj, methods, aliases) {
  aliases = aliases || {};
  for (const method of methods) {
    if (!Object.prototype.hasOwnProperty.call(obj, association.accessors[method])) {
      const realMethod = aliases[method] || method;
      obj[association.accessors[method]] = function(...params) {
        return association[realMethod](this, ...params);
      };
    }
  }
}
//# sourceMappingURL=helpers.js.map
