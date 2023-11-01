let closeButtn = document.querySelector(".upper-controller svg");
let openNav = document.getElementById("habburger-menu-controller");
let left_menue = document.querySelector(".left-menu");
let right_container = document.querySelector(".right-container");
let button = document.getElementById("submit");
let input = document.getElementById("input-messages");
let form = document.getElementById("submitForms");
let selecetImages = document.getElementById("selcet-images");
let inputforImages = document.getElementById("imagesShare");
let input_section  = document.querySelector('.input-secton');
let logout_btn = document.getElementById('logout-btn');
let alluser = document.querySelectorAll('.user1');
let titele = document.querySelector('.active-user-name');
let inputDiv = document.querySelector('.div-input');
let message_container = document.querySelector('.container-first');
let home_images = document.querySelector('.home-images');
let home_svg = document.getElementById('home-svg');
let home_text = document.querySelector('.home-images p');
let arrow_git = document.getElementById('arrow-gif');
const cintainer_main = document.querySelector(".cintainer-main");
let emoji_btn = document.getElementById("emoji-btn");
let emoji_svg = document.querySelector('#emoji-btn svg');
let emoji_container = document.getElementById('emoji-container');
let emoji_lists = document.getElementById('emojis-list');
  //Ower Profile pic view
  let owner_div = document.querySelector('.main-user-profile');
  let onwer_img = document.getElementById('ower-pic-img');

// Start here.................

openNav.addEventListener("click", function () {
  if (left_menue.style.display == "none") {
    left_menue.style.display = "block";
    $(function() {
      $('[data-toggle="tooltip"]').tooltip('hide');
    });
  } else {
    left_menue.style.display = "none";
    openNav.style.display = "block";
  }
});

closeButtn.addEventListener("click", function () {
  if (left_menue.style.display == "block") {
    left_menue.style.display = "none";
    openNav.style.display = "block";
  } else {
    left_menue.style.display = "block";
  }
});

input.addEventListener("input", function () {
  if (input.value !== "") {
    input_button_working();
  } else {
    input_button_disable();
  }
});

function input_button_working() {
    button.style.background = "#3fa34d";
    button.disabled = false;
    document.getElementById("svg").style.fill = "white";
    button.style.right = '4px'
}

function input_button_disable() {
  button.style.background = "transparent";
  button.disabled = true;
  document.getElementById("svg").style.fill = "#817f7f";
}

$(window).on('load', function () {  
  anime({
    targets: arrow_git,
    translateX: 0,
    easing: 'easeInOutQuad'
  });

  anime({
    targets: home_text,
    keyframes: [
      {translateY: -5},
      {translateY: 0},
    ],
    duration: 1600,
    easing: 'easeInOutQuad',
    loop: true
  });

  anime({
    targets: home_svg,
    translateY: 0,
    duration: 1400,
    delay: 2000
  });

  $(logout_btn).confirm({
    title: 'Confirm that!',
    content: 'Are You Sure You Want To Continue',
    containerFluid: true,
    typeAnimated: true,
    draggable: true,
    type: 'red',
    icon: "bi bi-check-circle-fill",
    autoClose: 'close|10000',
    buttons: {
        confirm: {
            text: 'Yes, Logout',
            btnClass: 'btn-red',
            action: function(){
            $('#logout-submit').submit();
            }
        },
        close: function () {
        }
    }
});
});

// append Function for new user joined.......

function append1(messages, position) {
  let html = messages;
  const messageElement = document.createElement("div");
  messageElement.classList.add(position);

  let secondDiv = document.createElement("div");
  secondDiv.classList.add("userAdd-notify");
  secondDiv.insertAdjacentHTML("afterbegin", html);

  messageElement.append(secondDiv);
  cintainer_main.append(messageElement);
}

let date = new Date();
let exactTime = date.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});
