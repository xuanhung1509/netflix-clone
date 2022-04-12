// Set app height
const root = document.querySelector(':root');
root.style.setProperty('--app-height', window.outerHeight + 'px');

// FAQ collapsible
const collapsible = document.querySelectorAll('.collapsible');

// Toggle content
const toggleContent = (content) => {
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + 'px';
  }
};

// Collapse all open content
const collapseAllOpenContent = () => {
  collapsible.forEach((item) => {
    if (item.classList.contains('active')) {
      item.classList.remove('active');
      toggleContent(item.nextElementSibling);
    }
  });
};

collapsible.forEach((item) => {
  item.addEventListener('click', () => {
    let content = item.nextElementSibling;

    // Collapse all other content if current item is not active
    if (!item.classList.contains('active')) {
      collapseAllOpenContent();
    }

    item.classList.toggle('active');
    toggleContent(content);
  });
});
