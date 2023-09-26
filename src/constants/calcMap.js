export const calcMap = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => Math.round(a * b),
  "/": (a, b) => (a / b === Infinity ? "0" : Math.round(a / b)),
};
