# microphone - Self announcing services
microphone.js express and consul sample

![](https://avatars3.githubusercontent.com/u/16361502?v=3&s=200) 

**Server**
```js
import "babel-polyfill";

import {Cluster, GuidGenerator, FrameworkProvider, Configuration,RandomProvider} from 'microphone-core';
import {ConsulProvider, ConsulRestClient} from 'microphone-consul';
import ExpressProvider from 'microphone-express';

import express from 'express'
import CustomersController from './customers'
import Logger from './logger'

async function init() {
    try {
        let server = express();
        let customers = new CustomersController();
        server.get('/customers', customers.index);

        let logger = new Logger();
        let clusterProvider = new ConsulProvider(new ConsulRestClient(), logger);
        let frameworkProvider = new ExpressProvider(new Configuration(), logger);
        let cluster = new Cluster(clusterProvider, frameworkProvider, new GuidGenerator(), new RandomProvider());

        await cluster.bootstrap(server, "customers", "v1");
        console.log("STARTED");
    } catch (error) {
        console.error(error);
    }
}

init();
```


**Client**
```js
import "babel-polyfill";

import {Cluster, GuidGenerator, FrameworkProvider, Configuration,RandomProvider} from 'microphone-core';
import {ConsulProvider, ConsulRestClient} from 'microphone-consul';

import Logger from './logger'
import request from 'request';

async function init() {
    try {
        let clusterProvider = new ConsulProvider(new ConsulRestClient(), new Logger(), new RandomProvider());

        let cluster = new Cluster(clusterProvider);

        await cluster.bootstrapClient();
        let instance = await cluster.findServiceInstanceAsync("customers");

        request({type: 'GET', url: `http://${instance.address}:${instance.port}/customers`}, (error, response, body)=> {
            console.log(body);
        });

    } catch (error) {
        console.error(error);
    }
}

init();
```