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

  $("#menuTable tbody tr[entree]").click(function () {

    let id;

    //selet a row
    $(".selected").removeClass("selected");
    $(this).addClass("selected");
    console.log(".selected: " + $(".selected").closest('tr').text());

    //display a row in update form
    //to help user get some basic info before update form submission
    document.forms[1].id.value = $(this).children("TD")[1].innerHTML;
    document.forms[1].title.value = $(this).children("TD")[2].innerHTML;
    document.forms[1].author.value = $(this).children("TD")[3].innerHTML;
    document.forms[1].price.value = $(this).children("TD")[4].innerHTML;
    
    //init id that will be used when updating a doc
    id = document.forms[1].id.value;

    //create: just remove the selected row 
    //since post will be done directly between the post form in front end and the server
    if ($("#CRUD_option").val() == 0) {
      $(".selected").removeClass("selected");
      
    }

    //update
    if ($("#CRUD_option").val() == 1) {
      update_row(id);
      
    }

    //delete
    if ($("#CRUD_option").val() == 2) {
      //init id from the selected row in table
      id = $(this).children("TD")[1].innerHTML;
      console.log("id to delete: " + id)
      delete_row(id);
    }

  })

};


function update_row(id) {

  $("#updateSubmit").click(function (e) {
    // e.stopImmediatePropagation();
    e.preventDefault();

    $.ajax(
      {
        url: "/books/" + id,
        method: 'PUT',  //type: "PUT",

        data:
        {

          /**
           * retrieve the latest values that user has put into update form  
           * on $("#updateSubmit").click.
           * and then send this req.body to the server
           * 
           * id and name are commented out and are not sent to the server
           * since no need to update them.
           * (name which is one of the section names; FICTION, SF or IT
           *  can be sent to the server and update works in mongodb and api.
           *  but any doc whose value of the name field is not one of FICTION, SF or IT
           *  won't be loaded in front-end since the front-end is designed to do so, 
           *  it will still be in db though)
           */

          // id:  id,  //or id:  document.forms[1].id.value,
          // name: document.forms[1].name.value,   
          title: document.forms[1].title.value,
          author: document.forms[1].author.value,
          price: document.forms[1].price.value

        },
        cache: false,
        // success: setTimeout(draw_table(), 1000)  //this gives some error
        success: setTimeout(window.location.reload(), 1000)
      })

    $(".selected").removeClass("selected");

  })

};


function delete_row(id) {

  $("#delete").click(function (e) {
    e.stopImmediatePropagation();
    // e.preventDefault();

    $.ajax(
      {
        url: "/books/" + id,
        method: 'DELETE',

        data:
          { id: id },
        cache: false,
        success: setTimeout(window.location.reload(), 1000),
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
    $('#menuTable input[type=checkbox]').attr('disabled', 'true');

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
    $('#menuTable input[type=checkbox]').attr('disabled', 'true');

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
    $('#menuTable input[type=checkbox]').attr('disabled', 'true');

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

function loadMore(sectionSelected) {

  console.log("[sectionSelected]");
  console.log(sectionSelected);
  // console.log("loadSetSize: " + loadSetSize);

  let x = sectionSelected.children;
  let currAndNextLoadSet = [];
  let txt = "";
  let i, j, currLoadSetNum = 0, temp_i;

  for (i = 0; i < x.length; i++) {
    for (j = 0; j < x[i].attributes.length; j++) {
      if (x[i].attributes[j].name == 'style' && x[i].attributes[j].value == 'display: table-row;') {
        currLoadSetNum = x[i].attributes[j + 1].value;
        currAndNextLoadSet.push(i);

      }
      else {
        if (x[i].attributes[j].name == 'prevloadset' && x[i].attributes[j].value == currLoadSetNum) {
          currAndNextLoadSet.push(i);
          // currLoadSetNum = 0;
        }
      }
    }
  }
  console.log("currAndNextLoadSetIndex: " + currAndNextLoadSet);

  for (temp_i = 0; temp_i < currAndNextLoadSet.length; temp_i++) {
    //txt = txt + x[temp_i] + "\n";
    $(x[temp_i]).css('display', 'table-row');

    //hide "Load More" btn
    if (currAndNextLoadSet.length == x.length - 1) {
      // $('#loadMore').hide();
      $(x[x.length - 1]).css('display', 'none');
    }
  }
  //console.log("txt : " + txt );
}



