let plugins = [ // element 按需引入
  [
      'component',
      {
          'libraryName': 'element-ui',
          'styleLibraryName': 'theme-chalk'
      }
  ]
]
if (process.env.NODE_ENV === 'production') {
  plugins.push(["transform-remove-console", { "exclude": [ "error", "warn"] }] );
}
module.exports = {
  presets: [
      '@vue/app'
  ],
  plugins
}
