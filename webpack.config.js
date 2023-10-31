const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.ts', // Основной файл (TypeScript)
    output: {
        path: path.resolve(__dirname, 'dist'), // Папка для сборки проекта
        filename: 'bundle.js' // Название файла сборки
    },
    resolve: {
        extensions: ['.ts', '.js'] // Расширения файлов, которые Webpack будет обрабатывать
    },
    module: {
        rules: [
            {
                test: /\.ts$/, // Регулярное выражение для файлов TypeScript
                use: 'ts-loader', // Используем ts-loader для обработки TypeScript
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/i, // Регулярное выражение для файлов SCSS
                include: path.resolve(__dirname, 'src', 'styles'), // Путь до папки со стилями
                use: [
                    MiniCssExtractPlugin.loader, // Извлекает CSS в отдельный файл
                    'css-loader', // переводит CSS в модуль
                    'sass-loader' // компилирует SCSS в CSS
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css' // Название выходного CSS файла
        })
    ]
};
