const path = require("path");

module.exports = {
  mode: "development",
  entry: "./tpl/index.html",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "project-name.bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    alias: {
      handlebars: "handlebars/dist/cjs/handlebars",
    },
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json"),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
          },
        ],
      },
    ],
  },
};
