
let preloader = document.getElementById('preloader');

  window.addEventListener('load', function () {
    bodymovin.loadAnimation({
        container: preloader, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/src/data (1).json' // the path to the animation json
    });
    setTimeout(() => {
          $(preloader).hide();
          $(preloader).html('')
      }, 2000);
  })