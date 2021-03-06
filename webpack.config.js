const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js'
    },
    
    devtool: 'source-map',
    
    module: {
        rules: [

            /**
             * Vue files containing components have to be correctly interpreted
             */
            {
                test: /\.vue/,
                use: ['vue-loader']
            },
            
            /**
             *  CSS Files for the website have to be concatenated and minimized
             * into a single style.css file
             */
            {
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }
                })
            },

            /**
             * Images should be compressed and afterwards 
             * stored inside the img folder
             */
            {
                test: /\.(gif|png|jpe?g|ico|webm)/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/'
                    },
                },
                {
                    loader: 'image-webpack-loader',
                    options: {
                        bypassOnDebug: true,
                    },
                }]
            },

            /**
             * Fonts are stored inside the font folder
             */
            {
                test: /\.(woff2|woff|otf|ttf)/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }                    
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        
        /**
         * Export index.html, the main blog.
         */
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: 'body',
            minify: {
                html5: false,
                removeComments: true, 
                collapseWhitespace: true,
            }
        }),
        
        /**
         * Via an entry you can go to
         * the guest book for discussions.
         */
        new HtmlWebpackPlugin({
            filename: 'gaestebuch.html',
            template: './src/gaestebuch.html',
            inject: 'head',
            minify: {
                html5: false,
                removeComments: true, 
                collapseWhitespace: true,
            }
        }),

        /**
         * Export impressum.html containing
         * a proverb of me and a picture.
         */
        new HtmlWebpackPlugin({
            filename: 'impressum.html',
            template: './src/impressum.html',
            inject: 'head',
            minify: {
                html5: false,
                removeComments: true, 
                collapseWhitespace: true,
            }
        }),

        /**
         * Just copy the SPAYLE game without any processing
         */
        new CopyWebpackPlugin([
            { from: 'src/game/', to: 'game/' }
        ]),

        new UglifyJsPlugin()
    ],

    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    }
};