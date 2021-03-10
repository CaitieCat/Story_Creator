
localStorage;// TODO: Decide what to do about this .ajax request for users /api/users
// const { newStory } = require('./public/scripts/helpers');

$(() => {
    console.log("test")
    const displayStories = function(){
      $.ajax({
      method: "GET",
      url: "http://localhost:8080/stories"
      }).done((stories) => {
        $(".stories-container").empty();
        loadStories(stories)
      });
    };

  displayStories();

  const loadStories = function(stories) {
    for (const each of stories){
      const storyResults = newStory(each);
      $(".story").prepend(storyResults);
    }
  }

  const newStory = function(story) {
    const $story = `
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
  `
   return $story;
  }
});
