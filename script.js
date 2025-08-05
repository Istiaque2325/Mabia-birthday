document.addEventListener('DOMContentLoaded', function() {
    // Start music automatically (muted due to browser autoplay policies)
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.volume = 0.5;
    
    // Unmute music when user interacts
    function unmuteMusic() {
        bgMusic.play().then(() => {
            console.log('Music started');
        }).catch(error => {
            console.log('Autoplay prevented:', error);
        });
        document.removeEventListener('click', unmuteMusic);
    }
    
    document.addEventListener('click', unmuteMusic);
    
    // Toggle music control
    window.toggleMusic = function() {
        if (bgMusic.paused) {
            bgMusic.play();
        } else {
            bgMusic.pause();
        }
    }
    
    // Animate poem lines
    const poemLines = document.querySelectorAll('.poem-line');
    poemLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.animation = 'fadeIn 1.5s forwards';
        }, index * 1500); // Each line appears 1.5s after the previous
    });
    
    // Animate wish lines after poem is done
    const poemDuration = poemLines.length * 1500 + 3000;
    
    setTimeout(() => {
        const wishLines = document.querySelectorAll('.wish p');
        wishLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.animation = 'fadeIn 1.5s forwards';
            }, index * 1000);
        });
        
        // Animate gallery photos
        const galleryPhotos = document.querySelectorAll('.gallery-photo');
        galleryPhotos.forEach((photo, index) => {
            setTimeout(() => {
                photo.style.opacity = '1';
                photo.style.transform = 'scale(1)';
            }, index * 300);
        });
    }, poemDuration);
    
    // Create floating particles
    createParticles();
});

function createParticles() {
    const particleCount = 50;
    const heroSection = document.querySelector('.hero');
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        heroSection.appendChild(particle);
    }
    
    // Add CSS for particles
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            position: absolute;
            background-color: rgba(255, 192, 203, 0.7);
            border-radius: 50%;
            pointer-events: none;
            animation: float linear infinite;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(20px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}
document.addEventListener('click', function() {
  document.getElementById('bgMusic').play();
});
// script.js
document.addEventListener('DOMContentLoaded', function() {
  const bgMusic = document.getElementById('bgMusic');
  const musicControl = document.querySelector('.music-control');
  
  // ১. পেজ লোড হলে গান চালু করার চেষ্টা
  bgMusic.volume = 0.3; // ভলিউম কম রাখুন (অপশনাল)
  const playPromise = bgMusic.play();

  // ২. যদি ব্রাউজার অটোপ্লে ব্লক করে
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      musicControl.style.display = 'block'; // 🎵 বাটন দেখান
    });
  }

  // ৩. মিউজিক কন্ট্রোল বাটন
  musicControl.addEventListener('click', function() {
    if (bgMusic.paused) {
      bgMusic.play();
      musicControl.textContent = '🔊';
    } else {
      bgMusic.pause();
      musicControl.textContent = '🎵';
    }
  });
});

// ৪. পেজ ভিজিবল হলে গান চালু (যদি ট্যাব ব্যাকগ্রাউন্ডে থাকে)
document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    document.getElementById('bgMusic').play();
  }
});
