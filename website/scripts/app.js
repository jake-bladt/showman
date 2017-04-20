function loadSubjects() {
  $.get('http://localhost:5600/subjects', data => console.log(data));
}

$(document).ready(() => {
  loadSubjects();  
});
