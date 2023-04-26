var strBaseURL = 'http://localhost:8000'
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
// Show the login div when the "Login" button is clicked
$("#btnLogin").on('click', function() {
  $("#divLogin").hide(1000);
  $("#divSignUp").hide(1000);
  $("#navMain").show(1000);
  $("#divHome").show(1000);
  $("#divFirstBackground").hide(1000);
  $("#divSecondBackground").show(1000);
  $("#divSlogan").hide(1000);
  $("#divSlogan2").hide(1000);
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
        $('#divSignUp2').hide(500);
        $('#divLogin').show(500);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error(errorThrown);
      }
    });
}
});
          
var emptyRow = "<tr><td colspan='4' class='text-center'> No Records Available</td></tr>";
        var emptyNewRow = "<tr class='trNewRow'>"; 
        emptyNewRow = emptyNewRow + "    <td class='tdEntryID'>";
        emptyNewRow = emptyNewRow + "        <input type='hidden' class='form-control txtEntryID' value='0' />";
        emptyNewRow = emptyNewRow + "    </td>";
        emptyNewRow = emptyNewRow + "    <td class='tdUser'>";
        emptyNewRow = emptyNewRow + "        <input type='text' class='form-control txtUser' placeholder='Enter Name'/>";
        emptyNewRow = emptyNewRow + "    </td>";
        emptyNewRow = emptyNewRow + "    <td class='tdTitle'>";
        emptyNewRow = emptyNewRow + "        <input type='text' class='form-control txtTitle' placeholder='Enter Title'/>";
        emptyNewRow = emptyNewRow + "    </td>";
        emptyNewRow = emptyNewRow + "    <td class='tdPayRate'>";
        emptyNewRow = emptyNewRow + "        <input type='text' class='form-control txtPayRate' placeholder='Enter Pay Rate'/>";
        emptyNewRow = emptyNewRow + "    </td>";
        emptyNewRow = emptyNewRow + "    <td class='tdEffectiveDateTime'>";
        emptyNewRow = emptyNewRow + "        <input type='text' class='form-control txtEffectiveDateTime' placeholder='Enter Date'/>";
        emptyNewRow = emptyNewRow + "    </td>";  
        emptyNewRow = emptyNewRow + "    <td class='tdFarmID'>";
        emptyNewRow = emptyNewRow + "        <input type='hidden' class='form-control txtEntryID' value='0' />";
        emptyNewRow = emptyNewRow + "    </td>";
        emptyNewRow = emptyNewRow + "    <td class='tdAction'>";
        emptyNewRow = emptyNewRow + "        <button class='btn btn-sm btn-success btn-save'> Save</button>";
        emptyNewRow = emptyNewRow + "        <button class='btn btn-sm btn-success btn-cancel'> Cancel</button>";
        emptyNewRow = emptyNewRow + "    </td>";
        emptyNewRow = emptyNewRow + "</tr>";

        var rowButtons ="<button class='btn btn-success btn-sm btn-edit' > Edit </button>  <button class='btn btn-danger btn-sm' > Delete </button> ";
        var rowUpdateButtons ="<button class='btn btn-success btn-sm btn-save' > Update </button>  <button class='btn btn-danger btn-sm btn-save' > Cancel </button> ";

            $("#tblWorkers tbody").append(emptyRow); // adding empty row on page load 
            
            $("#btnAddWorkers").click(function () { 
                if ($("#tblWorkers tbody").children().children().length == 1) {
                    $("#tblWorkers tbody").html("");
                }
                $("#tblWorkers tbody").append(emptyNewRow); // appending dynamic string to table tbody
            });
            
            $('#tblWorkers').on('click', '.btn-save', function () {
                const entryID =  $(this).parent().parent().find(".txtEntryID").val();
                $(this).parent().parent().find(".tdEntryID").html(""+entryID+"");
                const user =  $(this).parent().parent().find(".txtUser").val();
                $(this).parent().parent().find(".tdUser").html(""+user+""); 
                const title =  $(this).parent().parent().find(".txtTitle").val();
                $(this).parent().parent().find(".tdTitle").html(""+title+"");
                const payrate =  $(this).parent().parent().find(".txtPayRate").val();
                $(this).parent().parent().find(".tdPayRate").html(""+payrate+"");
                const effectiveDateTime =  $(this).parent().parent().find(".txtEffectiveDateTime").val();
                $(this).parent().parent().find(".tdEffectiveDateTime").html(""+effectiveDateTime+"");
                const farmID =  $(this).parent().parent().find(".txtFarmID").val();
                $(this).parent().parent().find(".tdFarmID").html(""+farmID+"");
                $(this).parent().parent().find(".tdAction").html(rowButtons);
             
                $.post(strBaseURL + '/position', {
                  strEntry: entryID,
                  strUser: user,
                  strTitle: title,
                  strPayRate: payrate,
                  strEffectiveDateTime: effectiveDateTime,
                }, function(result){
                // handle response from the server }, function(result){
              console.log(result);
              if(result){  
                result = JSON.parse(result) 
                console.log(result);
                swal.fire({
                  text: "You have successfully added a new worker!",
                  icon: 'success',
                  confirmButtonText: 'OK'
                });
              } else{
                swal.fire({
                  text: 'There was an error signing up a new worker. Please try again.',
                  icon: 'error',
                  confirmButtonText: 'OK'
                });
              }
            });
          });

            $('#tblWorkers').on('click', '.btn-danger', function () { // registering function for delete button  
                $(this).parent().parent().remove();
                if ($("#tblWorkers tbody").children().children().length == 0) {
                    $("#tblWorkers tbody").append(emptyRow);
                }
                const data = {
                  "entryID": entryID,
                  "user": user,
                  "title": title,
                  "payrate": payrate,
                  "effectiveDateTime": effectiveDateTime,
                  "farmID": farmID
              };
              $.delete(strBaseURL + '/position', {
                strEntry: entryID,
                strUser: user,
                strTitle: title,
                strPayRate: payrate,
                strEffectiveDateTime: effectiveDateTime,
              }, function(result){
              // handle response from the server }, function(result){
            console.log(result);
            if(result){  
              result = JSON.parse(result) 
              console.log(result);
              swal.fire({
                text: "You have successfully deleted a worker!",
                icon: 'success',
                confirmButtonText: 'OK'
              });
            } else{
              swal.fire({
                text: 'There was an error deleting worker. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
          });
        });

            $('#tblWorkers').on('click', '.btn-cancel', function () { 
                $(this).parent().parent().remove();
            });
            $('#tblWorkers').on('click', '.btn-edit', function () { 

                const user =$(this).parent().parent().find(".tdUser").html();

                $(this).parent().parent().find(".tdUser").html("<input type='text' value='"+user+"' class='form-control txtName' placeholder='Enter Name'/>"); 


                const title =$(this).parent().parent().find(".tdtitle").html();

                $(this).parent().parent().find(".tdTitle").html("<input type='text' value='"+title+"' class='form-control txtCity' placeholder='Enter Title'/>"); 


                const payrate =$(this).parent().parent().find(".tdPayRate").html();

                $(this).parent().parent().find(".tdPayrate").html("<input type='text' value='"+payrate+"' class='form-control txtMobile' placeholder='Enter a Pay Rate'/>"); 

                const effectiveDateTime =$(this).parent().parent().find(".tdEffectiveDateTime").html();

                $(this).parent().parent().find(".tdEffectiveDateTime").html("<input type='text' value='"+effectiveDateTime+"' class='form-control txtMobile' placeholder='Enter a Pay Rate'/>"); 

                $(this).parent().parent().find(".tdAction").html(rowUpdateButtons);
              
            });

        var emptyRow2 = "<tr><td colspan='4' class='text-center'> No Records Available</td></tr>";
        var emptyNewRow2 = "<tr class='trNewRow'>"; 
        emptyNewRow2 = emptyNewRow2 + "    <td class='tdFarmName'>";
        emptyNewRow2 = emptyNewRow2 + "        <input type='text' class='form-control txtFarmName' placeholder='Enter a Farm Name'/>";
        emptyNewRow2 = emptyNewRow2 + "    </td>";
        emptyNewRow2 = emptyNewRow2 + "    <td class='tdStreetAddress'>";
        emptyNewRow2 = emptyNewRow2 + "        <input type='text' class='form-control txtStreetAddress' placeholder='Enter an Address'/>";
        emptyNewRow2 = emptyNewRow2 + "    </td>";
        emptyNewRow2 = emptyNewRow2 + "    <td class='tdStreetAddress2'>";
        emptyNewRow2 = emptyNewRow2 + "        <input type='text' class='form-control txtStreetAddress2' placeholder='Apartment, studio, floor, or N/A'/>";
        emptyNewRow2 = emptyNewRow2 + "    </td>";
        emptyNewRow2 = emptyNewRow2 + "    <td class='tdCity'>";
        emptyNewRow2 = emptyNewRow2 + "        <input type='text' class='form-control txtCity' placeholder='Enter a City'/>";
        emptyNewRow2 = emptyNewRow2 + "    </td>";  
        emptyNewRow2 = emptyNewRow2 + "    <td class='tdState'>";
        emptyNewRow2 = emptyNewRow2 + "        <input type='text' class='form-control txtState' placeholder='Enter a State'/>";
        emptyNewRow2 = emptyNewRow2 + "    </td>";  
        emptyNewRow2 = emptyNewRow2 + "    <td class='tdZIP'>";
        emptyNewRow2 = emptyNewRow2 + "        <input type='text' class='form-control txtZIP' placeholder='Enter a ZIP Code'/>";
        emptyNewRow2 = emptyNewRow2 + "    </td>";  
        emptyNewRow2 = emptyNewRow2 + "    <td class='tdAction'>";
        emptyNewRow2 = emptyNewRow2 + "        <button class='btn btn-sm btn-success btn-save'> Save</button>";
        emptyNewRow2 = emptyNewRow2 + "        <button class='btn btn-sm btn-success btn-cancel'> Cancel</button>";
        emptyNewRow2 = emptyNewRow2 + "    </td>";
        emptyNewRow2 = emptyNewRow2 + "</tr>";

        var rowButtons2 ="<button class='btn btn-success btn-sm btn-edit' > Edit </button>  <button class='btn btn-danger btn-sm' > Delete </button> ";
        var rowUpdateButtons2 ="<button class='btn btn-success btn-sm btn-save' > Update </button>  <button class='btn btn-danger btn-sm btn-save' > Cancel </button> ";

            $("#tblFarms tbody").append(emptyRow2); // adding empty row on page load 
            
            $("#btnAddFarms").click(function () { 
                if ($("#tblFarms tbody").children().children().length == 1) {
                    $("#tblFarms tbody").html("");
                }
                $("#tblFarms tbody").append(emptyNewRow2); // appending dynamic string to table tbody
            });
            
            $('#tblFarms').on('click', '.btn-save', function () {
                const farmname =  $(this).parent().parent().find(".txtFarmName").val();
                $(this).parent().parent().find(".tdFarmName").html(""+farmname+""); 
                const streetAddress =  $(this).parent().parent().find(".txtStreetAddress").val();
                $(this).parent().parent().find(".tdStreetAddress").html(""+streetAddress+"");
                const streetAddress2 =  $(this).parent().parent().find(".txtStreetAddress2").val();
                $(this).parent().parent().find(".tdStreetAddress2").html(""+streetAddress2+"");
                const city =  $(this).parent().parent().find(".txtCity").val();
                $(this).parent().parent().find(".tdCity").html(""+city+"");
                const state =  $(this).parent().parent().find(".txtState").val();
                $(this).parent().parent().find(".tdState").html(""+state+"");
                const zip =  $(this).parent().parent().find(".txtZIP").val();
                $(this).parent().parent().find(".tdZIP").html(""+zip+"");
                $(this).parent().parent().find(".tdAction").html(rowButtons2);
            });
             
            
            $('#tblFarms').on('click', '.btn-danger', function () { // registering function for delete button  
                $(this).parent().parent().remove();
                if ($("#tblFarms tbody").children().children().length == 0) {
                    $("#tblFarms tbody").append(emptyRow2);
                }
            });
            

            $('#tblFarms').on('click', '.btn-cancel', function () { 
                $(this).parent().parent().remove();
            });
            $('#tblFarms').on('click', '.btn-edit', function () { 
                const farmname =$(this).parent().parent().find(".tdFarmName").html();

                $(this).parent().parent().find(".tdFarmName").html("<input type='text' value='"+farmname+"' class='form-control txtFarmName' placeholder='Enter a Farm Name'/>"); 


                const streetAddress =$(this).parent().parent().find(".tdStreetAddress").html();

                $(this).parent().parent().find(".tdStreetAddress").html("<input type='text' value='"+streetAddress+"' class='form-control txtStreetAddress' placeholder='Enter an Address'/>"); 


                const streetAddress2 =$(this).parent().parent().find(".tdStreetAddress2").html();

                $(this).parent().parent().find(".tdStreetAddress2").html("<input type='text' value='"+streetAddress2+"' class='form-control txtMobile' placeholder='Apartment, studio, floor, or N/A'/>"); 

                const city =$(this).parent().parent().find(".tdCity").html();

                $(this).parent().parent().find(".tdCity").html("<input type='text' value='"+city+"' class='form-control txtCity' placeholder='Enter a City'/>"); 

                const state =$(this).parent().parent().find(".tdState").html();

                $(this).parent().parent().find(".tdState").html("<input type='text' value='"+state+"' class='form-control txtState' placeholder='Enter a State'/>"); 

                const zip =$(this).parent().parent().find(".tdZIP").html();

                $(this).parent().parent().find(".tdZIP").html("<input type='text' value='"+zip+"' class='form-control txtzip' placeholder='Enter a ZIP Code'/>"); 


                $(this).parent().parent().find(".tdAction").html(rowUpdateButtons2);
              
            });

            var emptyRow3 = "<tr><td colspan='4' class='text-center'> No Records Available</td></tr>";
            var emptyNewRow3 = "<tr class='trNewRow'>"; 
            emptyNewRow3 = emptyNewRow3 + "    <td class='tdShortName'>";
            emptyNewRow3 = emptyNewRow3 + "        <input type='text' class='form-control txtShortName' placeholder='Enter a Short Name'/>";
            emptyNewRow3 = emptyNewRow3 + "    </td>";
            emptyNewRow3 = emptyNewRow3 + "    <td class='tdLongName'>";
            emptyNewRow3 = emptyNewRow3 + "        <input type='text' class='form-control txtLongName' placeholder='Enter a Long Name'/>";
            emptyNewRow3 = emptyNewRow3 + "    </td>";
            emptyNewRow3 = emptyNewRow3 + "    <td class='tdDescription'>";
            emptyNewRow3 = emptyNewRow3 + "        <input type='text' class='form-control txtDescription' placeholder='Enter a Description'/>";
            emptyNewRow3 = emptyNewRow3 + "    </td>";  
            emptyNewRow3 = emptyNewRow3 + "    <td class='tdStatus'>";
            emptyNewRow3 = emptyNewRow3 + "        <input type='text' class='form-control txtStats' placeholder='Enter a Status'/>";
            emptyNewRow3 = emptyNewRow3 + "    </td>";  
            emptyNewRow3 = emptyNewRow3 + "    <td class='tdAction'>";
            emptyNewRow3 = emptyNewRow3 + "        <button class='btn btn-sm btn-success btn-save'> Save</button>";
            emptyNewRow3 = emptyNewRow3 + "        <button class='btn btn-sm btn-success btn-cancel'> Cancel</button>";
            emptyNewRow3 = emptyNewRow3 + "    </td>";
            emptyNewRow3 = emptyNewRow3 + "</tr>";
    
            var rowButtons3 ="<button class='btn btn-success btn-sm btn-edit' > Edit </button>  <button class='btn btn-danger btn-sm' > Delete </button> ";
            var rowUpdateButtons3 ="<button class='btn btn-success btn-sm btn-save' > Update </button>  <button class='btn btn-danger btn-sm btn-save' > Cancel </button> ";
    
                $("#tblProducts tbody").append(emptyRow3); // adding empty row on page load 
                
                $("#btnAddProducts").click(function () { 
                    if ($("#tblProducts tbody").children().children().length == 1) {
                        $("#tblProducts tbody").html("");
                    }
                    $("#tblProducts tbody").append(emptyNewRow3); // appending dynamic string to table tbody
                });
                
                $('#tblProducts').on('click', '.btn-save', function () {
                    const shortname =  $(this).parent().parent().find(".txtShortName").val();
                    $(this).parent().parent().find(".tdShortName").html(""+shortname+"");
                    const longname =  $(this).parent().parent().find(".txtLongName").val();
                    $(this).parent().parent().find(".tdLongName").html(""+longname+"");
                    const description =  $(this).parent().parent().find(".txtDescription").val();
                    $(this).parent().parent().find(".tdDescription").html(""+description+"");
                    const status =  $(this).parent().parent().find(".txtStatus").val();
                    $(this).parent().parent().find(".tdStatus").html(""+status+"");
                    $(this).parent().parent().find(".tdAction").html(rowButtons3);
                });
                 
                
                $('#tblProducts').on('click', '.btn-danger', function () { // registering function for delete button  
                    $(this).parent().parent().remove();
                    if ($("#tblProducts tbody").children().children().length == 0) {
                        $("#tblProducts tbody").append(emptyRow3);
                    }
                });
                
    
                $('#tblProducts').on('click', '.btn-cancel', function () { 
                    $(this).parent().parent().remove();
                });
                $('#tblProducts').on('click', '.btn-edit', function () { 
                    const shortname =$(this).parent().parent().find(".tdShortName").html();

                    $(this).parent().parent().find(".tdShortName").html("<input type='text' value='"+shortname+"' class='form-control txtShortName' placeholder='Enter a Short Name'/>");

                    const longname =$(this).parent().parent().find(".tdLongName").html();

                    $(this).parent().parent().find(".tdLongName").html("<input type='text' value='"+longname+"' class='form-control txtLongName' placeholder='Enter a Long Name'/>");

                    const description =$(this).parent().parent().find(".tdDescription").html();

                    $(this).parent().parent().find(".tdDescription").html("<input type='text' value='"+description+"' class='form-control txtDescription' placeholder='Enter a Description'/>");

                    const status =$(this).parent().parent().find(".tdStatus").html();

                    $(this).parent().parent().find(".tdStatus").html("<input type='text' value='"+status+"' class='form-control txtStatus' placeholder='Enter a Status'/>");

                    $(this).parent().parent().find(".tdAction").html(rowUpdateButtons3);

                });
    
            var emptyRow4 = "<tr><td colspan='4' class='text-center'> No Records Available</td></tr>";
            var emptyNewRow4 = "<tr class='trNewRow'>";
            emptyNewRow4 = emptyNewRow4 + "    <td class='tdTaskName'>";
            emptyNewRow4 = emptyNewRow4 + "        <input type='text' class='form-control txtTaskName' placeholder='Enter a Task Name'/>";
            emptyNewRow4 = emptyNewRow4 + "    </td>";
            emptyNewRow4 = emptyNewRow4 + "    <td class='tdNotes'>";
            emptyNewRow4 = emptyNewRow4 + "        <input type='text' class='form-control txtNotes' placeholder='Enter Notes'/>";
            emptyNewRow4 = emptyNewRow4 + "    </td>";
            emptyNewRow4 = emptyNewRow4 + "    <td class='tdStatus'>";
            emptyNewRow4 = emptyNewRow4 + "        <input type='text' class='form-control txtStatus' placeholder='Enter a Status'/>";
            emptyNewRow4 = emptyNewRow4 + "    </td>";
            emptyNewRow4 = emptyNewRow4 + "    <td class='tdAction'>";
            emptyNewRow4 = emptyNewRow4 + "        <button class='btn btn-sm btn-success btn-save'> Save</button>";
            emptyNewRow4 = emptyNewRow4 + "        <button class='btn btn-sm btn-success btn-cancel'> Cancel</button>";
            emptyNewRow4 = emptyNewRow4 + "    </td>";
            emptyNewRow4 = emptyNewRow4 + "</tr>";

            var rowButtons4 ="<button class='btn btn-success btn-sm btn-edit' > Edit </button>  <button class='btn btn-danger btn-sm' > Delete </button> ";
            var rowUpdateButtons4 ="<button class='btn btn-success btn-sm btn-save' > Update </button>  <button class='btn btn-danger btn-sm btn-save' > Cancel </button> ";

                $("#tblTasks tbody").append(emptyRow4); // adding empty row on page load

                $("#btnAddTasks").click(function () {
                    if ($("#tblTasks tbody").children().children().length == 1) {
                        $("#tblTasks tbody").html("");
                    }
                    $("#tblTasks tbody").append(emptyNewRow4); // appending dynamic string to table tbody
                });

                $('#tblTasks').on('click', '.btn-save', function () {
                    const taskname =  $(this).parent().parent().find(".txtTaskName").val();
                    $(this).parent().parent().find(".tdTaskName").html(""+taskname+"");
                    const notes =  $(this).parent().parent().find(".txtNotes").val();
                    $(this).parent().parent().find(".tdNotes").html(""+notes+"");
                    const status =  $(this).parent().parent().find(".txtStatus").val();
                    $(this).parent().parent().find(".tdStatus").html(""+status+"");
                    $(this).parent().parent().find(".tdAction").html(rowButtons4);
                }
                );

                $('#tblTasks').on('click', '.btn-danger', function () { // registering function for delete button
                    $(this).parent().parent().remove();
                    if ($("#tblTasks tbody").children().children().length == 0) {
                        $("#tblTasks tbody").append(emptyRow4);
                    }
                });

                $('#tblTasks').on('click', '.btn-cancel', function () {
                    $(this).parent().parent().remove();
                });
                $('#tblTasks').on('click', '.btn-edit', function () {
                    const taskname =$(this).parent().parent().find(".tdTaskName").html();

                    $(this).parent().parent().find(".tdTaskName").html("<input type='text' value='"+taskname+"' class='form-control txtTaskName' placeholder='Enter a Task Name'/>");

                    const notes =$(this).parent().parent().find(".tdNotes").html();

                    $(this).parent().parent().find(".tdNotes").html("<input type='text' value='"+notes+"' class='form-control txtNotes' placeholder='Enter Notes'/>");

                    const status =$(this).parent().parent().find(".tdStatus").html();

                    $(this).parent().parent().find(".tdStatus").html("<input type='text' value='"+status+"' class='form-control txtStatus' placeholder='Enter a Status'/>");

                    $(this).parent().parent().find(".tdAction").html(rowUpdateButtons4);

                });

            var emptyRow5 = "<tr><td colspan='4' class='text-center'> No Records Available</td></tr>";
            var emptyNewRow5 = "<tr class='trNewRow'>";
            emptyNewRow5 = emptyNewRow5 + "    <td class='tdProduct'>";
            emptyNewRow5 = emptyNewRow5 + "        <input type='text' class='form-control txtProduct' placeholder='Enter a Product'/>";
            emptyNewRow5 = emptyNewRow5 + "    </td>";
            emptyNewRow5 = emptyNewRow5 + "    <td class='tdUser'>";
            emptyNewRow5 = emptyNewRow5 + "        <input type='text' class='form-control txtUser' placeholder='Enter a User'/>";
            emptyNewRow5 = emptyNewRow5 + "    </td>";
            emptyNewRow5 = emptyNewRow5 + "    <td class='tdHarvestDateTime'>";
            emptyNewRow5 = emptyNewRow5 + "        <input type='text' class='form-control txtHarvestDateTime' placeholder='Enter a Harvest Date Time'/>";
            emptyNewRow5 = emptyNewRow5 + "    </td>";
            emptyNewRow5 = emptyNewRow5 + "    <td class='tdQuantity'>"; 
            emptyNewRow5 = emptyNewRow5 + "        <input type='text' class='form-control txtQuantity' placeholder='Enter a Quantity'/>";
            emptyNewRow5 = emptyNewRow5 + "    </td>";
            emptyNewRow5 = emptyNewRow5 + "    <td class='tdUnitOfMeasure'>";
            emptyNewRow5 = emptyNewRow5 + "        <input type='text' class='form-control txtUnitOfMeasure' placeholder='Enter a Unit of Measure'/>";
            emptyNewRow5 = emptyNewRow5 + "    </td>";
            emptyNewRow5 = emptyNewRow5 + "    <td class='tdAction'>";
            emptyNewRow5 = emptyNewRow5 + "        <button class='btn btn-sm btn-success btn-save'> Save</button>";
            emptyNewRow5 = emptyNewRow5 + "        <button class='btn btn-sm btn-success btn-cancel'> Cancel</button>";
            emptyNewRow5 = emptyNewRow5 + "    </td>";
            emptyNewRow5 = emptyNewRow5 + "</tr>";

            var rowButtons5 ="<button class='btn btn-success btn-sm btn-edit' > Edit </button>  <button class='btn btn-danger btn-sm' > Delete </button> ";
            var rowUpdateButtons5 ="<button class='btn btn-success btn-sm btn-save' > Update </button>  <button class='btn btn-danger btn-sm btn-save' > Cancel </button> ";

                $("#tblHarvests tbody").append(emptyRow5); // adding empty row on page load

                $("#btnAddHarvests").click(function () {
                    if ($("#tblHarvests tbody").children().children().length == 1) {
                        $("#tblHarvests tbody").html("");
                    }
                    $("#tblHarvests tbody").append(emptyNewRow5); // appending dynamic string to table tbody
                });

                $('#tblHarvests').on('click', '.btn-save', function () {
                    const product =  $(this).parent().parent().find(".txtProduct").val();
                    $(this).parent().parent().find(".tdProduct").html(""+product+"");
                    const user =  $(this).parent().parent().find(".txtUser").val();
                    $(this).parent().parent().find(".tdUser").html(""+user+"");
                    const harvestdatetime =  $(this).parent().parent().find(".txtHarvestDateTime").val();
                    $(this).parent().parent().find(".tdHarvestDateTime").html(""+harvestdatetime+"");
                    const quantity =  $(this).parent().parent().find(".txtQuantity").val();
                    $(this).parent().parent().find(".tdQuantity").html(""+quantity+"");
                    const unitofmeasure =  $(this).parent().parent().find(".txtUnitOfMeasure").val();
                    $(this).parent().parent().find(".tdUnitOfMeasure").html(""+unitofmeasure+"");
                    $(this).parent().parent().find(".tdAction").html(rowButtons5);
                }
                );

                $('#tblHarvests').on('click', '.btn-danger', function () { // registering function for delete button
                    $(this).parent().parent().remove();
                    if ($("#tblHarvests tbody").children().children().length == 0) {
                        $("#tblHarvests tbody").append(emptyRow5);
                    }
                });

                $('#tblHarvests').on('click', '.btn-cancel', function () {
                    $(this).parent().parent().remove();
                }
                );
                $('#tblHarvests').on('click', '.btn-edit', function () {
                  const product =$(this).parent().parent().find(".tdProduct").html();

                  $(this).parent().parent().find(".tdProduct").html("<input type='text' value='"+product+"' class='form-control txtProduct' placeholder='Enter a Product'/>");

                  const user =$(this).parent().parent().find(".tdUser").html();

                  $(this).parent().parent().find(".tdUser").html("<input type='text' value='"+user+"' class='form-control txtUser' placeholder='Enter a User'/>");

                  const harvestdatetime =$(this).parent().parent().find(".tdHarvestDateTime").html();

                  $(this).parent().parent().find(".tdHarvestDateTime").html("<input type='text' value='"+harvestdatetime+"' class='form-control txtHarvestDateTime' placeholder='Enter a Harvest Date Time'/>");

                  const quantity =$(this).parent().parent().find(".tdQuantity").html();

                  $(this).parent().parent().find(".tdQuantity").html("<input type='text' value='"+quantity+"' class='form-control txtQuantity' placeholder='Enter a Quantity'/>");

                  const unitofmeasure =$(this).parent().parent().find(".tdUnitOfMeasure").html();

                  $(this).parent().parent().find(".tdUnitOfMeasure").html("<input type='text' value='"+unitofmeasure+"' class='form-control txtUnitOfMeasure' placeholder='Enter a Unit of Measure'/>");

                  $(this).parent().parent().find(".tdAction").html(rowUpdateButtons5);

              }
              );
            });


