import "babel-polyfill";

import {Cluster, GuidGenerator, FrameworkProvider, Configuration,RandomProvider} from 'microphone-core';
import {ConsulProvider, ConsulRestClient} from 'microphone-consul';

import Logger from './logger'

async function init() {
    try {
        let logger = new Logger();
        let randomProvider = new RandomProvider();
        let clusterProvider = new ConsulProvider(new ConsulRestClient(), logger, randomProvider);

        let cluster = new Cluster(clusterProvider);

        await cluster.bootstrapClient();
        let resp = await cluster.findServiceInstanceAsync("customers");
        console.log(resp);
    } catch (error) {
        console.error(error);
    }
}

init();
