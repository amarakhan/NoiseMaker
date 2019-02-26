var noiseOn = false;
var firstNoise = true;

var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
var oscillator = audioCtx.createOscillator();

var temp;
var temp2;

var tones = {
    b1: 200,
    b2: 230,
    b3: 260,
    b4: 290,
    b5: 320,
    b6: 350,
    b7: 380,
    b8: 410,
    b9: 440
};

// var element = document.querySelector(".noise-button");
// document.addEventListener("click", function() {
//   toggleOsc();
// });


function toggleOsc() {
    temp = event.currentTarget;
    temp2 = event.currentTarget.id;
    temp.style.backgroundColor = "#" + ((1 << 24) * Math.random() | 0).toString(16);
    oscillator.frequency.setValueAtTime(tones[temp2], audioCtx.currentTime);
    if (firstNoise == true) {
        oscillator.connect(audioCtx.destination);
        oscillator.start();
        firstNoise = false;
        noiseOn = true;
    } else {
        if (noiseOn == false) {
            oscillator.connect(audioCtx.destination);
            noiseOn = true;
        }
        else {
          oscillator.disconnect();
          noiseOn = false;
        }
    }
}




var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/main.css',
  '/app.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }

          return fetch(event.request).then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // IMPORTANT: Clone the response. A response is a stream
              // and because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have two streams.
              var responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });

              return response;
            }
          );
        })
      );
  });
