var customers = []

$(document).ready(function () {
    console.log("ready!");
    //load data
    $.ajax({
        url: "data.json"
    }).done(function (data) {
        //$(this).addClass("done");
        console.log("DONE", data)
        for(let d in data){
            //save the data record into our global variable
            customers.push(data[d])
            let dataStr = `<tr>
                <td> <img src='delete-icon.png' width='25em' onclick='deleteCustomer("${d}")'/> ${data[d].name} </td>
                <td>${data[d].email}</td>
                <td>${data[d].phone}</td>
            </tr>`
            $("#data-customer tr:last").after(dataStr)    
        }
        console.log(customers)
        loadData();
    });
    
});

function addCustomer() {
    /*let customerObj = `<tr>
            <td>${$('#name').val()}</td>
            <td>${$('#email').val()}</td>
            <td>${$('#phone').val()}</td>
        </tr>` */
    //$("#data-customer tr:last").after(customerObj)

    let customerObj = {
        name: $('#name').val(),
        email: $('#email').val(),
        phone: $('#phone').val()
    }

    $('#data-customer').html("")

    customers.push(customerObj) 
    console.log(customers)

    let index = customers.length - 1
    loadData()
}

function deleteCustomer(index){
    console.log("DELETE", index)
    
    //$('#customers(index)').remove()
    //loadData()
    delete customers[index]

    $('#data-customer').html("")
    loadData()

}

function loadData(){
    let allRows = ""
    for (let c in customers) {
        let cellName = `<td class='name-header'><img src='delete-icon.png' width='30em' onclick='deleteCustomer("${c}")'/>`  + customers[c].name + "</td>"
        let cellEmail = "<td>" + customers[c].email + "</td>"
        let cellPhone = "<td>" + customers[c].phone  + "</td>"
        let row = `<tr>${cellName}${cellEmail}${cellPhone}</tr>`
        allRows += row
    }
    $('#data-customer').html(allRows)

}