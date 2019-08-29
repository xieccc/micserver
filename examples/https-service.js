const micserver = require('micserver')

const ms = micserver('https')

ms.set({
    keypath: {
        key: './key',
        cert: './cert'
    }
})

ms.Handle({
    path: '/',
    method: 'GET',
    func: (req, res) => {
        res.write('Hello World')
        res.end()
    }
})

ms.Handle({
    path: '/home',
    method: 'GET',
    func: (req, res) => {
        res.write('Path: home')
        res.end()
    }
})

ms.Handle({
    path: '/login',
    method: 'POST',
    func: (req, res) => {
        res.write('Path: login')
        res.end()
    }
})

ms.listen()