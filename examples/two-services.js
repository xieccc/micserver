const micserver = require('micserver')

const ms1 = micserver('http')
const ms2 = micserver('https')

ms1.Handle({
    path: '/',
    method: 'GET',
    func: (req, res) => {
        res.write('Hello World')
        res.end()
    }
})

ms1.Handle({
    path: '/home',
    method: 'GET',
    func: (req, res) => {
        res.write('Path: home')
        res.end()
    }
})

ms2.set({
    keypath: {
        key: './key',
        cert: './cert'
    }
})


ms2.Handle({
    path: '/login',
    method: 'POST',
    func: (req, res) => {
        res.write('Path: login')
        res.end()
    }
})

ms1.listen()
ms2.listen()