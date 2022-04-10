import copy from 'rollup-plugin-copy'
export default {
  build: {
    rollupOptions: {
      plugins: [
        copy({
          targets: [
            { src: 'manifest.json', dest: './dist' },
            { src: 'icon-128.png', dest: './dist' }
        ],
        verbose: true,
        hook: 'writeBundle'
      }),
    ]      
    }
  }
}