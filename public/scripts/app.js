const stories = require("../../routes/stories");

localStorage;// TODO: Decide what to do about this .ajax request for users /api/users
// const { newStory } = require('./public/scripts/helpers');

$(() => {
    console.log("test")

  const loadStories = function(listOfStories) {
    for (const each of listOfStories){
      const storyResults = newStory(each);
      $(".incomplete-stories").prepend(storyResults);
    }
  }

  const newStory = function(story) {
    const story = `
    <div class="story">
          <header>
            <a href="/stories/${story.id}">${story.title}</a>
            <button>Delete</button>
          </header>
          <p>${story.theme}</p>
          <hr>
          <footer>
            <p>${story.user_name}</p>
            <p>${story.created_at}</p>
          </footer>
        </div>
  `;
   return story;
  }

  const displayStories = function(){
    $.ajax({
    method: "GET",
    url: "http://localhost:8080/stories"
    })
    .done((stories) => {
      $(".stories-container").empty();
      console.log(stories);
      loadStories(stories);
    })
    .fail(function () {
      alert("Story not found");
    });
  };

displayStories();

  $("#submit").on("submit", function(event) { 
    // prevent the default behavior of the form submission
    event.preventDefault();
    const content = $(this).serialize();
    if (content === 'text=' || content === null ){
      $(".errorMessage").slideDown();
      setTimeout(()=>{
        $(".errorMessage").slideUp();
      }, 4000)
      event.stopPropagation();
    } else {
      $.post( "/stories", content )
      .then (() => {
        $(".errorMessage").slideUp();
        displayStories();
      });
    }
  });
});

