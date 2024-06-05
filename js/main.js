

var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescriptionInput = document.getElementById("productDescriptionInput");
var tableBody = document.getElementById("tableBody");
var searchInput = document.getElementById("searchInput");

var updateBtn =document.getElementById("updateBtn");
var addBtn =document.getElementById("addBtn");

var indexUpdate = 0;

var productList ;


if ( localStorage.getItem("myProduct") != null ) {

    productList = JSON.parse ( localStorage.getItem("myProduct") );
    displayData(productList);
}
else {
    productList = [];
}


// add
function addProduct(){

    if (validationName() == true) {
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            description : productDescriptionInput.value
        }
        
        productList.push( product );
    
        localStorage.setItem("myProduct" , JSON.stringify(productList));
    
        clearForm();
        displayData(productList);
        console.log(productList);
    }
    else{
        alert("Enter Valid Data")
    }
} 

// clear
function clearForm(){
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = "";
}


// display
function displayData() {
    var box = "";
    for(var i = 0 ; i < productList.length ; i++){
        box +=
        `
        <tr> 
            <td>${i+1}</td>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].category}</td>
            <td>${productList[i].description}</td>
            <td><button onclick="setData( ${i} )" class="btn btn-warning btn-sm">Update</button></td>
            <td><button onclick="deleteItem( ${i} )" class="btn btn-danger btn-sm">Delete</button></td>
        </tr>
        `
    }
    document.getElementById("tableBody").innerHTML = box;
}


// delete
function deleteItem(index) {
    productList.splice ( index , 1 );

    localStorage.setItem("myProduct" , JSON.stringify(productList));

    displayData();
}


// search
function search(){
    var term = searchInput.value;

    var box = "";
    for(var i = 0 ; i < productList.length ; i++){
    if( productList[i].name.toLowerCase().includes(term.toLowerCase())){
            box +=
            `
            <tr>
                <td>${i+1}</td>
                <td>${productList[i].name}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].category}</td>
                <td>${productList[i].description}</td>
                <td><button class="btn btn-warning btn-sm">Update</button></td>
                <td><button onclick=" deleteItem( ${i} ) " class="btn btn-danger btn-sm">Delete</button></td>
            </tr>
            `
        }
        document.getElementById("tableBody").innerHTML = box;
    }
}


// update 
function setData(index) {

    indexUpdate = index ;

    var setProduct = productList[index];

    productNameInput.value = setProduct.name ;
    productPriceInput.value = setProduct.price ;
    productCategoryInput.value = setProduct.category ;
    productDescriptionInput.value = setProduct.description ;

    updateBtn.classList.remove("d-none");
    addBtn.classList.add("d-none");
}

function updateProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description : productDescriptionInput.value
    }

    productList.splice( indexUpdate , 1 , product  );
    localStorage.setItem("myProduct" , JSON.stringify(productList));
    displayData();
    clearForm();

    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");

}



// validation 
function validationName() {
    var messageName = document.getElementById("messageName");
    var regexName = /^[A-z]{2,8}$/ 
    var text = productNameInput.value ;


    if (regexName.test(text) == true) {
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
        messageName.classList.add('d-none');

        return true;

    }
    else{
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
        messageName.classList.remove('d-none');

        return false;

    }
}