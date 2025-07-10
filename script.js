function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Add loading animation to sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('loading');
  });

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('loaded');
        
        // Animate skill bars if they exist
        const skillBars = entry.target.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          setTimeout(() => {
            bar.style.width = width + '%';
          }, 300);
        });
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  sections.forEach(section => {
    observer.observe(section);
  });

  // Scroll to top button
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = '↑';
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(scrollToTopBtn);

  // Show/hide scroll to top button
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top functionality
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Add typing effect to title
  const title = document.querySelector('#profile .title');
  if (title) {
    const text = title.textContent;
    title.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
      if (i < text.length) {
        title.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    
    setTimeout(typeWriter, 1000);
  }

  // Add hover effects to project cards
  const projectCards = document.querySelectorAll('.color-container');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add parallax effect to profile section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const profileSection = document.querySelector('#profile');
    if (profileSection) {
      const rate = scrolled * -0.5;
      profileSection.style.transform = `translateY(${rate}px)`;
    }
  });

  // Add click animation to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS for ripple effect
  const style = document.createElement('style');
  style.textContent = `
    .btn {
      position: relative;
      overflow: hidden;
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Add navbar background on scroll
  const navbar = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  });
});

// Add cursor trail effect
document.addEventListener('mousemove', (e) => {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  trail.style.left = e.clientX + 'px';
  trail.style.top = e.clientY + 'px';
  document.body.appendChild(trail);
  
  setTimeout(() => {
    trail.remove();
  }, 1000);
});

// Add CSS for cursor trail
const trailStyle = document.createElement('style');
trailStyle.textContent = `
  .cursor-trail {
    position: fixed;
    width: 4px;
    height: 4px;
    background: #2563eb;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    animation: trail-fade 1s ease-out forwards;
  }
  
  @keyframes trail-fade {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0);
    }
  }
`;
document.head.appendChild(trailStyle);