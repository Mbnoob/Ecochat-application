let closeButtn = document.querySelector(".upper-controller");
let openNav = document.getElementById("habburger-menu-controller");
let left_menue = document.querySelector(".left-menu");
let right_container = document.querySelector(".right-container");
let button = document.getElementById("submit");
let input = document.getElementById("input-messages");
let form = document.getElementById("submitForms");
let selecetImages = document.getElementById("selcet-images");
let inputforImages = document.getElementById("imagesShare");
let emoji_btn = document.getElementById("emoji-btn");
let input_section  = document.querySelector('.input-secton');
let logout_btn = document.getElementById('logout-btn');
let alluser = document.querySelectorAll('.user1');
let titele = document.querySelector('.active-user-name');
let inputDiv = document.querySelector('.div-input');
let message_container = document.querySelector('.container-first');
let home_images = document.querySelector('.home-images');
let home_svg = document.querySelector('.home-images img');
let home_text = document.querySelector('.home-images p');
const cintainer_main = document.querySelector(".cintainer-main");

openNav.addEventListener("click", function () {
  if (left_menue.style.display == "none") {
    left_menue.style.display = "block";
  } else {
    left_menue.style.display = "none";
    openNav.style.display = "block";
    openNav.style.transition = 'all .2s ease-in-out';
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
  let text = input.value;
  
  if (text !== "") {
    button.style.background = "#3fa34d";
    button.disabled = false;
    document.getElementById("svg").style.fill = "white";
    input.style.width = '80%';
    button.style.right = '4px'
    anime({
      targets: emoji_btn,
      translateX: -60,
      easing: 'easeOutElastic(1, .5)'
    })

    anime({
      targets: selecetImages,
      translateX: 260,
      easing:'easeOutElastic(1, .5)'
    })
    
    anime({
      targets: input,
      translateX: -30,
      easing:'easeOutExpo'
    })
    
  } else {
    button.style.background = "transparent";
    button.style.bordercolor = "red";
    button.disabled = true;
    document.getElementById("svg").style.fill = "#b5b8c2";
    anime({
      targets: emoji_btn,
      translateX: 0,
      easing: 'easeOutExpo'
    })

    anime({
      targets: selecetImages,
      translateX: 0,
      easing:'easeOutExpo'
    })

    anime({
      targets: input,
      translateX: 0,
      easing:'easeOutExpo'
    })
  }
});

let animation;
$(window).on('load', function () {  
  animation =  anime({
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
    duration: 1400
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



// Images appened Function ............
function ImagesAppeend(imagesPosiion, sender, sendBy, result, exactTime) {
  const imagesposition = document.createElement("div");
  imagesposition.classList.add(imagesPosiion);

  const secontImagesDiv = document.createElement("div");
  secontImagesDiv.classList.add(sender);
  secontImagesDiv.insertAdjacentHTML("afterbegin", sendBy);
  let img = document.createElement("img");
  img.src = result;
  secontImagesDiv.appendChild(img);
  secontImagesDiv.insertAdjacentHTML("beforeend", `<p>${exactTime}</p>`);

  imagesposition.append(secontImagesDiv);
  cintainer_main.append(imagesposition);
}

let date = new Date();
let exactTime = date.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

// let userName;

// do {
//   userName = prompt("Enter Your Name To continue Chatting");
// } while (!userName);

// socket.emit("new-user-joined", userName);

// socket.on("user-joined", (userName) => {
//   append1(`<h6>${userName}, joined the chat..</h6>`, "joined-messages");
// });



// socket.on("recived", (data) => {
//   appnedFormessages(
//     "left-div",
//     "left-chatbox",
//     `<h4>${data.name}: </h4>`,
//    data.messages
//   );
// });

// socket.on("user-disconnected", (userName) => {
//   append1(`<h6>${userName}, Disconnected the chat..</h6>`, "joined-messages");
// });

// selecetImages.addEventListener("click", function () {
//   inputforImages.click();
// });

// inputforImages.addEventListener("change", () => {
//   file = inputforImages.files[0];
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = (e) => {
//     let result = e.target.result;
//     socket.emit("images", { result: result, time: exactTime });
//     ImagesAppeend(
//       "images-right",
//       "images-user",
//       `<h6>You:</h6>`,
//       result,
//       exactTime
//     );
//   };
// });

// socket.on("new-images", (data) => {
//   ImagesAppeend(
//     "images-left",
//     "images-user2",
//     `<h6>${data.name}: </h6>`,
//     data.data,
//     data.time
//   );
// });
