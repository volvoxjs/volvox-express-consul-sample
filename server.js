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
