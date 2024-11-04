module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@components": "./src/components",
            "@assets": "./src/assets",
            "@screens": "./src/screens",
            "@utils": "./src/utils",
            "@features": "./src/features",
            "@locales": "./src/locales",
          },
        },
      ],
    ],
  };
};
