// Add smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header height
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add background to header when scrolling
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Add active class to navigation items based on scroll position
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelector(`nav a[href="#${sectionId}"]`)?.classList.add('active');
      } else {
        document.querySelector(`nav a[href="#${sectionId}"]`)?.classList.remove('active');
      }
    });
  });
  
  // Login Modal Functionality
  const loginIcon = document.querySelector('#login-icon');
  const loginModal = document.querySelector('.login-modal');
  const loginClose = document.querySelector('.login-close');
  const togglePassword = document.querySelector('.toggle-password');
  
  // Open login modal
  loginIcon.addEventListener('click', function(e) {
    e.preventDefault();
    loginModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  });
  
  // Close login modal
  loginClose.addEventListener('click', () => {
    loginModal.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
  });
  
  // Close modal when clicking outside the form
  loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal || e.target.classList.contains('login-background')) {
      loginModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Toggle password visibility
  if (togglePassword) {
    togglePassword.addEventListener('click', function() {
      const passwordInput = this.previousElementSibling;
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        this.classList.replace('fa-eye-slash', 'fa-eye');
      } else {
        passwordInput.type = 'password';
        this.classList.replace('fa-eye', 'fa-eye-slash');
      }
    });
  }
  
  // Service dropdown functionality
  const serviceSelect = document.querySelector('.service-select');
  const serviceSelected = document.querySelector('.service-selected span');
  const serviceOptions = document.querySelectorAll('.service-option');
  
  // Toggle service dropdown
  if (serviceSelect) {
    serviceSelect.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent event from bubbling up
      this.classList.toggle('active');
    });
    
    // Select service option
    serviceOptions.forEach(option => {
      option.addEventListener('click', function() {
        serviceSelected.textContent = this.textContent;
        serviceSelect.classList.remove('active');
      });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!serviceSelect.contains(e.target)) {
        serviceSelect.classList.remove('active');
      }
    });
  }
  
  // Social media icons animation
  document.addEventListener('DOMContentLoaded', () => {
    const socialIcons = document.querySelectorAll('.social-icon');
    
    // Add staggered entrance animation
    socialIcons.forEach((icon, index) => {
      icon.style.opacity = '0';
      icon.style.transform = 'translateX(20px)';
      
      setTimeout(() => {
        icon.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        icon.style.opacity = '1';
        icon.style.transform = 'translateX(0)';
      }, 200 + (index * 100));
    });
  });
  
  // Add animation to the hero section
  document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 200);
  });
  
  // Video Carousel Functionality
  document.addEventListener('DOMContentLoaded', () => {
    const videoItems = document.querySelectorAll('.video-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    const totalVideos = videoItems.length;
    
    // Initialize carousel
    function initCarousel() {
      // Set initial positions
      updateCarousel();
      
      // Add click events to videos
      videoItems.forEach(item => {
        item.addEventListener('click', function() {
          const index = parseInt(this.getAttribute('data-index'));
          if (index !== currentIndex) {
            currentIndex = index;
            updateCarousel();
          }
        });
      });
      
      // Add click events to indicators
      indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
          const index = parseInt(this.getAttribute('data-index'));
          currentIndex = index;
          updateCarousel();
        });
      });
    }
    
    // Update carousel positions and classes
    function updateCarousel() {
      videoItems.forEach((item, index) => {
        // Remove all classes
        item.classList.remove('active', 'prev', 'next');
        
        // Reset any playing videos
        const video = item.querySelector('video');
        if (video) {
          // Only try to pause if the video has a valid source
          if (video.src && video.src !== window.location.href) {
            try {
              video.pause();
              video.currentTime = 0;
            } catch (e) {
              // Ignore errors from videos without proper sources
            }
          }
        }
        
        // Add appropriate class based on position
        if (index === currentIndex) {
          item.classList.add('active');
          // Only try to play if the video has a valid source
          if (video && video.src && video.src !== window.location.href) {
            try {
              video.play().catch(e => {
                // Handle autoplay restrictions gracefully
                console.log("Autoplay prevented:", e);
              });
            } catch (e) {
              // Ignore errors from videos without proper sources
            }
          }
        } else if (index === getPrevIndex()) {
          item.classList.add('prev');
        } else if (index === getNextIndex()) {
          item.classList.add('next');
        }
      });
      
      // Update indicators
      indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    }
    
    // Get previous index with wrap-around
    function getPrevIndex() {
      return (currentIndex - 1 + totalVideos) % totalVideos;
    }
    
    // Get next index with wrap-around
    function getNextIndex() {
      return (currentIndex + 1) % totalVideos;
    }
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
      currentIndex = getPrevIndex();
      updateCarousel();
    });
    
    // Next button click
    nextBtn.addEventListener('click', () => {
      currentIndex = getNextIndex();
      updateCarousel();
    });
    
    // Initialize the carousel
    initCarousel();
    
    // Auto-rotate carousel (optional)
    let autoRotateInterval;
    
    function startAutoRotate() {
      autoRotateInterval = setInterval(() => {
        currentIndex = getNextIndex();
        updateCarousel();
      }, 6000); // Change slide every 6 seconds
    }
    
    function stopAutoRotate() {
      clearInterval(autoRotateInterval);
    }
    
    // Start auto-rotation
    startAutoRotate();
    
    // Stop auto-rotation on hover
    const carouselContainer = document.querySelector('.video-carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoRotate);
    carouselContainer.addEventListener('mouseleave', startAutoRotate);
    
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        currentIndex = getPrevIndex();
        updateCarousel();
      } else if (e.key === 'ArrowRight') {
        currentIndex = getNextIndex();
        updateCarousel();
      }
    });
  });