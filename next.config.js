module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.ns/,
      use: [
        {
          loader: 'raw-loader',
        },
      ],
    })

    return config
  },
}
