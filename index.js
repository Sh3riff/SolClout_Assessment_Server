const expressServer = require('./server')

expressServer().listen(process.env.PORT || 5000, () => console.log('server up'))
