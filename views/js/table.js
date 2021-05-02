$(document).ready(function () {
  draw_table();
});


function draw_table() {

  $("#results").empty();

  $.getJSONuncached = function (url) {

    return $.ajax(
      {
        url: url,
        type: 'GET',
        cache: false,
        success: function (data) {
          $("#results").append(data);
          select_row();
        }
      });
  };

  $.getJSONuncached("/books");

};


function select_row() {

  $("#menuTable tbody tr").click(function () {

    let id;

    //selet a row
    $(".selected").removeClass("selected");
    $(this).addClass("selected");
    console.log(".selected: " + $(".selected").closest('tr').text());

    //Display a row in update form 
    //just to help user get some basic info before update form submission.
    //That means, when actually updating a row, 
    //the function update_row() will check and take the latest values only
    //from the update form
    document.forms[1].id.value = $(this).children("TD")[0].innerHTML;
    document.forms[1].title.value = $(this).children("TD")[1].innerHTML;
    document.forms[1].author.value = $(this).children("TD")[2].innerHTML;
    document.forms[1].price.value = $(this).children("TD")[3].innerHTML;
    
    //init id that will be used when updating a doc
    // id = document.forms[1].id.value;

    //create: just remove the selected row 
    //since post will be done directly between the post form in front end and the server
    if ($("#CRUD_option").val() == 0) {
      $(".selected").removeClass("selected");
      
    }

    //update
    if ($("#CRUD_option").val() == 1) {

      update_row();
    }

    //delete
    if ($("#CRUD_option").val() == 2) {
      //init id from the selected row in table
      // id = $(this).children("TD")[0].innerHTML;
      // console.log("id to delete: " + id)
      // delete_row(id);

      delete_row();
    }

  })

};


function update_row() {

  $("#updateSubmit").click(function (e) {
    // e.stopImmediatePropagation();
    e.preventDefault();
  
    $.ajax(
      {
        //take the lastest ID value in the update form only
        url: "/books/" + document.forms[1].id.value,
        method: 'PUT',  //type: "PUT",

        data:
        {

          /**
           * retrieve the latest values that user has put into update form  
           * on $("#updateSubmit").click.
           * and then send this (which will be req.body) to the server.
           * 
           * BTW, id and name don't need to be in this data body
           * since those will be first found from the url above
           * and don't need to be changed
           */

          //id:  document.forms[1].id.value,
          //name: document.forms[1].name.value,   
          title: document.forms[1].title.value,
          author: document.forms[1].author.value,
          price: document.forms[1].price.value

        },
        cache: false,
        // success: setTimeout(draw_table(), 1000)  //this gives some error
        success: setTimeout(window.location.reload(),1000)
      })

    $(".selected").removeClass("selected");

  })

};


// function delete_row(id) {
  function delete_row() {

  $("#delete").click(function (e) {
    e.stopImmediatePropagation();
    // e.preventDefault();

    //take the lastest ID value from the selected row only
    const id = $(".selected").children("TD")[0].innerHTML;
    console.log("id to delete: " + id)

    $.ajax(
      {
        url: "/books/" + id,
        method: 'DELETE',

        data:
          { id: id },
        cache: false,
        success: setTimeout(window.location.reload(), 2000)
        // success: setTimeout(draw_table, 1000), //this give an error
      })

    
    $(".selected").removeClass("selected");

  })

};

function change_CRUD_option(value) {

  if (value == 0) {
    $(".selected").removeClass("selected");
    $('#formCreation').show();
    $('#formUpdate').hide();
    $('#delete').hide();

    document.forms[0].id.value = null;
    document.forms[0].title.value = null;
    document.forms[0].author.value = null;
    document.forms[0].price.value = null;

    document.forms[1].id.value = null;
    document.forms[1].title.value = null;
    document.forms[1].author.value = null;
    document.forms[1].price.value = null;
  }

  if (value == 1) {
    $(".selected").removeClass("selected");
    $('#formCreation').hide();
    $('#formUpdate').show();
    $('#delete').hide();
    $('#del-text-muted').hide();

    document.forms[0].id.value = null;
    document.forms[0].title.value = null;
    document.forms[0].author.value = null;
    document.forms[0].price.value = null;

    document.forms[1].id.value = null;
    document.forms[1].title.value = null;
    document.forms[1].author.value = null;
    document.forms[1].price.value = null;
  }
  if (value == 2) {

    $('#formCreation').hide();
    $('#formUpdate').hide();
    $('#delete').show();
    $(".selected").removeClass("selected");
    $('#del-text-muted').show();

    document.forms[0].id.value = null;
    document.forms[0].title.value = null;
    document.forms[0].author.value = null;
    document.forms[0].price.value = null;

    document.forms[1].id.value = null;
    document.forms[1].title.value = null;
    document.forms[1].author.value = null;
    document.forms[1].price.value = null;
  }

}

function changeSection(value) {

  if (value == 'Fiction') {
    console.log(value);
    $('#sectionFiction').show();
    $(".selected").removeClass("selected");
    document.forms[0].name.value = "FICTION";
    document.forms[1].name.value = "FICTION";


    $('#sectionSF').hide();
    $('#sectionIT').hide();

    document.forms[0].id.value = null;
    document.forms[0].title.value = null;
    document.forms[0].author.value = null;
    document.forms[0].price.value = null;

    document.forms[1].id.value = null;
    document.forms[1].title.value = null;
    document.forms[1].author.value = null;
    document.forms[1].price.value = null;

  }

  if (value == 'SF') {
    console.log(value);
    $('#sectionSF').show();
    $(".selected").removeClass("selected");
    document.forms[0].name.value = "SF";
    document.forms[1].name.value = "SF";

    $('#sectionFiction').hide();
    $('#sectionIT').hide();

    document.forms[0].id.value = null;
    document.forms[0].title.value = null;
    document.forms[0].author.value = null;
    document.forms[0].price.value = null;

    document.forms[1].id.value = null;
    document.forms[1].title.value = null;
    document.forms[1].author.value = null;
    document.forms[1].price.value = null;
  }

  if (value == 'IT') {
    console.log(value);
    $('#sectionIT').show();
    $(".selected").removeClass("selected");
    document.forms[0].name.value = "IT";
    document.forms[1].name.value = "IT";

    $('#sectionFiction').hide();
    $('#sectionSF').hide();


    document.forms[0].id.value = null;
    document.forms[0].title.value = null;
    document.forms[0].author.value = null;
    document.forms[0].price.value = null;

    document.forms[1].id.value = null;
    document.forms[1].title.value = null;
    document.forms[1].author.value = null;
    document.forms[1].price.value = null;
  }
};



