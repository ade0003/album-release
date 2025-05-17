document.addEventListener("DOMContentLoaded", () => {
  const collageContainer = document.getElementById("collage-container");
  const audio1 = document.getElementById("video1");
  const audio3 = document.getElementById("video3");

  // Set lower volume for the first audio
  audio1.volume = 0.3; // 30% volume

  // Array of image filenames
  const baseImages = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
    "11.png",
    "12.png",
    "13.png",
  ];

  // Show the overlay immediately
  showPlayOverlay();

  // Fill the screen with more images (duplicates for chaos)
  const images = [];
  const numImages = 100; // Increased from 64 to 100 for more chaos
  for (let i = 0; i < numImages; i++) {
    images.push(baseImages[Math.floor(Math.random() * baseImages.length)]);
  }

  // Array of animation classes with faster speeds
  const animations = [
    "animate-float-fast",
    "animate-spin-fast",
    "animate-bounce-fast",
    "animate-pulse-fast",
    "animate-wiggle-fast",
    "animate-wander-fast",
    "animate-zoom-fast",
    "animate-shake-fast",
  ];

  // Staggered image appearance with faster timing
  function showImagesStaggered() {
    images.forEach((imageSrc, index) => {
      setTimeout(() => {
        const img = document.createElement("img");
        img.src = imageSrc;
        img.className = "collage-image";
        img.style.opacity = 0;
        img.style.transition = "opacity 0.3s, transform 0.1s"; // Faster transition

        // Random size (smaller range for more chaos)
        const minSize = 80;
        const maxSize = 280;
        const size = Math.random() * (maxSize - minSize) + minSize;
        img.style.width = `${size}px`;
        img.style.height = "auto";

        // Random position (cover the whole screen)
        const x = Math.random() * (window.innerWidth - size);
        const y = Math.random() * (window.innerHeight - size);

        // Random animation
        const randomAnimation =
          animations[Math.floor(Math.random() * animations.length)];
        img.classList.add(randomAnimation);

        // Random rotation with more extreme angles
        const rotation = Math.random() * 720 - 360; // -360 to 360 degrees
        img.style.transform = `rotate(${rotation}deg)`;

        // Random z-index for more chaos
        img.style.zIndex = Math.floor(Math.random() * 100) + 2;

        img.style.left = `${x}px`;
        img.style.top = `${y}px`;

        collageContainer.appendChild(img);
        // Fade in faster
        setTimeout(() => {
          img.style.opacity = 1;
        }, 20);
      }, Math.random() * 600 + index * 40); // Faster staggered appearance
    });
  }

  // --- AUDIO AUTOPLAY CHAOS ---
  function tryAutoplay() {
    // Try to play all audio simultaneously
    const playPromises = [audio1.play(), audio3.play()];

    Promise.all(playPromises)
      .then(() => {
        // Set up continuous playback
        setupAudioLoop();
      })
      .catch(() => {
        // If autoplay fails, show a big overlay button
        showPlayOverlay();
      });
  }

  function setupAudioLoop() {
    // Set up continuous playback for each audio
    audio1.loop = true;
    audio3.loop = true;

    // Ensure audio keeps playing
    audio1.addEventListener("ended", () => {
      audio1.currentTime = 0;
      audio1.play();
    });

    audio3.addEventListener("ended", () => {
      audio3.currentTime = 0;
      audio3.play();
    });
  }

  function showPlayOverlay() {
    if (document.getElementById("play-overlay")) return;
    const overlay = document.createElement("div");
    overlay.id = "play-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "url(13.png) no-repeat center center";
    overlay.style.zIndex = 9999;
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.cursor = "pointer";
    overlay.innerHTML =
      '<button style="padding: 10px 20px; font-size: 1.5vw; background-color: #ff0000; color: white; border: none; border-radius: 5px;">Start Album Release Party</button>';
    overlay.onclick = () => {
      overlay.remove();
      // Play all audio simultaneously
      const playPromises = [audio1.play(), audio3.play()];

      Promise.all(playPromises)
        .then(() => {
          setupAudioLoop();
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
        });

      // Request full screen
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        // Safari
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        // IE11
        document.documentElement.msRequestFullscreen();
      }
      // Start showing images after clicking
      showImagesStaggered();
    };
    document.body.appendChild(overlay);
  }

  tryAutoplay();
  setupAudioLoop();

  // Make audio start together when one is paused
  audio1.addEventListener("pause", () => {
    if (!audio3.paused) audio3.pause();
  });
  audio3.addEventListener("pause", () => {
    if (!audio1.paused) audio1.pause();
  });

  // Handle window resize (re-randomize positions)
  window.addEventListener("resize", () => {
    const images = document.querySelectorAll(".collage-image");
    images.forEach((img) => {
      const size = img.offsetWidth;
      const x = Math.random() * (window.innerWidth - size);
      const y = Math.random() * (window.innerHeight - size);
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
    });
  });
});
