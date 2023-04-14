const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = env => {
    return {
        mode: env && env.production ? 'production' : 'development',
        entry: {
            index: ['babel-polyfill', './src/index.ts'],
            'service_worker': path.resolve(__dirname, 'src', 'service_worker', 'index.ts'),
            'content-script': path.resolve(__dirname, 'src', 'content-script', 'index.ts'),
        },
        devtool: env && env.production ? undefined : 'inline-source-map',
        devServer: {
            static: {
                directory: path.join(__dirname, '..', 'extension', 'public', 'michael-ai'),
            },
            proxy: {
                '/api': 'http://127.0.0.1:8080',
            },
            hot: true,
        },
        module: {
            rules: [
                {
                    test: /\.(tsx|jsx)?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            babelrc: false,
                            presets: [
                                [
                                    "@babel/preset-env",
                                    { targets: { browsers: "last 2 versions" } }
                                    // or whatever your project requires
                                ],
                                "@babel/preset-typescript",
                                "@babel/preset-react"
                            ],
                            plugins: [
                                env && env.production ? false : require.resolve('react-refresh/babel')
                            ].filter(Boolean)
                        }
                    }
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: 'file-loader'
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: 'file-loader'
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader']
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.jsx', '.ts', '.js'],
            alias: {
                '@components': path.join(__dirname, 'src', 'components'),
                '@models': path.join(__dirname, 'src', 'models'),
                '@hooks': path.join(__dirname, 'src', 'hooks'),
                '@config': path.join(__dirname, 'src', 'assets/config'),
            },
        },
        output: {
            filename: '[name].js',
            path: path.join(__dirname, '..', 'extension', 'public', 'michael-ai'),
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'Michael AI',
                chunks : ['index'],
            }),
            new ForkTsCheckerWebpackPlugin(),
            env && env.production ? false : new ReactRefreshWebpackPlugin(),
            new Dotenv()
        ].filter(Boolean)
    }
}