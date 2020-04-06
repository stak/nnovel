module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(ns|flag|vert)/,
      use: [
        {
          loader: 'raw-loader',
        },
      ],
    })

    return config
  },
}
