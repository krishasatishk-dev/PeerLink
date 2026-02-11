// Array to store students
let students = [];

// Add student
function addStudent() {
  const name = document.getElementById('name').value;
  const department = document.getElementById('department').value;
  const skills = document.getElementById('skills').value.split(',').map(s => s.trim());
  const lookingFor = document.getElementById('lookingFor').value.split(',').map(s => s.trim());

  if (!name || !department) {
    alert("Name and Department are required!");
    return;
  }

  const images = ['images/student1.png','images/student2.png','images/student3.png'];
  const avatar = images[Math.floor(Math.random() * images.length)];

  students.push({ name, department, skills, lookingFor, avatar });
  alert(`${name} added to PeerLink!`);

  // Clear inputs
  document.getElementById('name').value = '';
  document.getElementById('department').value = '';
  document.getElementById('skills').value = '';
  document.getElementById('lookingFor').value = '';
}

// Show all profiles and highlight matches
function showMatches() {
  const container = document.getElementById('matchesList');
  container.innerHTML = '';

  if (students.length === 0) {
    container.innerHTML = "<p>No profiles yet!</p>";
    return;
  }

  students.forEach(student => {
    // Find matches for this student
    const matches = students.filter(other => 
      other !== student &&
      other.department === student.department &&
      other.skills.some(skill => student.lookingFor.includes(skill))
    );

    const card = document.createElement('div');
    card.className = 'student-card';

    card.innerHTML = `
      <img src="${student.avatar}" alt="avatar">
      <h3>${student.name}</h3>
      <p><strong>Department:</strong> ${student.department}</p>
      <p><strong>Skills:</strong> ${student.skills.join(', ')}</p>
      <p><strong>Looking for:</strong> ${student.lookingFor.join(', ')}</p>
      <p><strong>Matches:</strong> ${matches.length > 0 ? matches.map(m => m.name).join(', ') : 'None'}</p>
    `;

    container.appendChild(card);
  });
}

