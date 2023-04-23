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
  $("#divReports").show(500);
  $("#divWorkers").hide(500);
  $("#divInventory").show(500);
  $("#divHarvests").hide(500);
});
$("#linkHarvests").on('click', function() {
  $("#divHome").hide(500);
  $("#divFarms").hide(500);
  $("#divProducts").hide(500);
  $("#divTasks").hide(500);
  $("#divReports").show(500);
  $("#divWorkers").hide(500);
  $("#divInventory").hide(500);
  $("#divHarvests").show(500);
});
$('#btnSignUpNext').on('click', function(){
  var blnError = false;
  var strHTML = '';
  if($('#txtFirstName').val() == ''){
    blnError = true;
    strHTML += 'Please enter your first name.<br>';
  }
  if($('#txtLastName').val() == ''){
    blnError = true;
    strHTML += 'Please enter your last name.<br>';
  }
  if($('#txtEmail').val() == ''){
    blnError = true;
    strHTML += 'Please enter your email.<br>';
  }
  if($('#txtPassword').val() == ''){
    blnError = true;
    strHTML += 'Please enter your password.<br>';
  }
  if($('#txtPhoneNumber').val() == ''){
    blnError = true;
    strHTML += 'Please enter your phone number.<br>';
  }

  if(blnError == true){
    swal.fire({
      text: 'Please correct the following errors:',
      html: strHTML,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  } else { 
    let strfirstName= $('#txtFirstName').val();
    let strlastName= $('#txtLastName').val();
    let strEmail= $('#txtEmail').val();
    let strPassword= $('#txtPassword').val();
    let strPhoneNumber= $('#txtPhoneNumber').val();
    let strFARMID= $('#txtFARMID').val();
    $.post(strBaseURL + '/users', {
      firstName: strfirstName,
      lastName: strlastName,
      email: strEmail,
      password: strPassword,
      phoneNumber: strPhoneNumber
    }, function(result){
      console.log(result);
      if(result){  
        result = JSON.parse(result) 
        console.log(result);
        swal.fire({
          text: "You have successfully gave your personal info, now it's time to add your farm!",
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else{
        swal.fire({
          text: 'There was an error signing up. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
    $('#divSignUp').hide(500);
    $('#divSignUp2').show(500);
  }
});

$('#btnSignUp').on('click', function(){
  var blnError = false;
  var strHTML = '';
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
  if($('#txtZipCode').val() == ''){
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
    let strStreetAddress= $('#txtStreetAddress').val();
    let strStreetAddress2= $('#txtStreetAddress2').val();
    let strCity= $('#txtCity').val();
    let strState= $('#txtState').val();
    let strZipCode= $('#txtZipCode').val();

    $.post(strBaseURL + '/farms', {
      streetAddress: strStreetAddress,
      streetAddress2: strStreetAddress2,
      city: strCity,
      state: strState,
      zipCode: strZipCode,
      FARMID: strFARMID
    }, function(result){
      console.log(result);
      if(result){  
        result = JSON.parse(result) 
        console.log(result);
        swal.fire({
          text: 'You have successfully signed up!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else{
        swal.fire({
          text: 'There was an error signing up. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
    $('#divLogin').show(500);
    $('#divSignUp2').hide(500);
  }
});
});

var emptyRow = "<tr><td colspan='4' class='text-center'> No Records Available</td></tr>";
        var emptyNewRow = "<tr class='trNewRow'>"; 
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
                const user =  $(this).parent().parent().find(".txtUser").val();
                $(this).parent().parent().find(".tdUser").html(""+user+""); 
                const title =  $(this).parent().parent().find(".txtTitle").val();
                $(this).parent().parent().find(".tdTitle").html(""+title+"");
                const payrate =  $(this).parent().parent().find(".txtPayRate").val();
                $(this).parent().parent().find(".tdPayRate").html(""+payrate+"");
                const effectiveDateTime =  $(this).parent().parent().find(".txtEffectiveDateTime").val();
                $(this).parent().parent().find(".tdEffectiveDateTime").html(""+effectiveDateTime+"");
                $(this).parent().parent().find(".tdAction").html(rowButtons);
            });
             
            
            $('#tblWorkers').on('click', '.btn-danger', function () { // registering function for delete button  
                $(this).parent().parent().remove();
                if ($("#tblWorkers tbody").children().children().length == 0) {
                    $("#tblWorkers tbody").append(emptyRow);
                }
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

          