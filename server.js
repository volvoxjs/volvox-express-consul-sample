import "babel-polyfill";
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
