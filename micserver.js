const http = require('./src/micserver-http')
const https = require('./src/micserver-https')


const micServer = type => {
    switch(type){
        case 'http':
            return new http(type)
        break;

        case 'https':
            return new https(type)
        break;
    }
}



module.exports = micServer