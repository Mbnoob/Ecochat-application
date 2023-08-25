// Password Seen and hide............

let from = document.getElementById('signin-form');
let eye_seen = document.getElementById('eye-seen');
let passwordInput = document.getElementById('exampleInputPassword1');

eye_seen.addEventListener('click', ()=>{
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eye_seen.innerHTML = '<i class="bi bi-eye-slash-fill" style="font-size: 18px;" id="eye-hide"></i>';
    } else {
        passwordInput.type = 'password';
        eye_seen.innerHTML = '<i class="bi bi-eye-fill" style="font-size: 18px;"></i>'
    }
})

// from.addEventListener('submit', (e)=>{
//     e.preventDefault();
// })