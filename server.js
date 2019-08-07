const Bundler = require('parcel-bundler')
const app = require('express')()
const path = require('path')
const fs = require('fs')

let isFirstBuild = true

const serverDir = './dist'

const bundler = new Bundler('./src/index.pug', {
  sourceMaps: false,
  cache: false
})

bundler.on('buildEnd', bundle => {
  if (!isFirstBuild) return

  fs.readdir(serverDir, (err, files) => {
    if (err) throw err

    const html = []

    files.forEach(file => {
      // only HTML files
      if (file.match(/.+\.(html)$/)) {
        html.push(file)
      }
    })

    if (html.length === 0) throw new Error('Not HTML files found')

    html.forEach(file => {
      const fileName = file.replace('.html', '')

      app.get(`/${fileName === 'index' ? '' : fileName}`, (req, res) => {
        res.sendFile(path.join(__dirname, `dist/${file}`))
      })
    })

    app.use((req, res) => {
      res.status(404).sendFile(path.join(__dirname, `dist/404.html`))
    })
  })

  isFirstBuild = false
})

app.use(bundler.middleware())
app.listen(1234)

console.log('Running at Port 1234')
