const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@common': path.resolve(__dirname, 'src/common'),
        },
    },
    devServer: {
        allowedHosts: [
            '192.168.0.56',
            '192.168.219.*',
            'test-home.com',
            'test-ys.com',
        ]
    }
};
