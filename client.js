import "babel-polyfill";

import Volvox from 'volvox-core';
import vconsul from 'volvox-consul';

import Logger from './logger'
import request from 'request-promise';

async function init() {
    let volvox = new Volvox(vconsul());
    await volvox.bootstrapClient();
    
    let instance = await volvox.findServiceInstanceAsync("customers");
    let body = await request(`http://${instance.address}:${instance.port}/customers`);
    console.log(body);
}

init();
