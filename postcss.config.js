module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: ['last 15 version', '>2%', 'ie 6-8']
        })
    ]
};