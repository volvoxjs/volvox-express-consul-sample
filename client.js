import "babel-polyfill";

import {Volvox} from 'volvox-core';
import vconsul from 'volvox-consul';

import Logger from './logger'
import request from 'request-promise';

async function init() {
    try {
        let clusterProvider = new ConsulProvider(new ConsulRestClient(), new Logger(), new RandomProvider());

        let cluster = new Cluster(clusterProvider);

        await cluster.bootstrapClient();
        let instance = await cluster.findServiceInstanceAsync("customers");

        let body = await request(`http://${instance.address}:${instance.port}/customers`);
        console.log(body);
    } catch (error) {
        console.error(error);
    }
}

init();
