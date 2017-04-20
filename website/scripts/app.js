let viewModel = {
  title: 'Gallery Subjects',
  subjects: []
}

function loadSubjects() {
  $.get('http://localhost:5600/api/subjects', data => {
    viewModel.subjects = data;
    ko.applyBindings(viewModel);
  });
}

$(document).ready(() => {
  loadSubjects();  
});
