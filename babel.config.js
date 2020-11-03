const removeConsolePlugin = [];
if (process.env.NODE_ENV === "cProduction") {
  removeConsolePlugin.push("transform-remove-console");
}

module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  env: {
    test: {
      plugins: ["require-context-hook"],
    },
  },
  plugins: removeConsolePlugin,
};
