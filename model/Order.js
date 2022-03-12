function OrderDto(id,date,cusId,netTotal,discount,subTotal,orderDetails) {
    var __orderId = id;
    var __orderDate = date;
    var __customerId = cusId;
    var __netTotal = netTotal;
    var __discount = discount;
    var __subTotal = subTotal;
    var __orderDetails = [...orderDetails];

    this.getOrderId = function () {
        return __orderId;
    }
    this.setOrderId = function (i) {
        __orderId=i;
    }
    this.getOrderDate = function () {
        return __orderDate;
    }
    this.setOrderDate = function (d) {
        __orderDate=d;
    }
    this.getOrderCustomerId = function () {
        return __customerId;
    }
    this.setOrderCustomerId = function (c) {
        __customerId=c;
    }
    this.getNetTotal = function () {
        return __netTotal;
    }
    this.setNetTotal = function (n) {
        __netTotal=n;
    }
    this.getSubTotal = function () {
        return __subTotal;
    }
    this.setSubTotal = function (s) {
        __subTotal=s;
    }
    this.getDiscount = function () {
        return __discount;
    }
    this.setDiscount = function (dis) {
        __discount=dis;
    }
    this.getOrderDetails = function () {
        return __orderDetails;
    }
    this.setOrderDetails = function (details) {
        __orderDetails=[...details];
    }
}