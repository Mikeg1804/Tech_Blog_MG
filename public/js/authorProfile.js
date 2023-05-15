const $blogsubmitBtn = document.getElementById('blogsubmitBtn');
const $logoutBtn = document.getElementById('logoutBtn');
const $blogInput = document.getElementById('blogInput');


$blogsubmitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
  console.log("CLICKED BLOG")
    if ($blogInput.value.trim() === '') {
      return alert('Please type your blog content');
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
      const response = await fetch('/api/authors/logout', {
        method: 'POST',
      });
      const data = await response.json();
      location.href = '/login';
    } catch (error) {
      alert(error);
    }
  });
  }