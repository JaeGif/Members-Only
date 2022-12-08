function newPost() {
  const newBtn = document.getElementById('new-post');
  const newPostModal = document.getElementById('new-post-modal');

  newBtn.addEventListener('click', () => {
    newPostModal.style.display = 'flex';
    newBtn.style.display = 'none';
  });
}
function deleteBtnModal() {
  const deleteModalInit = document.getElementsByClassName('delete-popup-init');
  const deleteModal = document.getElementsByClassName('delete-modal');
  const closeModal = document.getElementsByClassName('return-delete-btn');
  const editBtn = document.getElementsByClassName('edit-popup-init');

  for (let i = 0; i < deleteModalInit.length; i++) {
    deleteModalInit[i].addEventListener('click', () => {
      deleteModal[i].style.display = 'flex';
      deleteModalInit[i].style.display = 'none';
      closeModal[i].addEventListener('click', () => {
        deleteModal[i].style.display = 'none';
        deleteModalInit[i].style.display = 'flex';
      });
    });
  }
}
newPost();
deleteBtnModal();
