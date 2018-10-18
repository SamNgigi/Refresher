// function parse_cookies() {
//   var cookies = {};
//   if (document.cookie && document.cookie !== '') {
//     document.cookie.split(';').forEach(function (c) {
//       var m = c.trim().match(/(\w+)=(.*)/);
//       if (m !== undefined) {
//         cookies[m[1]] = decodeURIComponent(m[2]);
//       }
//     });
//   }
//   return cookies;
// }

// // console.log(parse_cookies())

// const cookies = parse_cookies()

// console.log("Hi there!");
const friend_ul = document.querySelector('.friend-list');

const user_list_objects = document.querySelector('.user-list').children;
user_list = Array.from(user_list_objects)
// * returns objects
console.log(typeof user_list_objects);
// * returns HTML collection
console.log(user_list_objects.constructor.name);
// console.log(typeof user_list);
user_list.forEach(element => {

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
      friend_id = event.target.getAttribute('data-id')
      // console.log(a_tag.textContent);

      // * Ternary statement to account for if like text is like or unlike
      a_tag.textContent = a_tag.textContent === 'follow' ? 'un-follow' : 'follow';
      // if (a_tag.textContent === 'follow') {
      //   a_tag.textContent = 'un-follow'
      // } else {
      //   a_tag.textContent = 'follow'
      // }

      follow_url = event.target.pathname;

      const xhr = new XMLHttpRequest();

      // const data = event.target.getAttribute('data-id')

      // * Making the request
      xhr.open("POST", follow_url, true);

      // * Passing django required csrf token
      xhr.setRequestHeader('X-CSRFToken', cookies['csrftoken']);

      //  * Vanilla Js equivalent of ajax success function
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 400) {
          let res_data = xhr.responseText;
          // * Converting data to js object
          let res = JSON.parse(res_data)
          let result = res['following']
          console.log(`Worked: ${res['success']}`);
          console.log(res['following']);

          while (friend_ul.firstChild) {
            friend_ul.removeChild(friend_ul.firstChild);
          }
          result.forEach((i) => {
            // console.log(i['fields']['username'])

            // friend_ul.remove()
            let friend = i['fields']['username']
            const friend_li = document.createElement('li');
            friend_li.appendChild(document.createTextNode(friend));
            friend_ul.appendChild(friend_li)


          })

          // console.log(`Currently following: ${result}}`);
          // console.log(typeof res['following'])
          // like_value.textContent = `${res['post_likes']} likes | `

        } else {
          console.log('Lets try again');
        }
      }
      // * Sends to back end
      xhr.send(friend_id);
      /*  
       * When we make a GET request, the send method has nothing to send.
       */

    })
  })

})