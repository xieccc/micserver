# micserver.js

#### It can bing souters to handlers and start a native nodejs service very quickly
```
const ms = require('micserver')

ms.Handle({
    path: '/',
    method: 'GET',
    func: (req, res) => {
        res.write('Hello World\n')
        res.write('You use micserver to create a server successfully')
        res.end()
    }
})

ms.listen()
```

Then you visit http://localhost:80 and you can receive the following message

```
Hello World
You use micserver to create a server successfully
```

## Installation

```npm install micserver```

## Examples

### start server in http
```
const ms = require('micserver')

ms.Handle({
    path: '/',
    method: 'GET',
    func: (req, res) => {
        res.write('Hello World\n')
        res.write('type: http\n')
        res.write('METHOD: GET\n')
        res.end()
    }
})

ms.Handle({
    path: '/',
    method: 'POST',
    func: (req, res) => {
        res.write('Hello World\n')
        res.write('type: http\n')
        res.write('METHOD: POST\n')
        res.end()
    }
})

ms.listen()
```

### start server in https
```
const ms = require('micserver')

ms.set({
    type = 'https'
    keypath = {
        key: './key',
        cert: './cert'
    }
    host = '127.0.0.1'
    port = 8080
})

ms.Handle({
    path: '/',
    method: 'GET',
    func: (req, res) => {
        res.write('Hello World\n')
        res.write('type: https\n')
        res.write('METHOD: GET\n')
        res.end()
    }
})

ms.listen()
```

## Api

### micserver.set({options})
|Property|Description|Type|Default|
|:-|:-|:-|:-|
|type|If you enable the server's ssl, then the value is https<br>Optional values are `http` and `https`|String|"http"|
|keypath|This field is required if the type is https.<br>Need to configure the path of the `key` and `cert`|Object|{key: '',cert: ''}|
|host|The IP address of the service listener<br>for example `127.0.0.1` or `0.0.0.0`|String|"0.0.0.0"|
|port|Service listening the port|Number|80|

### micserver.Handle({options})
|Property|Description|Type|Default|
|:-|:-|:-|:-|
|method|Method of requesting service|String|'GET'|
|path|Path of requesting service|String|'/'|
|func|Service handler. This handler takes two parameters: <br>`request` and `response`.|Function||

### micserver.listen()

Start the service with the default or option configured in the set
