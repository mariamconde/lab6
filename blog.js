"use strict";

const MAX_LENGTH = 200;

const blogs = [
  {title: 'HTML Semantic Tags',
   date: new Date(2022, 7, 31),
   content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta cupiditate sint ullam fugiat fugit magni, aliquam quae voluptate, quo eos minima numquam repellendus rerum ipsa ea est. Maxime, dicta delectus eum a minus iure optio eveniet culpa, ipsum iste repellendus laudantium eos deserunt commodi animi distinctio ex hic? At amet dolore nemo accusamus nisi quae, ratione nam. Totam harum expedita temporibus dolore unde sed id debitis suscipit odio voluptates doloremque rem nobis aperiam quasi assumenda doloribus ad vero repellat, alias adipisci tenetur aspernatur vel. Culpa inventore architecto aspernatur dolor natus labore.'},
  {title: 'CSS Selectors',
  date: new Date(2022, 8, 9),
  content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, dolore? Eveniet numquam quam qui quae laboriosam maxime deleniti aperiam quasi culpa veniam, voluptatibus molestias soluta error ratione assumenda sunt. Sapiente doloribus, nulla a tempora assumenda nostrum est enim corporis fugit quasi ipsam eveniet distinctio impedit dolorum eum dolor. Distinctio, reiciendis!'},

  {title: 'Cascading',
  date: new Date(2022, 8, 12),
  content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum architecto provident exercitationem modi inventore obcaecati, fuga, fugiat vero quo iusto vitae minima perspiciatis dolorum incidunt ea dolorem laboriosam illo. Cupiditate est enim aut magni, doloribus animi, fuga inventore eveniet quaerat similique voluptate debitis ad possimus totam repellendus harum voluptatem sit adipisci velit quisquam praesentium sed corporis temporibus facere! Labore architecto deleniti deserunt voluptates velit, maxime ea nisi placeat, eius in reiciendis, saepe alias quidem dignissimos debitis quos tenetur natus. '}
]

blogs.forEach(blog=>{
  addEntry(blog);
});

function addEntry(blog) {

  
  const blogContainer = document.createElement('article');
  blogContainer.classList.add('post'); 
 
  const blogHeader = document.createElement('h3');
  blogHeader.classList.add('blog-header'); 
  blogHeader.textContent = blog.title; 
  blogContainer.append(blogHeader); 

  
  const blogDate = document.createElement('p');
  blogDate.textContent = blog.date.toLocaleDateString(); 
  blogContainer.append(blogDate); 

  
  const blogContent = document.createElement('p');
  blogContainer.append(blogContent); 

  
  if (blog.content.length > MAX_LENGTH) {
    
    blogContent.textContent = blog.content.substring(0, MAX_LENGTH);

    
    const ellipsis = document.createElement('span');
    ellipsis.textContent = '...';

    blogContent.append(ellipsis);

    
    const extraContent = document.createElement('span');
    extraContent.textContent = blog.content.substring(MAX_LENGTH);
    extraContent.classList.add('hide'); 
    blogContent.append(extraContent);

    
    const readMoreBtn = document.createElement('button');
    readMoreBtn.textContent = 'Read More';
    readMoreBtn.classList.add('more-less-btn'); 
    blogContainer.append(readMoreBtn);

    readMoreBtn.addEventListener('click', () => {
      const spans = blogContent.querySelectorAll('span');
      spans.forEach(span => span.classList.toggle('hide')); 
      readMoreBtn.textContent = readMoreBtn.textContent === 'Read More' ? 'Read Less' : 'Read More';
      
    });

  } else {
    
    blogContent.textContent = blog.content;
  }

  
  const removeBtn = document.createElement('button');
  removeBtn.textContent = '[x]';
  removeBtn.classList.add('delete-btn'); 
  blogHeader.append(removeBtn); 

  document.querySelector('.posts').append(blogContainer);

  const newBtn = document.querySelector('.new-btn');
  const newSection = document.querySelector('.new-section');

  
  newBtn.addEventListener('click', () => {
    newSection.classList.toggle('hide'); 
  });

 
  const postsElement = document.querySelector('.posts');
  postsElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
      
      const postElement = event.target.closest('.post');
      const blogTitle = postElement.querySelector('.blog-header').textContent;
      postElement.remove(); 
      const blogIndex = blogs.findIndex(blog => blog.title === blogTitle);
      if (blogIndex !== -1) {
        blogs.splice(blogIndex, 1); 
      }
    }
  });

  const submitBtn = document.querySelector('#submit-btn');

  submitBtn.addEventListener('click', (event) => {
    event.preventDefault(); 

    
    const isFormValid = document.querySelector('.new-form').reportValidity();
    const titleInput = document.querySelector('#title');
    const contentInput = document.querySelector('#content');
    if (isFormValid) {
      const title = titleInput.value;
      const content = contentInput.value;

      titleInput.value = ''; 
      contentInput.value = ''; 

      const date = new Date(); 

      
      const blog = { title, content, date: date };

      
      blogs.push(blog);

     
      addEntry(blog);
    }
  });
}

