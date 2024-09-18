
const paymentOrder = ()=>{
    const instance = new Razorpay({ key_id: 'YOUR_KEY_ID', key_secret: 'YOUR_SECRET' })

instance.orders.create({
amount: 50000,
currency: "INR",
receipt: "receipt#1",
notes: {
    key1: "value3",
    key2: "value2"
}
})
}

module.exports = paymentOrder;
