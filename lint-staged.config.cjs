module.exports = {
  '*.{mjs,cjs,js,ts,jsx,tsx}': 'xo --fix',
  '!*.{mjs,cjs,js,ts,jsx,tsx}': 'prettier --write --ignore-unknown',
};
