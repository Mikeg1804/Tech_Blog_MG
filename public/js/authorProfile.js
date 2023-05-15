const $todosubmitBtn = document.getElementById('blogsubmitBtn');
const $logoutBtn = document.getElementById('logoutBtn');
const $blogInput = document.getElementById('blogInput');


$blogsubmitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
  
    if ($blogInput.value.trim() === '') {
      return alert('Please enter a todo');
    }
  
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify({content: $blogInput.value}),
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      const data = await response.json();
      location.reload();
  
    } catch (error) {
      console.log(error);
    }
  
  
  });







if ($logoutBtn) {
  $logoutBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
      });
      const data = await response.json();
      location.href = '/login';
    } catch (error) {
      alert(error);
    }
  });
  }