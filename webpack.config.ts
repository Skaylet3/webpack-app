import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Mode = 'production' | 'development';

interface EnvVariables {
  mode: Mode,
  port: number
}

export default(env: EnvVariables) => {

  const isDev = env.mode === 'development';

  const config: webpack.Configuration = {
  mode: env.mode ?? 'development',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({template: path.resolve(__dirname, 'index.html')}),
    isDev && new webpack.ProgressPlugin(),
    !isDev && new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: isDev && 'inline-source-map',
  devServer: isDev ? {
    port: env.port ?? 3000,
    open: true,
  } : undefined,
}
  return config;
};
