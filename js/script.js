
    // ── TRAILER DATA ──
    const TRAILERS = [
      { id:"t1", title:"The 40 Parables — Official Trailer", url:"video/How Worldwide Publishers Is Bringing Jesus’ Teachings To Life.mp4", thumbnail:"https://img.youtube.com/vi/PLi5VtYIBCM/hqdefault.jpg", duration:"3 min", featured:true, label:"Official Trailer" },
      { id:"t2", title:"Could He Be Who He Claimed? 0% or 100%", url:"video/See the word Parables as shown throughout the Bible, Shocking.mp4", thumbnail:"https://img.youtube.com/vi/mepK0DLeK8E/hqdefault.jpg", duration:"3 min", featured:false, label:"Trailer 2" },
      { id:"t3", title:"The Keys to the Kingdom Come", url:"video/Home - The 40 Parables Jesus Parables.mp4", thumbnail:"https://img.youtube.com/vi/UCqvqU8hLXw/hqdefault.jpg", duration:"5:26 min", featured:false, label:"Affiliate Overview" },
      { id:"t4", title:"Purpose of Worldwide Publishers LLC", url:"video/How Worldwide Publishers Is Bringing Jesus’ Teachings To Life.mp4", thumbnail:"https://img.youtube.com/vi/9WvqI7JQCTI/hqdefault.jpg", duration:"5:24 min", featured:false, label:"About Us" }
    ];

    function buildTrailers() {
      const grid = document.getElementById('trailers-grid');
      if (!grid) return;
      grid.innerHTML = TRAILERS.map(t => `
        <div class="trailer-card reveal" onclick="openModal('${t.url}')" data-id="${t.id}">
          ${t.featured ? '<span class="featured-badge">Featured</span>' : ''}
          <div class="trailer-thumb">
            <img src="${t.thumbnail}" alt="${t.title}" loading="lazy">
            <div class="trailer-play-btn"></div>
          </div>
          <div class="trailer-info">
            <span class="trailer-label">${t.label}</span>
            <div class="trailer-title">${t.title}</div>
            <div class="trailer-duration">${t.duration}</div>
          </div>
        </div>
      `).join('');
      triggerReveal();
    }

    function openModal(url) {
      document.getElementById('modal-iframe').src = url + '?autoplay=1';
      document.getElementById('video-modal').classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeModal() {
      document.getElementById('modal-iframe').src = '';
      document.getElementById('video-modal').classList.remove('open');
      document.body.style.overflow = '';
    }
    function closeModalOutside(e) {
      if (e.target === document.getElementById('video-modal')) closeModal();
    }

    // ── NAV SCROLL ──
    window.addEventListener('scroll', () => {
      document.getElementById('main-nav').classList.toggle('scrolled', window.scrollY > 60);
    });

    // ── SCROLL REVEAL ──
    function triggerReveal() {
      const els = document.querySelectorAll('.reveal:not(.visible)');
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        });
      }, { threshold: 0.10 });
      els.forEach(el => io.observe(el));
    }

    // ── EMAIL CAPTURE ──
    function handleCapture(e) {
      e.preventDefault();
      const email = document.getElementById('capture-email').value;
      if (!email) return;
      alert('Thank you! Check your inbox for the free eBook and Jesus Keyword Tool access.');
      document.getElementById('capture-email').value = '';
    }

    // ── DYNAMIC CANVAS BACKGROUND ──
    (function() {
      const canvas = document.getElementById('bg-canvas');
      const ctx = canvas.getContext('2d');
      let W, H, orbs;

      function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
        initOrbs();
      }

      function initOrbs() {
        orbs = [
          { x: W * 0.75, y: H * 0.25, r: W * 0.35, dx: 0.18, dy: 0.12, color: 'rgba(214,59,47,0.06)' },
          { x: W * 0.15, y: H * 0.65, r: W * 0.30, dx: -0.14, dy: 0.16, color: 'rgba(15,43,91,0.06)' },
          { x: W * 0.50, y: H * 0.80, r: W * 0.25, dx: 0.10, dy: -0.18, color: 'rgba(214,59,47,0.04)' },
          { x: W * 0.85, y: H * 0.70, r: W * 0.22, dx: -0.12, dy: -0.10, color: 'rgba(15,43,91,0.05)' },
        ];
      }

      function draw() {
        ctx.clearRect(0, 0, W, H);
        orbs.forEach(o => {
          o.x += o.dx; o.y += o.dy;
          if (o.x - o.r > W || o.x + o.r < 0) o.dx *= -1;
          if (o.y - o.r > H || o.y + o.r < 0) o.dy *= -1;
          const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
          g.addColorStop(0, o.color);
          g.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        });
        requestAnimationFrame(draw);
      }

      window.addEventListener('resize', resize);
      resize();
      draw();
    })();

    // ── INIT ──
    document.addEventListener('DOMContentLoaded', () => {
      buildTrailers();
      triggerReveal();
      window.addEventListener('scroll', triggerReveal);
    });
  