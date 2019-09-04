// Базовые переменные
const path = require('path'),
    webpack = require('webpack'),
    // Добавление плагинов
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    ImageminPlugin = require('imagemin-webpack-plugin').default,
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

let isProduction = process.env.NODE_ENV === 'production';

// Настройки модуля
module.exports = {
    // Базовый путь к проекту
    context: path.resolve(__dirname, 'src'),

    // Точки входа js
    entry: {
        // Основной файл приложения
        app: ['./js/app.js', './scss/style.scss'],
    },

    // Путь для собранных файлов
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },

    // Конфигурация devServer
    devServer: {
        contentBase: './app',
    },

    devtool: isProduction ? '' : 'inline-source-map',

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },

            // Babel
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                    },
                },
            },

            // Изображения
            {
                test: /\.(png|gif|jpe?g)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                    'img-loader',
                ],
            },

            // Шрифты
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                ],
            },

            // SVG
            {
                test: /\.svg$/,
                loader: 'svg-url-loader',
            },
        ],
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            Popper: ['popper.js', 'default'],
        }),
        new MiniCssExtractPlugin({
            filename: './css/[name].css',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: '../app/index.html',
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([{ from: './img', to: 'img' }], {
            ignore: [
                {
                    glob: 'svg/*',
                },
            ],
        }),
    ],
};

// Production only
if (isProduction) {
    module.exports.plugins.push(
        new UglifyJSPlugin({
            sourceMap: true,
        }),
    );

    module.exports.plugins.push(
        new ImageminPlugin({
            test: /\.(png|jpe?g|gif|svg)$/i,
        }),
    );

    module.exports.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
    );
}
