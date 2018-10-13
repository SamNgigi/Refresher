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
    like_btn = a_tag.getAttribute('data-id');



    // console.log(a_tag);

    a_tag.addEventListener('click', (event) => {
      event.preventDefault();
      console.log(event.target.getAttribute('data-id'));
      // console.log(event)
    })
  })

})

// like_button.addEventListener('click', (event) => {
//   event.preventDefault()
//   console.log(event.target);
//   // let self = this
//   // url = 'ajax/like/'

// })