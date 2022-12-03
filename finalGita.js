var products = [
  {
    productName: "HL Road Frame - Black, 58",
    productNumber: "FR-R92B-58",
    color: "Black",
    listPrice: 70.0,
    modifiedDate: "2021-11-11",
  },

  {
    productName: "HL Road Frame - Silver, 59",
    productNumber: "FR-R92B-59",
    color: "Silver",
    listPrice: 2323.0,
    modifiedDate: "2021-7-7",
  },

  {
    productName: "HL Road Frame - Black, 60",
    productNumber: "FR-R92B-60",
    color: "Black",
    listPrice: 1111.0,
    modifiedDate: "2021-11-31",
  },

  {
    productName: "HL Road Frame - Red, 61",
    productNumber: "FR-R92B-61",
    color: "Red",
    listPrice: 600.0,
    modifiedDate: "2021-7-21",
  },

  {
    productName: "HL Road Frame - Red, 62",
    productNumber: "FR-R92B-62",
    color: "Red",
    listPrice: 700.0,
    modifiedDate: "2021-1-11",
  },


];
function drawHeader(){
  let tr = $("<tr></tr>");

  let th = $("<th></th>").text("Product Name")
  tr.append(th);

  th = $("<th></th>").text("Product Number")
  tr.append(th);

  th = $("<th></th>").text("Product Color")
  tr.append(th);

  th = $("<th></th>").text("Price")
  tr.append(th);

  th = $("<th></th>").text("Date")
  tr.append(th);

  th = $("<th></th>").text("Actions")
  tr.append(th);

  $("#product").append(tr);
}

function drawRowsFromArray(product, tr)
{
  let td = $("<td></td>").text(product.productName);
    tr.append(td);

    td = $("<td></td>").text(product.productNumber);
    tr.append(td);

    td = $("<td></td>").text(product.color);
    tr.append(td);

    td = $("<td></td>").text(product.listPrice);
    tr.append(td);

    td = $("<td></td>").text(product.modifiedDate);
    tr.append(td);

    addButtons(td, tr);
}

function showProducts() {
  $("#product tr").remove(); 
  drawHeader();
  for (let product of products) {
    let tr = $("<tr></tr>");
    drawRowsFromArray(product, tr);
    product.tr = tr;
    $("#product").append(tr);
  }
}



showProducts();

function addButtons(td, tr) {
  td = $("<td></td>").html(
    `<button type="button" onclick='editProduct(this)' class="btn btn-secondary" data-toggle="modal" data-target="#editModal">Edit</button> <button onclick='deleteRow(this);' class="btn btn-danger">Delete</button>`
  );
  tr.append(td);
}

/*product filter*/
function filterProduct() {
  let pName = $("#pName").val().toLowerCase();
  let minPrice = $("#minPrice").val();
  let maxPrice = $("#maxPrice").val();

  for (let product of products) {
    let toDisplay =
      (pName.trim() == "" ||
        product.productName.toLowerCase().indexOf(pName) >= 0) &&
      product.listPrice >= minPrice &&
      maxPrice >= product.listPrice;

    let tr = product.tr;

    if (toDisplay) {
      tr.removeClass("fadeOut");
      tr.fadeIn();
    } else {
      tr.addClass("fadeOut");
      tr.fadeOut();
    }
  }
}

$("#btnapply").on("click", filterProduct);

/*show-hide*/
let showFilter = document.getElementById("showFilter");

$(showFilter).click(function () {
  $(this).text($(this).text() == "Show Filter" ? "Hide Filter" : "Show Filter");
});

/*delete product*/
function deleteRow(btn) {
  var cnfrmMessage = confirm(
    "Are you sure want to Delete selected data? You cannot undo this action."
  );
  if (cnfrmMessage == true) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);

    products = products.filter(
      (item) => item.id !== $(row).children()[0].innerText
    );
    toastr.success("Data Deleted Successfuly");
  } else {
    toastr.error("Delete Canceled!");
  }
}

//delete product end

//edit product







function editProduct(btn) {
  var row = btn.parentNode.parentNode;

  var index = $("#product tr").index(row);

  console.log(products[index - 1]);

  document.getElementById("editProductName").value =products[index - 1].productName;
  document.getElementById("editProductNumber").value =products[index - 1].productNumber;
  document.getElementById("editListPrice").value = products[index - 1].listPrice;
  document.getElementById("editProductColor").value = products[index - 1].color;
  // formattedModifiedDate = new Date(products[index - 1].modifiedDate);
  // $("modifiedDate").datepicker.val("setDate", formattedModifiedDate);
  document.getElementById("editHiddenIndex").value = index - 1;
  document.getElementById('editModifiedDate').valueAsDate = new Date();
} 

//edit product end

$("#btnSubmit").click(function (e) {

  const productName = document.getElementById("productName").value;
  const productNumber = document.getElementById("productNumber").value;
  const listPrice = document.getElementById("listPrice").value;


  const product = {
    productName: $("#productName").val(),
    productNumber: $("#productNumber").val(),
    color: $("#productColor").val(),
    listPrice: $("#listPrice").val(),
    modifiedDate: $("#modifiedDate").val(),
  };

  let tr = $("<tr></tr>").addClass("productData");

  drawRowsFromArray(product, tr);

  product.tr = tr;

  if (productName == "") {
    toastr.error('The Name field is required');
    return false;
} else if (productNumber == "") {
  toastr.error('The ProductNumber field is required');
    return false;
} else if (listPrice < 0) {
  toastr.error('the field ListPrice must be between 0.1 and 10000');
    return false;
} else if (listPrice > 10000) {
  toastr.error('the field ListPrice must be between 0.1 and 10000');
    return false;
} else if (listPrice == "") {
  toastr.error('the field ListPrice must be between 0.1 and 10000');
    return false;
}
else {

  products.push(product);

  $("#product").append(tr);
  $('#addModal').modal('hide'); 
}

  $(this).closest("form").trigger("reset"); //clears the form
});

function saveProduct(){
  validateForm();
  const productName = document.getElementById("editProductName").value;
  const productNumber = document.getElementById("editProductNumber").value;
  const listPrice = document.getElementById("editListPrice").value;
  const color = document.getElementById("editProductColor").value;
  const modifiedDate = document.getElementById("editModifiedDate").value;
  const index = document.getElementById("editHiddenIndex").value;

  //// format date
  var options = {  year: 'numeric', month: 'long', day: 'numeric' };

  let date = new Date(modifiedDate);

  
  const formattedModifiedDate = date.toLocaleDateString("en-US", options)

  /////format date end
  const product = {
    productName: productName,
    productNumber: productNumber,
    color: color,
    listPrice: listPrice,
    modifiedDate: formattedModifiedDate,
  };

  products[index] = product;
  console.log(product);
  showProducts();
}


// Example starter JavaScript for disabling form submissions if there are invalid fields
function validateForm(){
  'use strict';


  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach((form) => {
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
};

