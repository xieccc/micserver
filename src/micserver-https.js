const https = require('https')
const url = require('url')
const fs = require('fs')


class micserverHttps {
    constructor(type){
        this.methodArr = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'CONNECT', 'TRACE', 'PATCH']
        this.micServerObj = this.methodArr.reduce((r, c) => {
            r['_' + c] = {}
            return r
        }, {})

        this.type = type
        this.host = '0.0.0.0'
        this.port = 443
        this.keypath = {
            key: '',
            cert: ''
        }
    }

    set(obj){
        let attribute = ['host', 'port', 'keypath']
        attribute.map(r => obj[r]?this[r] = obj[r]:'')
    }


    Handle(obj){
        let method = obj.method || 'GET'
        let path = obj.path || '/'

        let METHOD = method.toLocaleUpperCase()
        if(this.methodArr.indexOf(METHOD) !== -1) this.micServerObj['_' + METHOD][path] = obj.func
    }
    
    listen(){
        const options = {
            key: fs.readFileSync(this.keypath.key),
            cert: fs.readFileSync(this.keypath.cert)
        }
        https.createServer(options, (req, res) => this.entrance(req, res)).listen(this.port, this.host)

        console.log(this.type)
        Object.entries(this.micServerObj).map(([r, c]) => {
            if(Object.keys(c).length){
                console.log(r.substr(1))
                Object.entries(c).map(([k, v]) => {
                    let funcName = v.name !== 'func'?v.name:'()'
                    console.log('bind ' + k + ' to ' + funcName)
                })
                console.log(' ')
            }
        })
        console.log('the service is listening on ' + this.host + ':' + this.port)
    }

    entrance(req, res){
        let pathname = url.parse(req.url).pathname
        let method = '_' + req.method
        if(this.micServerObj[method][pathname]) this.micServerObj[method][pathname](req, res)
    }
    
}


module.exports = micserverHttps