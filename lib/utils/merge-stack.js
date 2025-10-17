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
  const stackLines = stack.split("\n");
  if (stackLines.length > 0 && !/ *at /.test(stackLines[0])) {
    stackLines.shift();
  }
  return `${name}: ${message}
${stackLines.join("\n")}`;
}
//# sourceMappingURL=merge-stack.js.map
