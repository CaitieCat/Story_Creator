// TODO: Decide what to do about this .ajax request for users /api/users

// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(const user of users) {
//       $("<div>").text(user.user_name).appendTo($("body"));
//     }
//   });;
// });

$(() => {

  const $newStoryForm = $(`
  <form action="/api/stories" method="post" id="new-story-form" class="new-story-form">
      <div class="new-story-form__field-wrapper">
        <label for="new-story-form__title">Title</label>
        <input type="text" name="title" placeholder="Title" id="new-story-form__title">
      </div>
      
      <div class="new-story-form__field-wrapper">
        <label for="new-story-form__content">Content</label>
        <textarea placeholder="Content" name="content" id="story-form__content" cols="30" rows="10"></textarea>
      </div>        
    </form>
  `);

  window.$newStoryForm = $newStoryForm;

  $newStoryForm.on('submit', function (event) {
    event.preventDefault();

    views_manager.show('none');

    const data = $(this).serialize();
    submitStory(data)
    .then(() => {
      views_manager.show('stories');
    })
    .catch((error) => {
      console.error(error);
      views_manager.show('stories');
    })
  });

  $('body').on('click', '#story-form__cancel', function() {
    views_manager.show('stories');
    return false;
  });
  
});