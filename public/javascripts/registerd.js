

let registard_password_input = document.getElementById('Passwords-input2');
let registard_confmPassword_input = document.getElementById('Passwords-input');
let eye_icon_1 = document.getElementById('eye-seen1');
let eye_icon_2 = document.getElementById('eye-seen2');

eye_icon_1.addEventListener('click', ()=>{
    if (registard_password_input.type === 'password') {
        registard_password_input.type = 'text';
        eye_icon_1.innerHTML = '<i class="bi bi-eye-slash-fill" style="font-size: 18px;" id="eye-hide"></i>';
    } else {
        registard_password_input.type = 'password';
        eye_icon_1.innerHTML = '<i class="bi bi-eye-fill" style="font-size: 18px;"></i>'
    }
});

eye_icon_2.addEventListener('click', ()=>{
    if (registard_confmPassword_input.type === 'password') {
        registard_confmPassword_input.type = 'text';
        eye_icon_2.innerHTML = '<i class="bi bi-eye-slash-fill" style="font-size: 18px;" id="eye-hide"></i>';
    } else {
        registard_confmPassword_input.type = 'password';
        eye_icon_2.innerHTML = '<i class="bi bi-eye-fill" style="font-size: 18px;"></i>'
    }
});
