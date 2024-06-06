let token = sessionStorage.getItem('token');

if (!token) {
    alert('You are not logged in. Please try again');
    window.location.href = '/views/index.html';
}

