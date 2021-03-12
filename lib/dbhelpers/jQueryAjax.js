// const { storyCompleted } = require ('/stories_db_helper');

$(document).ready(function(db) {

  $(".complete").click(function(event) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "/stories/:id/statusUpdate"
      }
      .done(function (res){
        res.redirect("/stories");
      })
      .fail(function (){
        alert("Did not mark completed");
      })
    )}
  )})
