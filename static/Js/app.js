function parse_cookies() {
  var cookies = {};
  if (document.cookie && document.cookie !== '') {
    document.cookie.split(';').forEach(function (c) {
      var m = c.trim().match(/(\w+)=(.*)/);
      if (m !== undefined) {
        cookies[m[1]] = decodeURIComponent(m[2]);
      }
    });
  }
  return cookies;
}

console.log(parse_cookies())

const cookies = parse_cookies()

console.log("Hi there!");
const post_list_objects = document.querySelector('.post-list').children;
post_list = Array.from(post_list_objects)
// * returns objects
console.log(typeof post_list_objects);
// * returns HTML collection
console.log(post_list_objects.constructor.name);
// console.log(typeof post_list);
post_list.forEach(element => {

  almost_there = element.lastElementChild.children;
  // console.log(almost_there);

  [...almost_there].forEach(a_tag => {
    // console.log(a_tag.getAttribute('data-id'));
    // like_btn = a_tag.getAttribute('data-id');



    // console.log(a_tag);

    a_tag.addEventListener('click', (event) => {
      event.preventDefault();
      // Data attribute
      // console.log(event.target.getAttribute('data-id'));
      // Below we return the exact path.
      post_id = event.target.getAttribute('data-id')
      console.log(a_tag.previousSibling.textContent);

      like_url = event.target.pathname;

      like_value = a_tag.previousSibling

      $.ajax({
        'type': "POST",
        'url': like_url,
        'headers': {
          "X-CSRFToken": cookies['csrftoken']
        },
        'data': post_id,
        success: (whatever) => {
          // console.log(whatever['success']);
          // console.log(whatever['post_likes']);
          like_value.textContent = `${whatever['post_likes']} likes | `
        }
      })

      // const xhr = new XMLHttpRequest();

      // const data = event.target.getAttribute('data-id')


      // xhr.open("POST", like_url, true);

      // xhr.setRequestHeader(
      //   'X-CSRFToken', cookies['csrftoken']
      // );

      // xhr.send('postID=' + encodeURIComponent(data));
    })
  })

})

// like_button.addEventListener('click', (event) => {
//   event.preventDefault()
//   console.log(event.target);
//   // let self = this
//   // url = 'ajax/like/'

// })