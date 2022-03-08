$(document).ready(function () {
    setNewOrderId();
    setDate();
    loadItemCodes();
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
    if (isCustomerExist(customerID)) {
        alert("This customer id already exist..");
    } else {
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
    } else {
        let last = (orderDB[orderDB.length - 1].getCustomerId().slice(5));
        let newValue = "#Od-0" + (parseInt(last) + 1);
        $("#txtNewOrderId").val(newValue);
    }
}

function setDate() {
    let date = new Date().toLocaleDateString("fr-FR");
    $('#txtNewOrderDate').val(date);
}

$('#txtNewOrderItemCode').change(function () {
    let itemCode = $(this).val();
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getItemCode() === itemCode) {
            $('#txtNewOrderItemDescription').val(itemDB[i].getDescription());
            $('#txtNewOrderItemUnitPrice').val(itemDB[i].getUnitPrice());
            $('#txtNewOrderItemQtyOnH').val(itemDB[i].getQtyOnHand());
        }
    }
});
$('#txtNewOrderItemCode').click(function () {
    if(itemDB.length===0){
        alert("No items. Please enter items");
    }
});

function loadItemCodes() {
    $('#txtNewOrderItemCode').empty();
    $("#txtNewOrderItemCode").append(`<option hidden>Select item</option>`);
    for (let i of itemDB) {
        let data = `<option>${i.getItemCode()}</option>`;
        $("#txtNewOrderItemCode").append(data);
    }
}
