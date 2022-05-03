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
var base_exports = {};
__export(base_exports, {
  Association: () => Association
});
module.exports = __toCommonJS(base_exports);
const { AssociationError } = require("./../errors");
class Association {
  constructor(source, target, options = {}) {
    this.source = source;
    this.target = target;
    this.options = options;
    this.scope = options.scope;
    this.isSelfAssociation = this.source === this.target;
    this.as = options.as;
    this.associationType = "";
    if (source.hasAlias(options.as)) {
      throw new AssociationError(`You have used the alias ${options.as} in two separate associations. Aliased associations must have unique aliases.`);
    }
  }
  toInstanceArray(input) {
    if (!Array.isArray(input)) {
      input = [input];
    }
    return input.map((element) => {
      if (element instanceof this.target) {
        return element;
      }
      const tmpInstance = {};
      tmpInstance[this.target.primaryKeyAttribute] = element;
      return this.target.build(tmpInstance, { isNewRecord: false });
    });
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.as;
  }
}
//# sourceMappingURL=base.js.map
