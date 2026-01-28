// filepath: c:\Users\NashA\Desktop\Test\script.js

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

  // Project Data
  const projectData = {
    bsp: {
      title: 'Boy Scouts of the Philippines',
      desc: 'A community-based roleplay system that simulates the organizational structure and member interaction within a scout community. This project showcases my understanding of system design, user interaction, and role-based mechanics.',
      details: 'Developed a fully functional scout organization system with member roles, rank progression, and community activities. Features include dashboard UI, member management, and activity logging.',
      link: 'https://www.roblox.com/games/84214316608349/The-Boy-Scouts-Of-The-Philippines'
    }
  };

  // Open Project Modal
  window.openProject = function(projectKey) {
    const project = projectData[projectKey];
    if (project) {
      document.getElementById('modalTitle').textContent = project.title;
      document.getElementById('modalDesc').textContent = project.desc;
      document.getElementById('modalDetails').textContent = project.details;
      document.getElementById('modalLink').href = project.link;
      document.getElementById('projectModal').classList.add('active');
    }
  };

  // Close Project Modal
  window.closeProject = function() {
    document.getElementById('projectModal').classList.remove('active');
  };

  // Close modal on outside click
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target.id === 'projectModal') {
        window.closeProject();
      }
    });
  }

  // Skill bars animation
  const observerOptions = {
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector('.skill-progress');
        if (progressBar) {
          const level = progressBar.getAttribute('data-level');
          progressBar.style.width = level + '%';
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.skill-item').forEach(skill => {
    observer.observe(skill);
  });

  // Counter animation for stats
  document.querySelectorAll('.stat-number').forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const countUp = () => {
      current += increment;
      if (current < target) {
        stat.textContent = Math.floor(current);
        requestAnimationFrame(countUp);
      } else {
        stat.textContent = target;
      }
    };

    const statObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        countUp();
        statObserver.unobserve(stat);
      }
    }, { threshold: 0.5 });

    statObserver.observe(stat);
  });

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Section reveals
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'revealIn 0.8s ease-out forwards';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(section => {
    revealObserver.observe(section);
  });

  // Click project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const projectKey = card.getAttribute('data-project');
      window.openProject(projectKey);
    });
  });

  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.textContent = '☀️';
  } else {
    themeToggle.textContent = '🌙';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
  });

});
