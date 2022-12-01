function newPost() {
  const newBtn = document.getElementById('new-post');
  const newPostModal = document.getElementById('new-post-modal');

  newBtn.addEventListener('click', () => {
    newPostModal.style.display = 'flex';
    newBtn.style.display = 'none';
  });
}
newPost();
