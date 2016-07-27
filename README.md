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
    try {
        let server = express();

        server.get('/customers', (req, res) => {
            res.send({
                customerName: "Test customer",
                customerId: 666
            });
        });

        let volvox = new Volvox(vconsul(), vexpress());
        await volvox.bootstrap(server, "customers", "v1");
    } catch (error) {
        console.error(error);
    }
}

main();
```

**Call service instance from client**
```js
//TODO
```
