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
};

module.exports = { newStory };
