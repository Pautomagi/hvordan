module.exports = [
  {
    test: /\.js$/,
    exclude: /node_modules/,

    use: [
      {
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env"] },
      },
    ],
  },
  {
    test: /\.s[c|a]ss$/,
    use: [
      {
        loader: "style-loader", // inject CSS to page
      },
      {
        loader: "css-loader", // translates CSS into CommonJS modules
      },
      {
        loader: "postcss-loader", // Run post css actions
        options: {
          postcssOptions: {
            plugins: function () {
              // post css plugins, can be exported to postcss.config.js
              return [require("precss"), require("autoprefixer")];
            },
          },
        },
      },
      {
        loader: "sass-loader", // compiles Sass to CSS
        options: {
          sassOptions: {
            includePaths: [
              "./node_modules/bootstrap/scss",
              "./node_modules/luxbar/scss",
            ],
          },
        },
      },
    ],
  },

  {
    test: /\.(woff2?|ttf|eot|svg)(\?.*)?$/i,
    use: "file-loader?name=fonts/[name].[hash].[ext]",
  },
  // Twig templates
  {
    test: /\.twig$/,
    use: [
      "raw-loader",
      {
        loader: "twig-html-loader",
        options: {
          data: {},
          functions: {
            repeat(value, times) {
              return new Array(times + 1).join(value);
            },
            url(path) {
              return "http://localhost:8080/" + path + ".html";
            },
          },
        },
      },
    ],
  },
];
