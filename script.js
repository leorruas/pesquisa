document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide-card');
  const progressBar = document.getElementById('progress-bar');
  
  // Top nav elements (optional, might be removed from HTML)
  const currentBreadcrumb = document.getElementById('current-breadcrumb');
  const breadcrumbTrigger = document.getElementById('breadcrumb-trigger');
  const dropdownMenu = document.getElementById('dropdown-menu');
  const dropdownItems = document.querySelectorAll('#dropdown-menu .dropdown-item');
  
  // Dock elements
  const dockPrevBtn = document.getElementById('dock-prev-btn');
  const dockNextBtn = document.getElementById('dock-next-btn');
  const dockTriggerBtn = document.getElementById('dock-trigger-btn');
  const dockDropdownMenu = document.getElementById('dock-dropdown-menu');
  const dockDropdownItems = document.querySelectorAll('#dock-dropdown-menu .dropdown-item');
  const dockCurrentNum = document.getElementById('dock-current-num');
  
  const startBtn = document.getElementById('start-btn');
  
  let currentSlideIndex = 0;
  const totalSlides = slides.length;

  if (totalSlides === 0) {
    console.warn('Nenhum slide encontrado com a classe .slide-card');
    return;
  }

  // Function to switch slides
  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    
    // Hide active slide
    if (slides[currentSlideIndex]) {
      slides[currentSlideIndex].classList.remove('active');
    }
    
    // Remove active state from top dropdown items
    if (dropdownItems && dropdownItems[currentSlideIndex]) {
      dropdownItems[currentSlideIndex].classList.remove('active');
    }
    
    // Remove active state from dock dropdown items
    if (dockDropdownItems && dockDropdownItems[currentSlideIndex]) {
      dockDropdownItems[currentSlideIndex].classList.remove('active');
    }
    
    // Set new active slide
    currentSlideIndex = index;
    
    if (slides[currentSlideIndex]) {
      slides[currentSlideIndex].classList.add('active');
    }
    
    // Add active state to top dropdown items
    if (dropdownItems && dropdownItems[currentSlideIndex]) {
      dropdownItems[currentSlideIndex].classList.add('active');
    }
    
    // Add active state to dock dropdown items
    if (dockDropdownItems && dockDropdownItems[currentSlideIndex]) {
      dockDropdownItems[currentSlideIndex].classList.add('active');
    }
    
    // Update progress bar
    if (progressBar) {
      const progressPercent = ((currentSlideIndex + 1) / totalSlides) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }
    
    // Update Topbar Title Breadcrumb (if they exist)
    if (currentBreadcrumb && dropdownItems && dropdownItems[currentSlideIndex]) {
      const titleEl = dropdownItems[currentSlideIndex].querySelector('.item-title');
      if (titleEl) {
        currentBreadcrumb.textContent = titleEl.textContent;
      }
    }
    
    // Update Dock Indicators
    if (dockCurrentNum) {
      dockCurrentNum.textContent = String(currentSlideIndex + 1).padStart(2, '0');
    }
    
    // Enable/Disable Dock Navigation Buttons
    if (dockPrevBtn) {
      dockPrevBtn.disabled = currentSlideIndex === 0;
    }
    if (dockNextBtn) {
      dockNextBtn.disabled = currentSlideIndex === totalSlides - 1;
    }
    
    // Close dropdown menus
    if (dropdownMenu) {
      dropdownMenu.classList.remove('open');
    }
    if (dockDropdownMenu) {
      dockDropdownMenu.classList.remove('open');
    }
    if (dockTriggerBtn) {
      dockTriggerBtn.classList.remove('open');
    }
  }

  // Bind Dock Prev Button
  if (dockPrevBtn) {
    dockPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentSlideIndex > 0) {
        goToSlide(currentSlideIndex - 1);
      }
    });
  }

  // Bind Dock Next Button
  if (dockNextBtn) {
    dockNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentSlideIndex < totalSlides - 1) {
        goToSlide(currentSlideIndex + 1);
      }
    });
  }

  // Start button on Cover Slide
  if (startBtn) {
    startBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(1);
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      if (currentSlideIndex < totalSlides - 1) {
        goToSlide(currentSlideIndex + 1);
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'PageUp') {
      e.preventDefault();
      if (currentSlideIndex > 0) {
        goToSlide(currentSlideIndex - 1);
      }
    }
  });

  // Top nav breadcrumb toggle
  if (breadcrumbTrigger && dropdownMenu) {
    breadcrumbTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle('open');
      
      // Close dock menu if top menu is opened
      if (dockDropdownMenu) {
        dockDropdownMenu.classList.remove('open');
      }
      if (dockTriggerBtn) {
        dockTriggerBtn.classList.remove('open');
      }
    });
  }

  // Dock menu toggle
  if (dockTriggerBtn && dockDropdownMenu) {
    dockTriggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dockDropdownMenu.classList.toggle('open');
      dockTriggerBtn.classList.toggle('open');
      
      // Close top menu if dock menu is opened
      if (dropdownMenu) {
        dropdownMenu.classList.remove('open');
      }
    });
  }

  // Click outside to close both menus
  document.addEventListener('click', () => {
    if (dropdownMenu) dropdownMenu.classList.remove('open');
    if (dockDropdownMenu) dockDropdownMenu.classList.remove('open');
    if (dockTriggerBtn) dockTriggerBtn.classList.remove('open');
  });

  // Prevent dropdown closing when clicking inside menus
  if (dropdownMenu) {
    dropdownMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
  
  if (dockDropdownMenu) {
    dockDropdownMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // Bind Slide jump clicks for both dropdowns
  if (dropdownItems) {
    dropdownItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        goToSlide(index);
      });
    });
  }

  if (dockDropdownItems) {
    dockDropdownItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        goToSlide(index);
      });
    });
  }

  // Initialize presentation
  goToSlide(0);
});
