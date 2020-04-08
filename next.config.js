module.exports = {
  webpack: (config, options) => {
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
