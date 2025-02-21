// ADD HEADER
fetch('https://kay-who-codes.github.io/Kay-App-Assets/Full-Header.html')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load header');
    }
    return response.text();
  })
  .then(data => {
    document.getElementById('header').innerHTML = data;

    // Update the header link dynamically
    const headerLink = document.querySelector('.header-link');
    if (headerLink) {
      // Option 1: Extract from URL
      const pathSegments = window.location.pathname.split('/').filter(segment => segment);
      const repoName = pathSegments[0] || 'APP_NAME_GOES_HERE';
      const appName = repoName.replace(/-/g, ' ');
      
      headerLink.textContent = appName;
      headerLink.href = `https://github.com/kay-who-codes/${repoName}`;
    }

    // Add event listeners after injecting the header
    const dropbtn = document.querySelector('.dropbtn');
    if (dropbtn) {
      dropbtn.addEventListener('click', toggleDropdown);
    }

    // Close dropdown when clicking outside
    window.addEventListener('click', (event) => {
      const dropdown = document.querySelector('.dropdown');
      if (dropdown && !dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
      }
    });
  })
  .catch(error => {
    console.error('Error loading header:', error);
    document.getElementById('header').innerHTML = '<p>Header failed to load.</p>';
  });

// Toggle dropdown visibility
function toggleDropdown() {
  const dropdown = document.querySelector('.dropdown');
  dropdown.classList.toggle('show');
}