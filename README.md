#  Volvox - Self announcing services
volvox.js express and consul sample

![](https://avatars3.githubusercontent.com/u/16361502?v=3&s=200) 

**Server**
```js
import Volvox from 'volvox-core';
import vconsul from 'volvox-consul';
import vexpress from 'volvox-express';

import express from 'express'

async function main() {
    let server = express();

    server.get('/customers', (req, res) => {
       res.send({
            customerName: "Test customer",
            customerId: 666
        });
    });

    let volvox = new Volvox(vconsul(), vexpress());
    await volvox.bootstrap(server, "customers", "v1");
}

main();
```

**Call service instance from client**
```js
import Volvox from 'volvox-core';
import vconsul from 'volvox-consul';
import request from 'request-promise';

async function main() {
    let volvox = new Volvox(vconsul());
    await volvox.bootstrapClient();
    
    let instance = await volvox.findServiceInstanceAsync("customers");
    let body = await request(`http://${instance.address}:${instance.port}/customers`);
    console.log(body);
}

main();
```

_Stay tuned, more coming soon!_
