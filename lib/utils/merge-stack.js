var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  mergeStack: () => mergeStack
});
function mergeStack({
  name,
  message,
  stack
}) {
  const trimmedStack = stack.replace(/^(Error)?\s*[\r\n]/gm, "");
  return `${name}: ${message}
${trimmedStack}`;
}
//# sourceMappingURL=merge-stack.js.map
