/* 数商之家 — 交互脚本 */
(function () {
  'use strict';

  /* ---------- 导航滚动阴影 ---------- */
  var nav = document.querySelector('.nav');
  var totop = document.querySelector('.totop');

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle('scrolled', y > 8);
    if (totop) totop.classList.toggle('show', y > 460);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 移动端菜单 ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        menu.classList.remove('open');
        toggle.classList.remove('open');
      }
    });
  }

  /* ---------- 回到顶部 ---------- */
  if (totop) {
    totop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 滚动进入动画 ---------- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- 筛选器（新闻 / 课程分类） ---------- */
  document.querySelectorAll('[data-filter-group]').forEach(function (group) {
    var btns = group.querySelectorAll('.filter');
    var scope = document.querySelector(group.getAttribute('data-filter-group'));
    if (!scope) return;
    var cards = scope.querySelectorAll('[data-cat]');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.getAttribute('data-f');
        cards.forEach(function (c) {
          var show = cat === 'all' || c.getAttribute('data-cat') === cat;
          c.style.display = show ? '' : 'none';
        });
      });
    });
  });

  /* ---------- 数字滚动 ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var target = parseFloat(el.getAttribute('data-count'));
        var dur = 1200, start = null;
        var suffix = el.getAttribute('data-suffix') || '';
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var v = target * eased;
          el.textContent = (target % 1 === 0 ? Math.round(v) : v.toFixed(1)) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        co.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { co.observe(el); });
  }
})();
