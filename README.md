# micserver.js

#### It can bing routers to handlers and start a native nodejs service very quickly
```
const micserver = require('micserver')

const ms = micserver('http')
ms.Handle({
    path: '/',
    method: 'GET',
    func: (req, res) => {
        res.write('Hello World')
        res.end()
    }
})

ms.listen()
```

Then you visit http://localhost:80 and you can receive the following message

```
Hello World
```

## Installation

```npm install micserver```

## Examples

### start service in http
```
const micserver = require('micserver')

const ms = micserver('http')
ms.Handle({
    path: '/',
    method: 'GET',
    func: (req, res) => {
        res.write('Hello World')
        res.end()
    }
})

ms.listen()
```

### Start an http service and https service at the same time
```
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

ms2.set({
    port: 443,
    keypath: {
        key: './key',
        cert: './cert'
    }
})

ms2.Handle({
    path: '/',
    method: 'GET',
    func: (req, res) => {
        res.write('Hello World')
        res.end()
    }
})

ms1.listen()
ms2.listen()
```

Then http server and https server will listen to ports 80 and 443 respectively.

## Api

### micserver(options)

Only support http or https type, return http or https server

### type: http
#### .set({options})
|Property|Description|Type|Default|
|:-|:-|:-|:-|
|host|The IP address of the service listener<br>for example `127.0.0.1` or `0.0.0.0`|String|"0.0.0.0"|
|port|Service listening the port|Number|80|

#### .Handle({options})
|Property|Description|Type|Default|
|:-|:-|:-|:-|
|method|Method of requesting service|String|'GET'|
|path|Path of requesting service|String|'/'|
|func|Service handler. This handler takes two parameters: <br>`request` and `response`.|Function||

#### .listen()

Start the service with the default or option configured in the set

### type: https
#### .set({options})
|Property|Description|Type|Default|
|:-|:-|:-|:-|
|keypath|This field is required if the type is https.<br>Need to configure the path of the `key` and `cert`|Object|{key: '',cert: ''}|
|host|The IP address of the service listener<br>for example `127.0.0.1` or `0.0.0.0`|String|"0.0.0.0"|
|port|Service listening the port|Number|443|

#### .Handle({options})
|Property|Description|Type|Default|
|:-|:-|:-|:-|
|method|Method of requesting service|String|'GET'|
|path|Path of requesting service|String|'/'|
|func|Service handler. This handler takes two parameters: <br>`request` and `response`.|Function||

#### .listen()

Start the service with the default or option configured in the set
