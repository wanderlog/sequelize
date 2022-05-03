var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var object_exports = {};
__export(object_exports, {
  camelizeObjectKeys: () => camelizeObjectKeys,
  cloneDeep: () => cloneDeep,
  defaults: () => defaults,
  flattenObjectDeep: () => flattenObjectDeep,
  merge: () => merge,
  mergeDefaults: () => mergeDefaults
});
module.exports = __toCommonJS(object_exports);
var import_cloneDeepWith = __toESM(require("lodash/cloneDeepWith"));
var import_eq = __toESM(require("lodash/eq"));
var import_forOwn = __toESM(require("lodash/forOwn"));
var import_get = __toESM(require("lodash/get"));
var import_isFunction = __toESM(require("lodash/isFunction"));
var import_isPlainObject = __toESM(require("lodash/isPlainObject"));
var import_mergeWith = __toESM(require("lodash/mergeWith"));
var import_format = require("./format");
var import_string = require("./string");
const baseIsNative = require("lodash/_baseIsNative");
function mergeDefaults(a, b) {
  return (0, import_mergeWith.default)(a, b, (objectValue, sourceValue) => {
    if (!(0, import_isPlainObject.default)(objectValue) && objectValue !== void 0) {
      if ((0, import_isFunction.default)(objectValue) && baseIsNative(objectValue)) {
        return sourceValue || objectValue;
      }
      return objectValue;
    }
    return;
  });
}
function merge(...args) {
  const result = /* @__PURE__ */ Object.create(null);
  for (const obj of args) {
    (0, import_forOwn.default)(obj, (value, key) => {
      if (value === void 0) {
        return;
      }
      if (!result[key]) {
        result[key] = value;
      } else if ((0, import_isPlainObject.default)(value) && (0, import_isPlainObject.default)(result[key])) {
        result[key] = merge(result[key], value);
      } else if (Array.isArray(value) && Array.isArray(result[key])) {
        result[key] = [...value, ...result[key]];
      } else {
        result[key] = value;
      }
    });
  }
  return result;
}
function cloneDeep(obj, onlyPlain) {
  return (0, import_cloneDeepWith.default)(obj || {}, (elem) => {
    if (Array.isArray(elem) || (0, import_isPlainObject.default)(elem)) {
      return;
    }
    if (onlyPlain || typeof elem === "object") {
      return elem;
    }
    if (elem && typeof elem.clone === "function") {
      return elem.clone();
    }
  });
}
function flattenObjectDeep(value) {
  if (!(0, import_isPlainObject.default)(value)) {
    return value;
  }
  const flattenedObj = /* @__PURE__ */ Object.create(null);
  function flattenObject(obj, subPath) {
    for (const key of Object.keys(obj)) {
      const pathToProperty = subPath ? `${subPath}.${key}` : key;
      if (typeof obj[key] === "object" && obj[key] !== null) {
        flattenObject(obj[key], pathToProperty);
      } else {
        flattenedObj[pathToProperty] = (0, import_get.default)(obj, key);
      }
    }
    return flattenedObj;
  }
  return flattenObject(value);
}
function defaults(objectIn, ...sources) {
  for (const source of sources) {
    if (!source) {
      continue;
    }
    for (const key of (0, import_format.getComplexKeys)(source)) {
      const value = objectIn[key];
      const objectPrototype = Object.prototype;
      if (value === void 0 || (0, import_eq.default)(value, objectPrototype[key]) && !Object.prototype.hasOwnProperty.call(objectIn, key)) {
        objectIn[key] = source[key];
      }
    }
  }
  return objectIn;
}
function camelizeObjectKeys(obj) {
  const newObj = /* @__PURE__ */ Object.create(null);
  for (const key of Object.keys(obj)) {
    newObj[(0, import_string.camelize)(key)] = obj[key];
  }
  return newObj;
}
//# sourceMappingURL=object.js.map
