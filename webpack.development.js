const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var DashboardPlugin = require('webpack-dashboard/plugin');
console.log('Webpack: development')

module.exports = env => merge(common, {
  mode: 'development',
  plugins: [
    new DashboardPlugin()
  ]  
});