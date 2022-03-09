$("#newOrderLink").click(function () {
    loadItemCodes();setDate();setNewOrderId();
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

$('#btnAddToCart').click(function () {
    let item=$('#txtNewOrderItemCode').val();
    let unitPrice= $('#txtNewOrderItemUnitPrice').val();
    let oderQty = $('#txtNewOrderOrderedQty').val();
    let total=unitPrice*oderQty;
    let button=`<button  type="button" class="btn btn-danger btn-sm"  onclick="deleteRow(this);">Remove</button>`;
    let row = `<tr><td>${item}</td><td>${unitPrice}</td><td>${oderQty}</td><td>${total}</td><td>${button}</td></tr>`;
    $("#tblNewOrderCart").append(row);
});

function deleteRow(btn) {
    $(btn).closest("tr").remove();
}

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

function loadItemCodes() {
    $('#txtNewOrderItemCode').empty();
    $("#txtNewOrderItemCode").append(`<option disabled selected hidden>select item code</option>`);
    for (let i of itemDB) {
        let data = `<option >${i.getItemCode()}</option>`;
        $("#txtNewOrderItemCode").append(data);
    }
}
