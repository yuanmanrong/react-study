const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    devServer: {
       hot: true
    },
    mode: "development",
    module: {
        rules:[
            {
                test: /\.ts$/,
                use: [{
                      loader: "babel-loader",
                      options: {
                          // 预定义环境
                          presets:[
                              [  //指定环境插件
                                "@babel/preset-env",
                                {
                                    targets: {
                                        "chrome": "88",
                                        "ie": "11"
                                    },
                                    "corejs": "3",
                                    "useBuiltIns": "usage" // 按需加载
                                }

                              ]
                            
                          ]
                      }
                     },
                    "ts-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.less/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                      loader: "postcss-loader",
                      options: {
                          postcssOptions: {
                              plugins:[
                                  [
                                      "postcss-preset-env",
                                      {
                                        browsers: "last 2 versions"
                                      }
                                  ]
                              ]
                          }
                      }
                    },
                    "less-loader"
                ]

            },
            // 热更新html文件
            {
                test: /\.html/,
                use:[
                    "raw-loader"
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:"./src/index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    //用来设置引用模块
    resolve: {
        extensions: [ ".ts", ".js"]
    }
}