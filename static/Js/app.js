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
      console.log(event.target.pathname);

      like_url = event.target.pathname;

      const xhr = new XMLHttpRequest();

      xhr.open("POST", like_url.true);

      xhr.setRequestHeader(
        'Content-type',
        'application/json'
      );

      xhr.onload = () => {
        if (this.status === 200) {
          console.log(`Seems like it was a success. ${this.responseText}`);
        } else {
          console.log("Something happened or rather something did not happen.")
        }
      }
      xhr.send()
    })
  })

})

// like_button.addEventListener('click', (event) => {
//   event.preventDefault()
//   console.log(event.target);
//   // let self = this
//   // url = 'ajax/like/'

// })