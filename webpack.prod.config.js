const path = require('path'); //подключаем плагин чтобы path правильно нашел путь до папки

module.exports = {
    entry: './src/index.js', //точка входа в проект
    output: { //точка выхода
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist') //Папка куда хотим положить файл bundle
    },
    mode: 'production',
    module: {
        rules: [ //Набор правил
            {
                test: /\.js$/, //все файлы оканчивающиеся на .js
                use: {  //Что мы будем использовать
                    loader: 'babel-loader', 
                    options: {
                        presets: ['@babel/env']
                    },
                },
                exclude: /node_modules/,
            }
        ]
    }
};