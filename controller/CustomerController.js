$("#customersLink").click(function () {
    loadAllCustomers();
});
$('#btnSaveCustomer').click(function () {
        saveCustomer();
});

$('#btnUpdateCustomer').click(function () {
    let updateId = $("#txtCustomerId").val();
    updateCustomer(updateId);
});

$('#btnRemoveCustomer').click(function () {
    let removeId = $("#txtCustomerId").val();
    removeCustomer(removeId);
});

$('#btnClearCustomerFields').click(function () {
    clearAll();
});

$('#btnSearchCustomer').click(function () {
    let customer = searchCustomer($("#txtSearchCustomer").val());
    if (customer) {
        $("#txtCustomerId").val(customer.getCustomerId());
        $("#txtCustomerName").val(customer.getCustomerName());
        $("#txtCustomerAddress").val(customer.getCustomerAddress());
        $("#txtCustomerContact").val(customer.getCustomerContact());
        $("#txtCustomerId").attr('readonly', true);
    } else {
        clearAll();
        alert("No Such a Customer");
    }
});

function saveCustomer() {
    let customerID = $("#txtCustomerId").val();
    if (isCustomerExist(customerID)){
        alert("This customer id already exist..");
    }else {
        let response = confirm("Do you want to add this Customer..?");
        if (response) {
            let customerName = $("#txtCustomerName").val();
            let customerAddress = $("#txtCustomerAddress").val();
            let customerContact = $("#txtCustomerContact").val();

            let customerDto = new CustomerDto(customerID, customerName, customerAddress, customerContact);

            customerDB.push(customerDto);
            clearAll();
        }
    }
}

function searchCustomer(cId) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCustomerId() === cId) {
            return customerDB[i];
        }
    }
}

function removeCustomer(removeId) {
    let response = confirm("Do you want to remove this Customer..?");
    if (response) {
        for (let i = 0; i < customerDB.length; i++) {
            if (customerDB[i].getCustomerId() === removeId) {
                customerDB.splice(i, 1);
            }
        }
        loadAllCustomers();
        clearAll();
    }
}

function updateCustomer(updateId) {
    let response = confirm("Do you want to save changes..?");
    if (response) {
        let customerID = $("#txtCustomerId").val();
        let customerName = $("#txtCustomerName").val();
        let customerAddress = $("#txtCustomerAddress").val();
        let customerContact = $("#txtCustomerContact").val();

        let customerDto = new CustomerDto(customerID, customerName, customerAddress, customerContact);

        for (let i = 0; i < customerDB.length; i++) {
            if (customerDB[i].getCustomerId()===updateId) {
                customerDB[i]=customerDto;
            }
        }
        loadAllCustomers();
        clearAll();
    }
}

function isCustomerExist(id) {
    for (let i = 0; i < customerDB.length; i++) {
        return customerDB[i].getCustomerId() === id;
    }
}

function loadAllCustomers() {
    $("#customerTable").empty();
    for (let i of customerDB) {
        let row = `<tr><td>${i.getCustomerId()}</td><td>${i.getCustomerName()}</td><td>${i.getCustomerAddress()}</td><td>${i.getCustomerContact()}</td></tr>`;
        $("#customerTable").append(row);
    }

    $("#customerTable>tr").click(function () {
        let id = $(this).closest("tr").find("td:eq(0)").text();
        let name = $(this).closest("tr").find("td:eq(1)").text();
        let address = $(this).closest("tr").find("td:eq(2)").text();
        let contact = $(this).closest("tr").find("td:eq(3)").text();

        $('#txtCustomerId').val(id);
        $('#txtCustomerName').val(name);
        $('#txtCustomerAddress').val(address);
        $('#txtCustomerContact').val(contact);
        $("#txtCustomerId").attr('readonly', true);
    });
}

function clearAll() {
    $('#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact,#txtSearchCustomer').val("");
    $("#txtCustomerId").attr('readonly', false);
    loadAllCustomers();
}