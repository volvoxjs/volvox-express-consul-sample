import "babel-polyfill";

import {Cluster, GuidGenerator, FrameworkProvider, Configuration} from 'microphone-core';
import ConsulProvider from 'microphone-consul';
import {ExpressProvider} from 'microphone-express';

import express from 'express'
import CustomersController from './customers'
import Logger from './logger'

async function main() {
    try {
        let server = express();
        let customers = new CustomersController();
        server.get('/customers', customers.index);

        let logger = new Logger();
        let configuration = new Configuration();

        let clusterProvider = new ConsulProvider(null, logger);
        let frameworkProvider = new ExpressProvider(configuration, logger);
        let guidGenerator = new GuidGenerator();
        let cluster = new Cluster(clusterProvider, frameworkProvider, guidGenerator);

        await cluster.bootstrap(server, "customers", "v1");
        console.log("STARTED");
    } catch (error) {
        console.error(error);
    }
}

main();
