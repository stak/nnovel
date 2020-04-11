module.exports = {
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin(/\.test\.(ts|tsx|js|jsx)$/))

    config.module.rules.push({
      test: /\.(ns|frag|vert)/,
      use: [
        {
          loader: 'raw-loader',
        },
      ],
    })

    return config
  },
}
