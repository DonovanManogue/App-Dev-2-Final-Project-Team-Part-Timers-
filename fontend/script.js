

var strBaseURL = 'http://localhost:8000';
$(document).ready(function() {

// Show the sign up div when the "I Don't Have an Account" button is clicked
$("#btnShowSignUp").on('click', function() {
  $("#divSignUp").show(1000);
  $("#divLogin").hide(500);
});
  // Show the sign up div when the "Sign Up" button is clicked
$("#btnShowLogin").on('click', function() {
  $("#divLogin").show(1000);
  $("#divSignUp").hide(1000);
});
$("#btnSignUpGoBack").on('click', function() {
  $("#divSignUp").show(500);
  $("#divSignUp2").hide(500);
});



$("#linkLogout").on('click', function() {
  $("#divLogin").show(1000);
  $("#divSignUp").hide(1000);
  $("#navMain").hide(1000);
  $("#divHome").hide(1000);
  $("#divWorkers").hide(1000);
  $("#divFarms").hide(1000);
  $("#divProducts").hide(1000);
  $("#divTasks").hide(1000);
  $("#divReports").hide(1000);
  $("#divInventory").hide(1000);
  $("#divHarvests").hide(1000);
  $("#divFirstBackground").show(1000);
  $("#divSlogan").show(1000);
  $("#divSlogan2").show(1000);
});

$('#linkHome').on('click', function() {
  $("#divHome").show(500);
  $("#divFarms").hide(500);
  $("#divProducts").hide(500);
  $("#divTasks").hide(500);
  $("#divReports").hide(500);
  $("#divWorkers").hide(500);
  $("#divInventory").hide(500);
  $("#divHarvests").hide(500);
});

$('#linkWorkers').on('click', function() {
  $("#divHome").hide(500);
  $("#divFarms").hide(500);
  $("#divProducts").hide(500);
  $("#divTasks").hide(500);
  $("#divReports").hide(500);
  $("#divWorkers").show(500);
  $("#divInventory").hide(500);
  $("#divHarvests").hide(500);
});


$('#linkFarms').on('click', function() {
    $("#divHome").hide(500);
    $("#divFarms").show(500);
    $("#divProducts").hide(500);
    $("#divTasks").hide(500);
    $("#divReports").hide(500);
    $("#divWorkers").hide(500);
    $("#divInventory").hide(500);
    $("#divHarvests").hide(500);
    });

$('#linkProducts').on('click', function() {
  $("#divHome").hide(500);
  $("#divFarms").hide(500);
  $("#divProducts").show(500);
  $("#divTasks").hide(500);
  $("#divReports").hide(500);
  $("#divWorkers").hide(500);
  $("#divInventory").hide(500);
  $("#divHarvests").hide(500);
});

$('#linkTasks').on('click', function() {
  $("#divHome").hide(500);
  $("#divFarms").hide(500);
  $("#divProducts").hide(500);
  $("#divTasks").show(500);
  $("#divReports").hide(500);
  $("#divWorkers").hide(500);
  $("#divInventory").hide(500);
  $("#divHarvests").hide(500);
});

$('#linkReports').on('click', function() {
  $("#divHome").hide(500);
  $("#divFarms").hide(500);
  $("#divProducts").hide(500);
  $("#divTasks").hide(500);
  $("#divReports").show(500);
  $("#divWorkers").hide(500);
  $("#divInventory").hide(500);
  $("#divHarvests").hide(500);
});

$('#linkInventory').on('click', function() {
  $("#divHome").hide(500);
  $("#divFarms").hide(500);
  $("#divProducts").hide(500);
  $("#divTasks").hide(500);
  $("#divReports").hide(500);
  $("#divWorkers").hide(500);
  $("#divInventory").show(500);
  $("#divHarvests").hide(500);
});
$("#linkHarvests").on('click', function() {
  $("#divHome").hide(500);
  $("#divFarms").hide(500);
  $("#divProducts").hide(500);
  $("#divTasks").hide(500);
  $("#divReports").hide(500);
  $("#divWorkers").hide(500);
  $("#divInventory").hide(500);
  $("#divHarvests").show(500);
});
$('#btnSignUpNext').on('click', function(){
  var hasError = false;
  var errorMessage = '';
  
  if($('#txtFirstName').val() == ''){
    hasError = true;
    errorMessage += 'Please enter your first name.<br>';
  }
  if($('#txtLastName').val() == ''){
    hasError = true;
    errorMessage += 'Please enter your last name.<br>';
  }
  if($('#txtEmail').val() == ''){
    hasError = true;
    errorMessage += 'Please enter your email.<br>';
  }
  if($('#txtPassword').val() == ''){
    hasError = true;
    errorMessage += 'Please enter your password.<br>';
  }
  if($('#txtPhoneNumber').val() == ''){
    hasError = true;
    errorMessage += 'Please enter your phone number.<br>';
  }

  if(hasError){
    swal.fire({
      text: 'Please correct the following errors:',
      html: errorMessage,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  } else { 
    // send POST request to server
          $('#divSignUp').hide(500);{
          $('#divSignUp2').show(500);
  }
}
});
$('#btnSignUp').on('click', function(){
  var blnError = false;
  var strHTML = '';
  if($('#txtFarmName').val() == ''){
    blnError = true;
    strHTML += 'Please enter your farm name.<br>';
  }
  if($('#txtStreetAddress').val() == ''){
    blnError = true;
    strHTML += 'Please enter your street address.<br>';
  }
  if($('#txtCity').val() == ''){
    blnError = true;
    strHTML += 'Please enter your city.<br>';
  }
  if($('#txtState').val() == ''){
    blnError = true;
    strHTML += 'Please enter your state.<br>';
  }
  if($('#txtZip').val() == ''){
    blnError = true;
    strHTML += 'Please enter your zip code.<br>';
  }

  if(blnError == true){
    swal.fire({
      text: 'Please correct the following errors:',
      html: strHTML,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  } else {
    // send ADD ON THE USER TABLE IN THE DATABASE ON MY LAPTOP A dateCreated TABLE
    $.ajax({
      url: strBaseURL+'/farms',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        streetaddress1:$('#txtStreetAddress').val(),
        streetAddress2:$('#txtStreetAddress2').val(),
        city:$('#txtCity').val(),
        state:$('#txtState').val(),
        zip:$('#txtZip').val(),
        farmname:$('#txtFarmName').val(),
        firstname:$('#txtFirstName').val(),
        lastname:$('#txtLastName').val(),
        email:$('#txtEmail').val(),
        phonenumber:$('#txtPhoneNumber').val(),
        password:$('#txtPassword').val()
      }),
      success: function(response) {
        console.log(response);
        swal.fire({
          title: 'Success',
          text: 'Sign Up Success.',
          icon: 'success',
          confirmButtonText: 'OK'})
          .then(function() {
        $('#divSignUp2').hide(500);
        $('#divLogin').show(500);
          });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error(errorThrown);
        swal.fire({
          title: 'Error',
          text: 'Sign Up Error.',
          icon: 'error',
          confirmButtonText: 'OK'})
      }
    });
  }
});


  $("#btnLogin").on('click', function() {
    var blnError = false;
    var strHTML = '';
    if($('#txtLoginEmail').val() == ''){
      blnError = true;
      strHTML += 'Please an Email.<br>';
    }
    if($('#txtLoginPassword').val() == ''){
      blnError = true;
      strHTML += 'Please enter a Password.<br>';
    }
    if(blnError == true){
      swal.fire({
        text: 'Please correct the following errors:',
        html: strHTML,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }else{
      
    $.ajax({
      url: strBaseURL+'/login',
      type: 'POST',
      data: { email: $('#txtLoginEmail').val(), password: $('#txtLoginPassword').val() },
      success: function(response) {
        sessionStorage.setItem('session',response.SessionID);
        swal.fire({
          title: 'Success',
          text: 'Login Success.',
          icon: 'success',
          confirmButtonText: 'OK'})
          
    


      // Store the session in local storage
      

      $("#divLogin").hide(1000);
      $("#divSignUp").hide(1000);
  
      // show the main navigation and home divs
      $("#navMain").show(1000);
      $("#divHome").show(1000);
  
      // hide or show any other divs you need to
      $("#divFirstBackground").hide(1000);
      $("#divSecondBackground").show(1000);
      $("#divSlogan").hide(1000);
      $("#divSlogan2").hide(1000);
    },
    error: function(error) {
      console.error('Error:', error);
      // Handle login errors here
      swal.fire({
        text: 'Please enter the correct email and password:',
        icon: 'error',
        confirmButtonText: 'OK'})
    }
  });
}
});



function loadWorkers() {
  $.ajax({
    url: strBaseURL + '/position',
    method: 'GET',
    data: {
      sessionid: sessionStorage.getItem('session')
    },
    success: function(data) {
      console.log('Workers loaded:', data);
      // Clear the existing table rows
      $('#workersTable tbody').empty();
      $.ajax({
        url: strBaseURL+'/workers/count',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
          var numWorkers = data.numWorkers;
          var totalPay = data.totalPay;

      // Display the number of workers and total pay in the "#numWorkersTable" table
      var newRow = $('<tr>').append(
        $('<td>').text(numWorkers),
        $('<td>').text('$'+totalPay.toFixed(2))
      );
      $('#numWorkersTable tbody').empty().append(newRow);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error(errorThrown);
        }
      })
      // Append the new worker records to the table
      $.each(data, function(index, worker) {
        $('#workersTable tbody').append('<tr><td>'+ worker.EntryID +'</td><td>' + worker.User + '</td><td>' + worker.Title +
        '</td><td>' + worker.PayRate + '</td><td>' + worker.EffectiveDateTime + '</td><td>' + worker.FarmID + '</td><td><button type="button" class="btn btn-success editButton">Edit</button> <button type="button" class="btn btn-danger deleteButton">Delete</button></td></tr>');
      });
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.error(errorThrown);
    }
  })
}


$(document).ready(function() {

loadWorkers();

  $('#addWorkerForm').submit(function(event) {
    event.preventDefault();
    var txtUser = $('#txtUser').val();
    var txtTitle = $('#txtTitle').val();
    var txtPayRate = $('#txtPayRate').val();
      // Generate and return a UUID v4 string


      $.ajax({  
        url: strBaseURL + '/position',
        method: 'POST',
        data: {
          user: $('#txtUser').val(),
          title: $('#txtTitle').val(),
          payrate: $('#txtPayRate').val(),
          effectivedate: $('#workerDate').val(),
          sessionid: sessionStorage.getItem('session')
        },
        success: function(response) {
          console.log('Worker added:', response);
          loadWorkers();
          
          // Append a new row to the tbody of #workersTable
          var newRow = $('<tr>').append(
            $('<td>').text(response.EntryID),
            $('<td>').text(txtUser),
            $('<td>').text(txtTitle),
            $('<td>').text(txtPayRate),
            $('<td>').text(response.FarmID),
            $('<td>').html('<button type="button" class="btn btn-success editButton">Edit</button> <button type="button" class="btn btn-danger deleteButton">Delete</button>')
          );
          $('#workersTable tbody').append(newRow);
          
          // Hide the modal and reset the form
          $('#addWorkerModal').modal('hide');
          $('#addWorkerForm')[0].reset();
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error(errorThrown);
        }
      });
    });      
    
  

  /// Open edit modal when edit button is clicked
  $('#workersTable').on('click', '.editButton', function() {
    var currentRow = $(this).closest('tr');
    console.log(currentRow);
    txtEntryID = currentRow.find('td:first').text();
    txtUser = currentRow.find('td:eq(1)').text();
    var txtTitle = currentRow.find('td:eq(2)').text();
    var txtPayRate = currentRow.find('td:eq(3)').text();
    var workerDate = currentRow.find('td:eq(4)').text();
    console.log("txtEntryID:" + txtEntryID);
    console.log("txtUser:" + txtUser);
    console.log("txtTitle:" + txtTitle);
    console.log("txtPayRate:" + txtPayRate);
    console.log("workerDate:" + workerDate);


  $('#editWorkerModal #edittxtTitle').val(txtTitle);
  $('#editWorkerModal #edittxtPayRate').val(txtPayRate);
  $('#editWorkerModal #editWorkerDate').val(workerDate);
  $('#editWorkerModal #editIndex').val(currentRow.index());
  $('#editWorkerModal').modal('show');
});

$('#editWorkerModal #editWorkerForm').submit(function(event) {
  event.preventDefault();
  var txtTitle = $('#editWorkerModal #edittxtTitle').val();
  var txtPayRate = $('#editWorkerModal #edittxtPayRate').val();
  var workerDate = $('#editWorkerModal #editWorkerDate').val();
  var currentRow = $('#workersTable tbody tr:eq(' + $('#editWorkerModal #editIndex').val() + ')');
  currentRow.find('td:first').text(txtEntryID);
  currentRow.find('td:eq(1)').text(txtUser);
  currentRow.find('td:eq(2)').text(txtTitle);
  currentRow.find('td:eq(3)').text(txtPayRate);
  currentRow.find('td:eq(4)').text(workerDate);
  $('#editWorkerModal').modal('hide');

  // Send PUT request to server to update worker position

  $.ajax({
    url: strBaseURL+"/position",
    method: "PUT",
    data: {
      user: txtUser,
      title: txtTitle,
      payrate: txtPayRate,
      entryid: txtEntryID,
      sessionid: sessionStorage.getItem('session')
    },
    success: function(response) {
      console.log(response);
      loadWorkers();
    },
    error: function(xhr, statusText, error) {
      console.log(error);
      // handle error
    }
  });
});
 let txtEntryID;
 // Open delete modal when delete button is clicked
$('#workersTable').on('click', '.deleteButton', function() {
  var currentRow = $(this).closest('tr');
  $('#deleteWorkerModal #deleteIndex').val(currentRow.index());
  $('#deleteWorkerModal').modal('show');
});

// Delete worker when delete button is clicked in delete modal
$('#deleteButton').click(function() {
  var deleteIndex = $('#deleteWorkerModal #deleteIndex').val();
  var currentRow = $('#workersTable tbody tr:eq(' + deleteIndex + ')');
  txtEntryID = currentRow.find('td:first').text(); // Get the entryID from the first column of the row
  currentRow.remove();
  $('#deleteWorkerModal').modal('hide');

  // Send DELETE request to server to delete worker
  $.ajax({
    url: strBaseURL + "/position" + "?entryid=" + txtEntryID + "&sessionid=" + sessionStorage.getItem('session'),
    method: "DELETE",
    success: function(response) {
      console.log(response);
      console.log(txtEntryID);
  
      loadWorkers();
      // handle success response
    },
    error: function(xhr, statusText, error) {
      console.log(error);
      // handle error
    }
  });
});

// Clear input fields on modal dismiss
$('#addWorkerModal, #editWorkerModal').on('hidden.bs.modal', function() {
  $(this).find('form')[0].reset();
});
});
});

function loadProducts() {
  $.ajax({
    url: strBaseURL + '/products',
    method: 'GET',
    data: {
      sessionid: sessionStorage.getItem('session')
    },
    success: function(data) {
      console.log('Products loaded:', data);
      // Clear the existing table rows
      $('#productTable tbody').empty();
      $.ajax({
        url: strBaseURL+'/products/count',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
          var numProducts = data.numProducts;

      // Display the number of workers and total pay in the "#numWorkersTable" table
      var newRow = $('<tr>').append(
        $('<td>').text(numProducts),
        
      );
      $('#numProductsTable tbody').empty().append(newRow);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error(errorThrown);
        }
      })
      // Append the new worker records to the table
      $.each(data, function(index, product) {
        $('#productTable tbody').append('<tr><td>'+ product.ProductID +'</td><td>' + product.ProductName + '</td><td>' + product.Description+'</td><td>' + product.Price +
        '</td><td>' + product.Status + '</td><td>' + product.FarmID + '</td><td><button type="button" class="btn btn-success editButton">Edit</button> <button type="button" class="btn btn-danger deleteButton">Delete</button></td></tr>');
      });
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.error(errorThrown);
    }
  })
}


$(document).ready(function() {

  loadProducts();
  
    $('#addProductForm').submit(function(event) {
      event.preventDefault();
      var txtProduct = $('#txtProduct').val();
      var txtDescription = $('#txtDescription').val();
      var txtStatus = $('#txtStatus').val();
      var txtPrice = $('#txtPrice').val();
        // Generate and return a UUID v4 string
  
  
        $.ajax({  
          url: strBaseURL + '/products',
          method: 'POST',
          data: {
            productname: $('#txtProduct').val(),
            description: $('#txtDescription').val(),
            price: $('#txtPrice').val(),
            status: $('#txtStatus').val(),
            sessionid: sessionStorage.getItem('session')
          },
          success: function(response) {
            console.log('Product added:', response);
            loadProducts();
            
            // Append a new row to the tbody of #workersTable
            var newRow = $('<tr>').append(
              $('<td>').text(response.ProductID),
              $('<td>').text(txtProduct),
              $('<td>').text(txtDescription),
              $('<td>').text(txtPrice),
              $('<td>').text(txtStatus),
              $('<td>').text(response.FarmID),
              $('<td>').html('<button type="button" class="btn btn-success editButton">Edit</button> <button type="button" class="btn btn-danger deleteButton">Delete</button>')
            );
            $('#productTable tbody').append(newRow);
            
            // Hide the modal and reset the form
            $('#addProductModal').modal('hide');
            $('#addProductForm')[0].reset();
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
          }
        });
      });      
      
    
    /// Open edit modal when edit button is clicked
    $('#productTable').on('click', '.editButton', function() {
      var currentRow = $(this).closest('tr');
      console.log(currentRow);
      txtProductID = currentRow.find('td:first').text();
      var txtProduct = currentRow.find('td:eq(1)').text();
      var txtDescription = currentRow.find('td:eq(2)').text();
      var txtPrice = currentRow.find('td:eq(3)').text();
      var txtStatus = currentRow.find('td:eq(4)').text();
      console.log("txtProductID:" + txtProductID);
      console.log("txtProduct:" + txtProduct);
      console.log("txtDescription:" + txtDescription);
      console.log("txtPrice:" + txtPrice);
      console.log("txtStatus:" + txtStatus);

  
  
    $('#editProductModal #edittxtProduct').val(txtProduct);
    $('#editProductModal #edittxtDescription').val(txtDescription);
    $('#editProductModal #edittxtPrice').val(txtPrice);
    $('#editProductModal #edittxtStatus').val(txtStatus);
    $('#editProductModal #editIndex').val(currentRow.index());
    $('#editProductModal').modal('show');
  });
  
  $('#editProductModal #editProductForm').submit(function(event) {
    event.preventDefault();
    var txtProduct = $('#editProductModal #edittxtProduct').val();
    var txtDescription = $('#editProductModal #edittxtDescription').val();
    var txtPrice = $('#editProductModal #edittxtPrice').val();
    var txtStatus = $('#editProductModal #edittxtStatus').val();
    var currentRow = $('#productTable tbody tr:eq(' + $('#editProductModal #editIndex').val() + ')');
    currentRow.find('td:first').text(txtProductID);
    currentRow.find('td:eq(1)').text(txtProduct);
    currentRow.find('td:eq(2)').text(txtDescription);
    currentRow.find('td:eq(3)').text(txtPrice);
    currentRow.find('td:eq(4)').text(txtStatus);
    $('#editProductModal').modal('hide');
  
    // Send PUT request to server to update worker position
  
    $.ajax({
      url: strBaseURL+"/products",
      method: "PUT",
      data: {
        productid: txtProductID,
        productname: txtProduct,
        description: txtDescription,
        price: txtPrice,
        status: txtStatus,
        sessionid: sessionStorage.getItem('session')
      },
      success: function(response) {
        console.log(response);
        console.log(txtProductID);
        console.log(txtProduct);
        console.log(txtDescription);
        console.log(txtPrice);
        console.log(txtStatus);
      
        loadProducts();
      },
      error: function(xhr, statusText, error) {
        console.log(error);
        // handle error
      }
    });
  });
  let txtProductID;
   // Open delete modal when delete button is clicked
   $('#productTable').on('click', '.deleteButton', function() {
    var currentRow = $(this).closest('tr');
    txtProductID = currentRow.find('td:first').text(); // Get the product ID from the first column of the row
    console.log(txtProductID);
    $('#deleteProductModal #deleteIndex').val(currentRow.index());
    $('#deleteProductModal').modal('show');
  });

  // Delete product when delete button is clicked in delete modal
  $('#deleteButtonProduct').click(function() {
    var deleteIndex = $('#deleteProductModal #deleteIndex').val();
    var currentRow = $('#productTable tbody tr:eq(' + deleteIndex + ')');
    txtProductID;
    currentRow.remove();
    $('#deleteProductModal').modal('hide');
  
    // Send DELETE request to server to delete product
    $.ajax({
      url: strBaseURL + "/products" + "?productid=" + txtProductID + "&sessionid=" + sessionStorage.getItem('session'),
      method: "DELETE",
      success: function(response) {
        console.log(txtProductID);
        console.log(response);
    
        loadProducts();
        // handle success response
      },
      error: function(xhr, statusText, error) {
        console.log(error);
        // handle error
      }
    });
  });
  
  // Clear input fields on modal dismiss
  $('#addProductModal, #editProductModal').on('hidden.bs.modal', function() {
    $(this).find('form')[0].reset();
  });
  });

  function loadHarvests() {
    $.ajax({
      url: strBaseURL + '/Harvests',
      method: 'GET',
      data: {
        sessionid: sessionStorage.getItem('session')
      },
      success: function(data) {
        console.log('Harvests loaded:', data);
        // Clear the existing table rows
        $('#HarvestTable tbody').empty();
          
        
        // Append the new worker records to the table
        $.each(data, function(index, Harvest) {
          $('#HarvestTable tbody').append('<tr><td>'+ Harvest.HarvestID +'</td><td>' + Harvest.Product +
          '</td><td>' +Harvest.UnitOfMeasure2+'</td><td>'+ Harvest.HarvestDateTime + '</td><td>' + Harvest.Quantity + '</td><td>'+Harvest.FarmID+ '</td><td><button type="button" class="btn btn-success editButton">Edit</button> <button type="button" class="btn btn-danger deleteButton">Delete</button></td></tr>');
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error(errorThrown);
      }
    })
  }

  $(document).ready(function() {

    loadHarvests();
    
      $('#addHarvestForm').submit(function(event) {
        event.preventDefault();
        var txtHarvestProduct = $('#txtHarvestProduct').val();
        var txtUnitOfMeasure = $('#txtUnitOfMeasure').val();
        var txtQuantity = $('#txtQuantity').val();
        var txtHarvestDateTime = $('#txtHarvestDateTime').val();
          // Generate and return a UUID v4 string
    
    
          $.ajax({  
            url: strBaseURL + '/Harvests',
            method: 'POST',
            data: {
              product: txtHarvestProduct,
              unitofmeasure2: txtUnitOfMeasure,
              harvestdatetime: txtHarvestDateTime,
              quantity: txtQuantity,
              sessionid: sessionStorage.getItem('session')
            },
            success: function(response) {
              console.log('Harvest added:', response);
              loadHarvests();
              
              // Append a new row to the tbody of #workersTable
              var newRow = $('<tr>').append(
                $('<td>').text(response.HarvestID),
                $('<td>').text(txtHarvestProduct),
                $('<td>').text(txtUnitOfMeasure),
                $('<td>').text(txtHarvestUser),
                $('<td>').text(response.HarvestDateTime),
                $('<td>').text(txtQuantity),
                $('<td>').text(response.FarmID),
                $('<td>').html('<button type="button" class="btn btn-success editButton">Edit</button> <button type="button" class="btn btn-danger deleteButton">Delete</button>')
              );
              $('#HarvestTable tbody').append(newRow);
              
              // Hide the modal and reset the form
              $('#addHarvestModal').modal('hide');
              $('#addHarvestForm')[0].reset();
            },
            error: function(jqXHR, textStatus, errorThrown) {
              console.error(errorThrown);
            }
          });
        });      
        
      
      /// Open edit modal when edit button is clicked
      $('#HarvestTable').on('click', '.editButton', function() {
        var currentRow = $(this).closest('tr');
        console.log(currentRow);
        var txtHarvestID = currentRow.find('td:first').text();
        var txtHarvestProduct = currentRow.find('td:eq(1)').text();
        var txtUnitOfMeasure = currentRow.find('td:eq(2)').text();
        var txtHarvestDateTime = currentRow.find('td:eq(3)').text();
        var txtQuantity = currentRow.find('td:eq(4)').text();
        var txtFarmID = currentRow.find('td:eq(5)').text();

       console.log(txtHarvestID);
        console.log(txtHarvestProduct);
        console.log(txtUnitOfMeasure);
        console.log(txtHarvestDateTime);
        console.log(txtQuantity);
        console.log(txtFarmID);

  
    
    
      $('#editHarvestModal #edittxtHarvestProduct').val(txtHarvestProduct);
      $('#editHarvestModal #edittxtUnitOfMeasure').val(txtUnitOfMeasure);
      $('#editHarvestModal #edittxtQuantity').val(txtQuantity);
      $('#editHarvestModal #editIndex').val(currentRow.index());
      $('#editHarvestModal').modal('show');
    });
    
    $('#editHarvestModal #editHarvestForm').submit(function(event) {
      event.preventDefault();
      var txtHarvestProduct = $('#editHarvestModal #edittxtHarvestProduct').val();
      var txtUnitOfMeasure = $('#editHarvestModal #edittxtUnitOfMeasure').val();
      var txtQuantity = $('#editHarvestModal #edittxtQuantity').val();
      var currentRow = $('#HarvestTable tbody tr:eq(' + $('#editHarvestModal #editIndex').val() + ')');
      currentRow.find('td:first').text(txtHarvestID);
      currentRow.find('td:eq(1)').text(txtHarvestProduct);
      currentRow.find('td:eq(2)').text(txtUnitOfMeasure);
      currentRow.find('td:eq(3)').text(txtHarvestDateTime);
      currentRow.find('td:eq(4)').text(txtQuantity);
      currentRow.find('td:eq(5)').text(txtFarmID);
      $('#editHarvestModal').modal('hide');
    
      // Send PUT request to server to update worker position
    
      $.ajax({
        url: strBaseURL+"/Harvests",
        method: "PUT",
        data: {
          product: txtHarvestProduct,
          unitofmeasure2 :txtUnitOfMeasure,
          harvestdatetime: txtHarvestDateTime,
          quantity: txtQuantity,
          sessionid: sessionStorage.getItem('session')
        },
        success: function(response) {
          console.log(response);
          console.log(txtHarvestProduct);
          console.log(txtHarvestDateTime);
          console.log(txtQuantity);

          loadHarvests();
        },
        error: function(xhr, statusText, error) {
          console.log(error);
          // handle error
        }
      });
    });
    let txtHarvestID;
     // Open delete modal when delete button is clicked
     $('#HarvestTable').on('click', '.deleteButton', function() {
      var currentRow = $(this).closest('tr');
      txtHarvestID = currentRow.find('td:first').text(); // Get the product ID from the first column of the row
      console.log(txtHarvestID);
      $('#deleteHarvestModal #deleteIndex').val(currentRow.index());
      $('#deleteHarvestModal').modal('show');
    });
  
    // Delete Harvest when delete button is clicked in delete modal
    $('#deleteButtonHarvest').click(function() {
      var deleteIndex = $('#deleteHarvestModal #deleteIndex').val();
      var currentRow = $('#HarvestTable tbody tr:eq(' + deleteIndex + ')');
      txtHarvestID
      currentRow.remove();
      $('#deleteHarvestModal').modal('hide');
    
      // Send DELETE request to server to delete Harvest
      $.ajax({
        url: strBaseURL + "/Harvests" + "?harvestid=" + txtHarvestID + "&sessionid=" + sessionStorage.getItem('session'),
        method: "DELETE",
        success: function(response) {
          console.log(txtHarvestID);
          console.log(response);
      
          loadHarvests();
          // handle success response
        },
        error: function(xhr, statusText, error) {
          console.log(error);
          // handle error
        }
      });
    });
    
    // Clear input fields on modal dismiss
    $('#addHarvestModal, #editHarvestModal').on('hidden.bs.modal', function() {
      $(this).find('form')[0].reset();
    });
    });

    function loadTasks() {
      $.ajax({
        url: strBaseURL + '/tasks',
        method: 'GET',
        data: {
          sessionid: sessionStorage.getItem('session')
        },
        success: function(data) {
          console.log('Tasks loaded:', data);
          $.ajax({
            url: strBaseURL+'/tasks/count',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
              var numTasks = data.numTasks;
              var completeTasks = data.completeTasks;
              var incompleteTasks = data.incompleteTasks;
    
          // Display the number of workers and total pay in the "#numWorkersTable" table
          var newRow = $('<tr>').append(
            $('<td>').text(numTasks),
            $('<td>').text(completeTasks),
            $('<td>').text(incompleteTasks)
            
          );
          $('#numTasksTable tbody').empty().append(newRow);
            },
            error: function(jqXHR, textStatus, errorThrown) {
              console.error(errorThrown);
            }
          })
          $('#taskTable tbody').empty();
          // Append the new worker records to the table
          $.each(data, function(index, Task) {
            $('#taskTable tbody').append('<tr><td>'+ Task.TaskID +'</td><td>' + Task.TaskName +
            '</td><td>' +Task.Notes + '</td><td>' + Task.taskStartTime + '</td><td>' + Task.taskEndTime+'</td><td>'+ Task.Status+ '</td><td>'+Task.FarmID+ '</td><td><button type="button" class="btn btn-success editButton">Edit</button> <button type="button" class="btn btn-danger deleteButton">Delete</button></td></tr>');
          });
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error(errorThrown);
        }
      })
    }
  
    $(document).ready(function() {
  
      loadTasks();
      
        $('#addTaskForm').submit(function(event) {
          event.preventDefault();
          var txtTask = $('#txtTask').val();
          var txtNotes = $('#txtTaskNotes').val();
          var txtStatus = $('#txtTaskStatus').val();
          var txtTaskStartTime = $('#txtTaskStartTime').val();
          var txtTaskEndTime = $('#txtTaskEndTime').val();
            // Generate and return a UUID v4 string
      
      
            $.ajax({  
              url: strBaseURL + '/tasks',
              method: 'POST',
              data: {
                task: txtTask,
                notes: txtNotes,
                status: txtStatus,
                taskstarttime: txtTaskStartTime,
                taskendtime: txtTaskEndTime,
                sessionid: sessionStorage.getItem('session')
              },
              success: function(response) {
                console.log('Task added:', response);
                console.log(txtTask);
                console.log(txtNotes);
                console.log(txtStatus);
                console.log(txtTaskStartTime);
                console.log(txtTaskEndTime);

                loadTasks();
                
                // Append a new row to the tbody of #workersTable
                var newRow = $('<tr>').append(
                  $('<td>').text(response.TaskID),
                  $('<td>').text(txtTask),
                  $('<td>').text(txtNotes),
                  $('<td>').text(txtTaskStartTime),
                  $('<td>').text(txtTaskEndTime),
                  $('<td>').text(txtStatus),
                  $('<td>').text(response.FarmID),
                  $('<td>').html('<button type="button" class="btn btn-success editButton">Edit</button> <button type="button" class="btn btn-danger deleteButton">Delete</button>')
                );
                $('#taskTable tbody').append(newRow);
                
                // Hide the modal and reset the form
                $('#addTaskModal').modal('hide');
                $('#addTaskForm')[0].reset();
              },
              error: function(jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
              }
            });
          });      
          
        
        /// Open edit modal when edit button is clicked
        $('#taskTable').on('click', '.editButton', function() {
          var currentRow = $(this).closest('tr');
          console.log(currentRow);
          var txtTaskID = currentRow.find('td:first').text();
          var txtTask = currentRow.find('td:eq(1)').text();
          var txtNotes = currentRow.find('td:eq(2)').text();
          var txtTaskStartTime = currentRow.find('td:eq(3)').text();
          var txtTaskEndTime = currentRow.find('td:eq(4)').text();
          var txtStatus = currentRow.find('td:eq(5)').text();
          var txtFarmID = currentRow.find('td:eq(6)').text();

  
         console.log(txtTaskID);
          console.log(txtTask);
          console.log(txtNotes);
          console.log(txtTaskStartTime);
          console.log(txtTaskEndTime);
          console.log(txtStatus);
          console.log(txtFarmID);
    
      
        $('#editTaskModal #edittxtTask').val(txtTask);
        $('#editTaskModal #edittxtNotes').val(txtNotes);
        $('#editTaskModal #edittxtStartTime').val(txtTaskStartTime);
        $('#editTaskModal #edittxtEndTime').val(txtTaskEndTime);
        $('#editTaskModal #edittxtStatus').val(txtStatus);
        $('#editTaskModal #editIndex').val(currentRow.index());
        $('#editTaskModal').modal('show');
      });
      
      $('#editTaskModal #editTaskForm').submit(function(event) {
        event.preventDefault();
        var txtTask = $('#editTaskModal #edittxtTask').val();
        var txtNotes = $('#editTaskModal #edittxtTaskNotes').val();
        var txtTaskStartTime = $('#editTaskModal #edittxtTaskStartTime').val();
        var txtTaskEndTime = $('#editTaskModal #edittxtTaskEndTime').val();
        var txtStatus = $('#editTaskModal #edittxtTaskStatus').val();
        var currentRow = $('#taskTable tbody tr:eq(' + $('#editTaskModal #editIndex').val() + ')');
        var txtTaskID = currentRow.find('td:first').text(); // Define variable for TaskID
        var txtFarmID = currentRow.find('td:eq(6)').text(); // Define variable for FarmID
        currentRow.find('td:first').text(txtTaskID);
        currentRow.find('td:eq(1)').text(txtTask);
        currentRow.find('td:eq(2)').text(txtNotes);
        currentRow.find('td:eq(3)').text(txtTaskStartTime);
        currentRow.find('td:eq(4)').text(txtTaskEndTime);
        currentRow.find('td:eq(5)').text(txtStatus);
        currentRow.find('td:eq(6)').text(txtFarmID);
        $('#editTaskModal').modal('hide');
      
        // Send PUT request to server to update worker position
      
        $.ajax({
          url: strBaseURL+"/tasks",
          method: "PUT",
          data: {
            
            task: txtTask,
            notes: txtNotes,
            status: txtStatus,
            taskstarttime: txtTaskStartTime,
            taskendtime: txtTaskEndTime,
            sessionid: sessionStorage.getItem('session')
          },
          success: function(response) {
            console.log(response);
            console.log(txtTask);
            console.log(txtNotes);
            console.log(txtStatus);
            console.log(txtTaskStartTime);
            console.log(txtTaskEndTime);
            loadTasks();
          },
          error: function(xhr, statusText, error) {
            console.log(error);
            // handle error
          }
        });
      });
      let txtTaskID;
       // Open delete modal when delete button is clicked
       $('#taskTable').on('click', '.deleteButton', function() {
        var currentRow = $(this).closest('tr');
        txtTaskID = currentRow.find('td:first').text(); // Get the product ID from the first column of the row
        console.log(txtTaskID);
        $('#deleteTaskModal #deleteIndex').val(currentRow.index());
        $('#deleteTaskModal').modal('show');
      });
    
      // Delete Task when delete button is clicked in delete modal
      $('#deleteButtonTask').click(function() {
        var deleteIndex = $('#deleteTaskModal #deleteIndex').val();
        var currentRow = $('#taskTable tbody tr:eq(' + deleteIndex + ')');
        txtTaskID;
        currentRow.remove();
        $('#deleteTaskModal').modal('hide');
      
        // Send DELETE request to server to delete Task
        $.ajax({
          url: strBaseURL + "/tasks" + "?taskid=" + txtTaskID + "&sessionid=" + sessionStorage.getItem('session'),
          method: "DELETE",
          success: function(response) {
            console.log(txtTaskID);
            console.log(response);
        
            loadTasks();
            // handle success response
          },
          error: function(xhr, statusText, error) {
            console.log(error);
            // handle error
          }
        });
      });
      
      // Clear input fields on modal dismiss
      $('#addTaskModal, #editTaskModal').on('hidden.bs.modal', function() {
        $(this).find('form')[0].reset();
      });
      });


      $(document).ready(function() {

        function loadMaterials() {
          $.ajax({
            url: strBaseURL + '/materials',
            method: 'GET',
            data: {
              sessionid: sessionStorage.getItem('session')
            },
            success: function(data) {
              console.log('Materials loaded:', data);
              // Clear the existing table rows
              $('#MaterialTable tbody').empty();
      
              // Append the new worker records to the table
              $.each(data, function(index, Material) {
                $('#MaterialTable tbody').append(
                  '<tr>' +
                    '<td>' + Material.MaterialID + '</td>' +
                    '<td>' + Material.Material + '</td>' +
                    '<td>' + Material.Description + '</td>' +
                    '<td>' + Material.RecordedDateTime + '</td>' +
                    '<td>' + Material.Quantity + '</td>' +
                    '<td>' + Material.UnitOfMeasure2 + '</td>' +
                    '<td>' + Material.Cost + '</td>' +
                    '<td>' + Material.FarmID + '</td>' +
                    '<td>' +
                      '<button type="button" class="btn btn-success editButton">Edit</button> ' +
                      '<button type="button" class="btn btn-danger deleteButton">Delete</button>' +
                    '</td>' +
                  '</tr>'
                );
              });
            },
            error: function(jqXHR, textStatus, errorThrown) {
              console.error(errorThrown);
            }
          })
        }
      
        loadMaterials();
      
        $('#addMaterialForm').submit(function(event) {
          event.preventDefault();
      
          var txtMaterial = $('#txtMaterial').val();
          var txtMaterialDescription = $('#txtMaterialDescription').val();
          var txtRelatedProduct = $('#txtRelatedProduct').val();
          var txtQuantity = $('#txtMaterialQuantity').val();
          var txtUnitOfMeasure2 = $('#txtMaterialUnitOfMeasure').val();
          var txtCost = $('#txtCost').val();

        
        
          $.ajax({  
            url: strBaseURL + '/materials',
            method: 'POST',
            data: {
              material: txtMaterial,
              materialdescription: txtMaterialDescription,
              quantity: txtQuantity,
              unitofmeasure2: txtUnitOfMeasure2,
              cost: txtCost,
              sessionid: sessionStorage.getItem('session')
            },
            success: function(response) {
              console.log('Material added:', response);
              console.log(txtMaterial);
              console.log(txtMaterialDescription);
              console.log(txtQuantity);
              console.log(txtUnitOfMeasure2);
              console.log(txtCost);
          
              loadMaterials();
              
              // Append a new row to the tbody of #workersTable
              var newRow = $('<tr>').append(
                $('<td>').text(response.MaterialID),
                $('<td>').text(txtMaterial),
                $('<td>').text(txtMaterialDescription),
                $('<td>').text(txtRelatedProduct),
                $('<td>').text(response.RecordedDateTime),
                $('<td>').text(txtQuantity),
                $('<td>').text(txtUnitOfMeasure2),
                $('<td>').text(txtCost),
                $('<td>').text(response.FarmID),
                $('<td>').html('<button type="button" class="btn btn-success editButton">Edit</button> <button type="button" class="btn btn-danger deleteButton">Delete</button>')
              );
              $('#MaterialTable tbody').append(newRow);
              
              // Hide the modal and reset the form
              $('#addMaterialModal').modal('hide');
              $('#addMaterialForm')[0].reset();
            },
            error: function(jqXHR, textStatus, errorThrown) {
              console.error(errorThrown);
            }
          });
            });      
            
            var txtMaterialID;
          /// Open edit modal when edit button is clicked
          $('#MaterialTable').on('click', '.editButton', function() {
            var currentRow = $(this).closest('tr');
            console.log(currentRow)
           txtMaterialID = currentRow.find('td:first').text();
            console.log(txtMaterialID);
            var txtMaterial = currentRow.find('td:eq(1)').text();
            var txtMaterialDescription = currentRow.find('td:eq(2)').text();
            var txtMaterialDateTime = currentRow.find('td:eq(3)').text();
            var txtQuantity = currentRow.find('td:eq(4)').text();
            var txtUnitOfMeasure2 = currentRow.find('td:eq(5)').text();
            var txtCost = currentRow.find('td:eq(6)').text();
            

            
            console.log(txtMaterialID);
            
            $('#editMaterialModal #edittxtMaterialID').val(txtMaterialID);
            console.log(txtMaterialID);
            
            $('#editMaterialModal #edittxtMaterial').val(txtMaterial);
            $('#editMaterialModal #edittxtMaterialDescription').val(txtMaterialDescription);
            $('#editMaterialModal #edittxtMaterialQuantity').val(txtQuantity);
            $('#editMaterialModal #edittxtMaterialUnitOfMeasure').val(txtUnitOfMeasure2);
            $('#editMaterialModal #edittxtCost').val(txtCost);
            $('#editMaterialModal #editIndex').val(currentRow.index());
            $('#editMaterialModal').modal('show');
            
            });
            
            $('#editMaterialModal #editMaterialForm').submit(function(event) {
            event.preventDefault();
            
     
            
            
            console.log(txtMaterialID); // Get the Material ID from the edit modal
            var txtMaterial = $('#editMaterialModal #edittxtMaterial').val();
            var txtMaterialDescription = $('#editMaterialModal #edittxtMaterialDescription').val();
            var txtQuantity = $('#editMaterialModal #edittxtMaterialQuantity').val();
            var txtUnitOfMeasure2 = $('#editMaterialModal #edittxtMaterialUnitOfMeasure').val();
            var txtCost = $('#editMaterialModal #edittxtCost').val();
            var currentRow = $('#MaterialTable tr').eq($('#editIndex').val());
            var txtFarmID = currentRow.find('td:eq(7)').text();
            
            currentRow.find('td:first').text(txtMaterialID);
            console.log(txtMaterialID)
            currentRow.find('td:eq(1)').text(txtMaterial);
            currentRow.find('td:eq(2)').text(txtMaterialDescription);
            currentRow.find('td:eq(4)').text(txtQuantity);
            currentRow.find('td:eq(5)').text(txtUnitOfMeasure2);
            currentRow.find('td:eq(6)').text(txtCost);  
            currentRow.find('td:eq(7)').text(txtFarmID);
            $('#editMaterialModal').modal('hide');
            
            // Send PUT request to server to update Material position
            $.ajax({
              url: strBaseURL+"/materials",
              method: "PUT",
              data: {
                materialid: txtMaterialID,
                material: txtMaterial,
                materialdescription: txtMaterialDescription,
                quantity: txtQuantity,
                unitofmeasure2: txtUnitOfMeasure2,
                cost: txtCost,
                sessionid: sessionStorage.getItem('session')
              },
              success: function(response) {
                console.log(response);
                console.log(txtMaterial);
                console.log(txtMaterialDescription);
                console.log(txtQuantity);
                console.log(txtUnitOfMeasure2);
                console.log(txtCost);
                console.log(txtMaterialID)
                loadMaterials();
              },
              error: function(xhr, statusText, error) {
                console.log(error);
                // handle error
              }
            });
            
            });
          
            
            // Open delete modal when delete button is clicked
            $('#MaterialTable').on('click', '.deleteButton', function() {
            var currentRow = $(this).closest('tr');
            txtMaterialID = currentRow.find('td:first').text(); // Get the Material ID from the first column of the row
            
  
            
            $('#deleteMaterialModal #deleteIndex').val(currentRow.index());
            $('#deleteMaterialModal').modal('show');
            
            });
            
            // Delete Material when delete button is clicked in delete modal
            $('#deleteButtonMaterial').click(function() {
            var deleteIndex = $('#deleteMaterialModal #deleteIndex').val();
            var currentRow = $('#MaterialTable tbody tr:eq(' + deleteIndex + ')');
            
        
            
            currentRow.remove();
            $('#deleteMaterialModal').modal('hide');
            
            // Send DELETE request to server to delete Material
            $.ajax({
              url: strBaseURL + "/materials",
              method: "DELETE",
              data: {
                materialid: txtMaterialID,
                sessionid: sessionStorage.getItem('session')
              },
              success: function(response) {
                console.log(txtMaterialID);
                console.log(response);
            
                loadMaterials();
                // handle success response
              },
              error: function(xhr, statusText, error) {
                console.log(error);
                // handle error
              }
            });
            
            });
            
            // Clear input fields on modal dismiss
            $('#addMaterialModal, #editTaskModal').on('hidden.bs.modal', function() {
            $(this).find('form')[0].reset();
            });
            });

            