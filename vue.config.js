module.exports = {
    css: {
        extract: false
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-full-player-video/'
    : '/'
}

