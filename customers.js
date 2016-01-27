export default class CustomersController {
    index(req, res) {
        res.send({
            customerName: "Test customer",
            customerId: 666
        });
    }
}