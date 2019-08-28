const http = require('http')
const https = require('http')
const url = require('url')
const fs = require('fs')


class micServer {
    constructor(){
        this.methodArr = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'CONNECT', 'TRACE', 'PATCH']
        this.micServerObj = this.methodArr.reduce((r, c) => {
            r['_' + c] = {}
            return r
        }, {})
        this.type = 'http'
        this.keypath = {
            key: '',
            cert: ''
        }
        this.host = '0.0.0.0'
        this.port = 80
    }

    set(obj){
        Object.entries(obj).map(([r, c]) => this[r] = c)
    }


    Handle(obj){
        let method = obj.method || 'GET'
        let path = obj.path || '/'

        let METHOD = method.toLocaleUpperCase()
        if(this.methodArr.indexOf(METHOD) !== -1) this.micServerObj['_' + METHOD][path] = obj.func
    }
    
    listen(){
        switch(this.type){
            case 'http':
                http.createServer((req, res) => this.entrance(req, res)).listen(this.port, this.host)
            break;

            case 'https':
                const options = {
                    key: fs.readFileSync(keypath.key),
                    cert: fs.readFileSync(keypath.cert)
                }
                https.createServer(options, (req, res) => this.entrance(req, res)).listen(this.port, this.host)
            break;
        }
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




module.exports = new micServer()