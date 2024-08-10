
var courseApi = 'http://localhost:3000/courses'


function start(){
  getCourses(renderCourses);
  handleCreateCourses()
}

start();

// functions
function getCourses(callback){
  fetch(courseApi)
    .then(response => response.json())
    .then(callback)
} 

function renderCourses(courses){
  var listCourses = document.querySelector('#list-courses')
  var htmls = courses.map((course)=> {
    return `
      <li class="course-item-${course.id}">
          <h2>${course.name}</h2>
          <p>${course.description}</p>
         <button onclick="handleDeleteCourse(${course.id})">Delete</button>
      </li> 
    `
  })
  listCourses.innerHTML = htmls.join('')
} 

function createCourses(data, callback){
    fetch(courseApi, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-token-here' // if authorization is needed
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data=> console.log(data))
    .catch(error => console.error('Error: ', error))
}

function handleCreateCourses(){
  var createBtn = document.getElementById('create')
  createBtn.onclick = function(){
   var id = document.querySelector('input[name="id"]').value
   var name = document.querySelector('input[name="name"]').value
   var description = document.querySelector('input[name="description"]').value
   var formData = {
     id: id,
     name: name,
     description: description
   }
  }
}

// function createCourses(data,callback){
//   fetch(courseApi, {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json', // Specify the content type
//     },
//     body: JSON.stringify(data),
//   })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error('Error:', error));
// }



function handleCreateForm(){
  var createBtn = document.querySelector('#create')
  createBtn.onclick = function(){
    var name = document.querySelector('input[name="name"]').value
    var description =  document.querySelector('input[name="description"]').value
    var formData = {
      name:name,
      description: description
    }
    createCourses(formData, function(){
      getCourses(renderCourses);
    })
  }
}


// function handleDeleteCourse(id){
//   var option = {
//     method: 'DELETE',
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }
//   fetch(courseApi + "/"+ id, option)
//     .then(response => response.json())
//     .then(function(){
//       var courseItem = document.querySelector('.course-item-'+id);
//       console.log(courseItem);
//       // if(courseItem){
//       //   courseItem.remove();
//       // }
//     });
// }





