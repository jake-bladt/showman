function loadSubjects() {
  $.get('http://localhost:5600/api/subjects', data => console.log(data));
}

$(document).ready(() => {
  loadSubjects();  
});
