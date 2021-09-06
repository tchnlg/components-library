const path = require("path");

module.exports = async ({ config }) => {
  const svelteLoader = config.module.rules.find(
    (r) => r.loader && r.loader.includes("svelte-loader")
  );
  svelteLoader.options = {
    ...svelteLoader.options,
    emitCss: true,
    hotReload: false,
  };
  config.module.rules.push({
    test: [/\.stories\.js$/],
    loaders: [require.resolve("@storybook/source-loader")],
    include: [path.resolve(__dirname, "../src")],
    enforce: "pre",
  });
  return config;
};
