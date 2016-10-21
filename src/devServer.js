var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../config/webpack.config.dev');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(80, 'local.nflflag.com', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://local.nflflag.com/');
});
