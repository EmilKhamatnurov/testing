const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production';

    return {
        mode: isProd ? 'production' : 'development',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProd ? 'js/[name].[contenthash:8].js' : 'js/bundle.js',
            publicPath: '/'
        },
        devtool: isProd ? 'source-map' : 'inline-source-map',
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx', '.json']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: { sourceMap: !isProd }
                        }
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg|webp)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/[name].[hash:8][ext]'
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
                inject: 'body'
            }),
            new MiniCssExtractPlugin({
                filename: isProd ? 'css/[name].[contenthash:8].css' : 'css/[name].css'
            })
        ],
        devServer: {
            static: {
                directory: path.resolve(__dirname, 'public')
            },
            port: 3000,
            hot: true,
            historyApiFallback: true,
            open: false
        },
        performance: {
            hints: false
        }
    };
};