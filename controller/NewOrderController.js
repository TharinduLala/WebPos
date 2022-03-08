$("#newOrderLink").click(function () {
    setNewOrderId();
    setDate();
});

$("#btnCustomerSave").click(function () {
   customerSave();
});

$('#btnSearchCus').click(function () {
    let customer = searchCustomer($("#txtNewOrdercusId").val());
    if (customer) {
        $("#txtNewOrdercusId").val(customer.getCustomerId());
        $("#txtNewOrdercusName").val(customer.getCustomerName());
        $("#txtNewOrdercusAddress").val(customer.getCustomerAddress());
        $("#txtNewOrdercusContact").val(customer.getCustomerContact());
    } else {
        alert("No Such a Customer");
    }
});

function customerSave() {
    let customerID = $("#txtCusid").val();
    if (isCustomerExist(customerID)){
        alert("This customer id already exist..");
    }else {
        let response = confirm("Do you want to add this Customer..?");
        if (response) {
            let customerName = $("#txtCusname").val();
            let customerAddress = $("#txtCusaddress").val();
            let customerContact = $("#txtCusContact").val();

            let customerDto = new CustomerDto(customerID, customerName, customerAddress, customerContact);

            customerDB.push(customerDto);
        }
    }
}

function setNewOrderId() {
    if (orderDB.length === 0) {
        $("#txtNewOrderId").val("#Od-01");
    }else {
        let last = (orderDB[orderDB.length-1].getCustomerId().slice(5));
        let newValue = "#Od-0" + (parseInt(last) + 1);
        $("#txtNewOrderId").val(newValue);
    }
}
function setDate() {
    let date = new Date().toLocaleDateString("fr-FR");
    $('#txtNewOrderDate').val(date);
}
