var iProducts = []

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
            iProducts.push(data[d])
            let dataStr = `<tr>
                <td> <img src='delete-icon.png' width='5em' onclick='deleteProduct("${d}")'/> </td>
                <td>${data[d].quantity}</td>
                <td>${data[d].name} </td>
                <td>${data[d].ppu}</td>
                <td>${data[d].discount}</td>
            </tr>`
            $("#data-product tr:last").after(dataStr)    
        }
        console.log(iProducts)
        loadData();
    });
    
});

function addProduct() {

    let productObj = {
        name: $('#products').val(),
        quantity: $('#qty').val(),
        ppu: $('#ppu').val(),
        discount: $('#discount').val()
    }

    $('#data-product').html("")

    iProducts.push(productObj) 
    console.log(iProducts)

    let index = iProducts.length - 1
    loadData()
}

function deleteProduct(index){
    console.log("DELETE", index)
    delete iProducts[index]

    $('#data-product').html("")
    loadData()

}

//For ClearProduct
function clearProduct(){
    console.log("CLEAR ALL ITEMS")
    for (let i in iProducts){
        delete iProducts[i]
    }
    $('#productBody').html("")
    loadData()
}

function loadData(){
    let allRows = ""
    let gross = 0
    let totDis = 0

    for (let p in iProducts) {

        let cellDelete =  `<td> <img src='delete-icon.png' width='25em' onclick='deleteProduct("${p}")' />` + "" + "</td>"
        let cellName = "<td>"  + iProducts[p].name + "</td>"
        let cellQuantity = "<td>" + iProducts[p].quantity + "</td>"
        let cellPPU = "<td>" + iProducts[p].ppu + "</td>"
        let cellDiscount =  "<td>" + iProducts[p].discount + "</td>"
        let total = (iProducts[p].ppu * iProducts[p].quantity) - iProducts[p].discount
        
        gross += total

        let dis = Number(iProducts[p].discount)
        totDis += dis
        

        let cellTotal = `<td class="text-end">` + total.toFixed(2) + "</td>"
        let row = `<tr>${cellDelete}${cellQuantity}${cellName}${cellPPU}${cellDiscount}${cellTotal}</tr>`
        allRows += row
    }

    $('#data-product').html(allRows)

    $("#gross").html(gross.toFixed(2))
    $("#totDis").html(totDis.toFixed(2))

    let vat = gross * 0.07
    let net = gross + vat
    $("#vat").html(vat.toFixed(2))
    $("#net").html(net.toFixed(2))
}