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

// console.log(parse_cookies())

const cookies = parse_cookies()

// console.log("Hi there!");
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
      // console.log(a_tag.textContent);

      // * Ternary statement to account for if like text is like or unlike
      a_tag.textContent = a_tag.textContent === 'like' ? 'unlike' : 'like';

      like_url = event.target.pathname;

      like_value = a_tag.previousSibling

      const xhr = new XMLHttpRequest();

      // const data = event.target.getAttribute('data-id')

      // * Making the request
      xhr.open("POST", like_url, true);

      // * Passing django required csrf token
      xhr.setRequestHeader('X-CSRFToken', cookies['csrftoken']);

      //  * Vanilla Js equivalent of ajax success function
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 400) {
          let res_data = xhr.responseText;
          // * Converting data to js object
          let res = JSON.parse(res_data)
          console.log(`Worked: ${res['success']}`);
          console.log(`New likes: ${res['post_likes']}`);
          like_value.textContent = `${res['post_likes']} likes | `
        } else {
          console.log('Lets try again');
        }
      }
      // * Sends to back end
      xhr.send(post_id);
      /*  
       * When we make a GET request, the send method has nothing to send.
       */

    })
  })

})