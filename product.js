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
        quantity: $('#qty').val(),
        name: $('#products').val(),
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

    //delete iProducts[index] 

    iProducts.splice(index, 1)  

    $('#data-product').html("")
    console.log(iProducts)
    loadData()

}

//For ClearProduct
function clearProduct(){
    console.log("CLEAR ALL ITEMS")
    /*for (let i in iProducts){
        delete iProducts[i]
    }*/

    iProducts.splice(0, iProducts.length)
    
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
        let cellQuantity = "<td>" + Number(iProducts[p].quantity) + "</td>"
        let cellPPU = "<td>" + Number(iProducts[p].ppu).toFixed(2) + "</td>"
        let cellDiscount =  "<td>" + Number(iProducts[p].discount).toFixed(2) + "</td>"
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

    checkRedundant()
}

function checkRedundant(){
    deleteOrder = []
    //Bootleg Redundant Product Checking

    for (let i = iProducts.length - 1; i >= 0 ; i--) {
        for (let p in iProducts){

            if (iProducts[p] != null){
                let compareResult = iProducts[i].name.localeCompare(iProducts[p].name)
                
                if (compareResult == 0 && iProducts[i].ppu == iProducts[p].ppu && i != p){

                    iProducts[p].quantity = Number(iProducts[p].quantity) + Number(iProducts[i].quantity)

                    console.log(iProducts[i].name + " and " + iProducts[p].name + " is " +compareResult)
                    console.log(iProducts[i].ppu + " == " + iProducts[p].ppu)
                    console.log("Redundancy Detected!")

                    iProducts[i].name = iProducts[i].name + " Checked"  // not repeat the items that is already checked.
                    
                    deleteOrder.push(i)
                    console.log(deleteOrder)
                } 
            }   
        }
        
    }

    for (let d in deleteOrder){
        console.log(deleteOrder[d])
        deleteProduct(deleteOrder[d])
    }
    
}

