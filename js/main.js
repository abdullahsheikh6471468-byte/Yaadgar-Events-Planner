/* ==========================================================================
   YAADGAR EVENTS PLANNER — main.js
   Injects shared header/footer/icon-sprite (single source of truth so nav
   & footer never drift out of sync across pages), then wires up all
   interactive behaviour: mobile nav, scroll reveal, gallery + lightbox,
   testimonial slider, FAQ accordion, booking form, contact form, floats.
   ========================================================================== */

/* ---------------------------------------------------------------------
   1. ICON SPRITE — one custom line-icon family, reused everywhere.
   -------------------------------------------------------------------- */
const ICON_SPRITE = `
<svg style="display:none" aria-hidden="true">
<defs>
<g id="ic-stroke" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></g>
</defs>

<symbol id="icon-phone" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M6.5 3.5h3l1.5 4-2 1.6a12 12 0 0 0 5.9 5.9l1.6-2 4 1.5v3a2 2 0 0 1-2.2 2C10.6 19 5 13.4 4.5 5.7A2 2 0 0 1 6.5 3.5Z"/></symbol>
<symbol id="icon-mail" viewBox="0 0 24 24"><rect x="3.2" y="5.5" width="17.6" height="13" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.5"/><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m4 7 8 6.2L20 7"/></symbol>
<symbol id="icon-instagram" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17.2" cy="6.8" r="1.05" fill="currentColor"/></symbol>
<symbol id="icon-tiktok" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M13 3.3c.5 2 2.1 3.5 4.4 3.7v2.8c-1.6 0-3.1-.5-4.4-1.4v6.7a5.1 5.1 0 1 1-4.4-5.1v2.9a2.3 2.3 0 1 0 1.7 2.2V3.3H13Z"/></symbol>
<symbol id="icon-whatsapp" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.5-1.2A8.4 8.4 0 1 0 12 3.5Z"/><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M9 8.6c.2-.5.5-.5.8-.5h.6c.2 0 .4 0 .6.5l.6 1.5c.1.3 0 .5-.1.7l-.5.6c-.2.2-.2.4 0 .7.5.9 1.3 1.7 2.2 2.2.3.2.5.1.7 0l.6-.6c.2-.2.4-.2.7-.1l1.5.7c.4.2.4.4.4.6-.1 1-1.5 1.7-2.4 1.7-1.8 0-4.6-1.7-6-4.4-.5-.9-.6-1.9-.5-2.6Z"/></symbol>
<symbol id="icon-arrow-right" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M4 12h15.5M14 6.5 19.5 12 14 17.5"/></symbol>
<symbol id="icon-chevron-down" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6"/></symbol>
<symbol id="icon-close" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="M5 5l14 14M19 5 5 19"/></symbol>
<symbol id="icon-star" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3.2 14.6 9l6.4.6-4.8 4.2 1.4 6.3L12 16.9 6.4 20.1l1.4-6.3L3 9.6 9.4 9 12 3.2Z"/></symbol>
<symbol id="icon-quote" viewBox="0 0 24 24"><path fill="currentColor" d="M9.5 6.5c-3 1-5 3.6-5 6.9 0 2.5 1.7 4.3 3.9 4.3a3.4 3.4 0 0 0 3.5-3.5c0-1.8-1.3-3.2-3-3.4.3-1.6 1.7-3 3.4-3.6L9.5 6.5Zm9 0c-3 1-5 3.6-5 6.9 0 2.5 1.7 4.3 3.9 4.3a3.4 3.4 0 0 0 3.5-3.5c0-1.8-1.3-3.2-3-3.4.3-1.6 1.7-3 3.4-3.6l-1.8-.7Z"/></symbol>
<symbol id="icon-location" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="M12 21s7-6.5 7-11.8A7 7 0 0 0 5 9.2C5 14.5 12 21 12 21Z"/><circle cx="12" cy="9.3" r="2.4" fill="none" stroke="currentColor" stroke-width="1.5"/></symbol>
<symbol id="icon-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.3" fill="none" stroke="currentColor" stroke-width="1.5"/><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M12 7.5V12l3.2 2"/></symbol>
<symbol id="icon-shield" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="M12 3.3 19 6v5.5c0 5-3 8-7 9.2-4-1.2-7-4.2-7-9.2V6l7-2.7Z"/><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m8.8 12 2.2 2.2 4.2-4.4"/></symbol>
<symbol id="icon-wallet" viewBox="0 0 24 24"><rect x="3.3" y="6" width="17.4" height="12.5" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path fill="none" stroke="currentColor" stroke-width="1.5" d="M3.3 9.8h17.4"/><circle cx="16.8" cy="14" r="1.05" fill="currentColor"/></symbol>
<symbol id="icon-users" viewBox="0 0 24 24"><circle cx="9" cy="8.3" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M3.6 19c.7-3 2.7-4.6 5.4-4.6s4.7 1.6 5.4 4.6"/><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M15.5 6a3 3 0 0 1 0 5.9M17.4 14.6c2.1.4 3.6 1.8 4.1 4.3"/></symbol>
<symbol id="icon-timer" viewBox="0 0 24 24"><circle cx="12" cy="13" r="7.6" fill="none" stroke="currentColor" stroke-width="1.5"/><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M12 9.3V13l2.6 1.6M9.8 2.7h4.4M12 4.9V2.7"/></symbol>
<symbol id="icon-heart" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="M12 20s-7.5-4.6-9.6-9.4C1 7.2 3 4 6.5 4c2 0 3.5 1.1 5.5 3.3C14 5.1 15.5 4 17.5 4 21 4 23 7.2 21.6 10.6 19.5 15.4 12 20 12 20Z"/></symbol>
<symbol id="icon-check-circle" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" stroke-width="1.5"/><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="m8 12.3 2.6 2.6L16.3 9"/></symbol>
<symbol id="icon-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" stroke-width="1.5"/><path fill="currentColor" d="M11.1 10.4h1.8v6.4h-1.8z"/><circle cx="12" cy="7.7" r="1.05" fill="currentColor"/></symbol>
<symbol id="icon-camera" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="M4 8.5h3l1.4-2h7.2l1.4 2h3v10.5H4V8.5Z"/><circle cx="12" cy="13.5" r="3.4" fill="none" stroke="currentColor" stroke-width="1.5"/></symbol>
<symbol id="icon-map" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="m9 4-5 2v14l5-2 6 2 5-2V4l-5 2-6-2Z"/><path fill="none" stroke="currentColor" stroke-width="1.5" d="M9 4v14M15 6v14"/></symbol>
<symbol id="icon-menu" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/></symbol>

<!-- Event category icons -->
<symbol id="icon-cat-rings" viewBox="0 0 24 24"><circle cx="9" cy="14" r="4.4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="15.2" cy="14" r="4.4" fill="none" stroke="currentColor" stroke-width="1.5"/><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M12.1 9 10.5 5.5h3L12.1 9Z"/></symbol>
<symbol id="icon-cat-cake" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="M4 20v-6.5c0-1 .8-1.8 1.8-1.8h12.4c1 0 1.8.8 1.8 1.8V20H4Z"/><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M4 16.5h16M8 11.5V9M12 11.5V9M16 11.5V9M12 6.7V4M10.6 5.3C10.6 4.4 12 3 12 3s1.4 1.4 1.4 2.3-.6 1.4-1.4 1.4-1.4-.6-1.4-1.4Z"/></symbol>
<symbol id="icon-cat-henna" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="M12 21c-3.4-1-5.6-3.6-5.6-7.4 0-2 .7-3 1.4-4.3.6-1.1.9-2 .9-3.3 0-1 .6-1.9 1.5-2.2-.2 1.1.1 1.9.7 2.6.6-1 .5-2.1.2-3.1 1.1.4 1.7 1.5 1.6 2.7-.1 1 .2 1.7.9 2.4.8-.9 1-1.9.8-3 1.1.6 1.6 1.8 1.4 3-.2 1.1.1 1.9.9 2.7.9-2.6 3.5-1 3.5 1.6 0 3.8-2.9 7.3-8.2 7.3Z"/><circle cx="9.6" cy="15" r=".6" fill="currentColor"/><circle cx="12.4" cy="17" r=".6" fill="currentColor"/><circle cx="14.6" cy="14.4" r=".6" fill="currentColor"/></symbol>
<symbol id="icon-cat-car" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="M4 16v-3.2L6 9.5h12l2 3.3V16H4Z"/><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M4 16v2h2v-2M18 16v2h2v-2M4 13h16"/><circle cx="8" cy="16.3" r="1.2" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="16" cy="16.3" r="1.2" fill="none" stroke="currentColor" stroke-width="1.3"/><path fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" d="M9 6.5h6M10 4.3l2 2.2 2-2.2"/></symbol>
<symbol id="icon-cat-banquet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" d="M4 14a8 8 0 0 1 16 0H4Z"/><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M2.5 14h19M12 6.2V4M4 18h16"/><circle cx="12" cy="3" r="1" fill="currentColor"/></symbol>
<symbol id="icon-cat-briefcase" viewBox="0 0 24 24"><rect x="3.3" y="7.5" width="17.4" height="11.5" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.5"/><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="M8.5 7.5V6a1.8 1.8 0 0 1 1.8-1.8h3.4A1.8 1.8 0 0 1 15.5 6v1.5"/><path fill="none" stroke="currentColor" stroke-width="1.5" d="M3.3 12.5h17.4"/></symbol>
<symbol id="icon-cat-ring" viewBox="0 0 24 24"><circle cx="12" cy="14.5" r="5.3" fill="none" stroke="currentColor" stroke-width="1.5"/><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="m12 9-2-4.5h4L12 9Z"/></symbol>
<symbol id="icon-cat-tiara" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="M4 17 3 9l4.5 3.5L12 6l4.5 6.5L21 9l-1 8H4Z"/><path fill="none" stroke="currentColor" stroke-width="1.5" d="M4 19.3h16"/><circle cx="12" cy="4.2" r="1" fill="currentColor"/></symbol>
<symbol id="icon-cat-bottle" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="M10 3.5h4v3l1.5 2v11a1.6 1.6 0 0 1-1.6 1.6H10.1a1.6 1.6 0 0 1-1.6-1.6v-11l1.5-2v-3Z"/><path fill="none" stroke="currentColor" stroke-width="1.5" d="M8.5 13h7M9 3.5h6"/></symbol>
<symbol id="icon-cat-moon" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="M15.5 4.3a8 8 0 1 0 4.2 14.7A8.8 8.8 0 0 1 15.5 4.3Z"/><path fill="currentColor" d="m18.5 3.5.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6.6-1.6Z"/></symbol>
<symbol id="icon-cat-infinity" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.6" d="M7 9a4 4 0 1 0 0 8c2.5 0 3.6-1.8 5-4s2.5-4 5-4a4 4 0 1 1 0 8c-2.5 0-3.6-1.8-5-4S9.5 9 7 9Z"/></symbol>
<symbol id="icon-cat-backpack" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="M7.5 9.5V7a4.5 4.5 0 0 1 9 0v2.5"/><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="M6 9.5h12a1.6 1.6 0 0 1 1.6 1.6v7.3A1.6 1.6 0 0 1 18 20H6a1.6 1.6 0 0 1-1.6-1.6v-7.3A1.6 1.6 0 0 1 6 9.5Z"/><path fill="none" stroke="currentColor" stroke-width="1.5" d="M9.5 13.5h5M9.5 20v-4.5h5V20"/></symbol>
<symbol id="icon-cat-cap" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="m12 5 10 4.3-10 4.3-10-4.3L12 5Z"/><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M6.5 11.5V16c0 1.4 2.5 2.7 5.5 2.7s5.5-1.3 5.5-2.7v-4.5M22 9.3V15"/></symbol>
<symbol id="icon-cat-scroll" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="M6 4h11a2 2 0 0 1 2 2v13a1.5 1.5 0 0 1-1.5 1.5H8A2 2 0 0 1 6 18.5V4Z"/><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="M6 4a2 2 0 0 0-2 2v1.5h2"/><path fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" d="M9 9h6M9 12h6M9 15h4"/></symbol>
<symbol id="icon-cat-mic" viewBox="0 0 24 24"><rect x="9.3" y="3.5" width="5.4" height="10" rx="2.7" fill="none" stroke="currentColor" stroke-width="1.5"/><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M6 11.5a6 6 0 0 0 12 0M12 17.5V21M9 21h6"/></symbol>
<symbol id="icon-cat-confetti" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m5 19 3-9 9-3-3 9-9 3Z"/><path fill="currentColor" d="M17.5 4.5h1.6v1.6h-1.6zM19.5 8h1.4v1.4h-1.4zM4 12.5h1.4v1.4H4z"/></symbol>
<symbol id="icon-cat-gallery" viewBox="0 0 24 24"><rect x="3.5" y="4.5" width="17" height="15" rx="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8.3" cy="9.3" r="1.6" fill="none" stroke="currentColor" stroke-width="1.5"/><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="m4 17 5-5 3.5 3.5L16 12l4 5"/></symbol>
<symbol id="icon-laurel" viewBox="0 0 90 50"><g fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round">
<path d="M45 8 L45 42"/>
<path d="M45 40c-6-2-14-6-18-14M27 26c2 3 6 5 9 5M22 18c2 3 6 4 9 4M20 10c2 3 5 4 8 3"/>
<path d="M27 26 22 30M22 18 17 21M20 10 15 12"/>
<path d="M45 40c6-2 14-6 18-14M63 26c-2 3-6 5-9 5M68 18c-2 3-6 4-9 4M70 10c-2 3-5 4-8 3"/>
<path d="M63 26 68 30M68 18 73 21M70 10 75 12"/>
</g></symbol>
</svg>`;

/* Map category key -> icon id, used by events data below */
const CATEGORY_ICON = {
  birthday: 'icon-cat-cake', mehndi: 'icon-cat-henna',
  'baat-pakki': 'icon-cat-ring', 'bridal-shower': 'icon-cat-tiara', aqeeqah: 'icon-cat-moon',
  anniversary: 'icon-cat-infinity'
};

/* ---------------------------------------------------------------------
   2. SHARED HEADER / FOOTER TEMPLATES
   -------------------------------------------------------------------- */
function renderHeader(active){
  const links = [
    ['index.html', 'Home', 'home'],
    ['events.html', 'Events', 'events'],
    ['about.html', 'About', 'about'],
    ['reviews.html', 'Reviews', 'reviews'],
    ['book.html', 'Book Now', 'book'],
    ['contact.html', 'Contact', 'contact'],
  ];
  const navA = links.map(([href,label,key]) =>
    `<a href="${href}" class="${active===key?'active':''}">${label}</a>`).join('');

  return `
  <header class="site-header" id="siteHeader">
    <div class="container nav-inner">
      <a href="index.html" class="brand">
        <img class="brand-logo" src="images/logo/logo-cream.png" alt="Yaadgar Events Planner">
        <span class="brand-text">
          <span class="tag">Har Lamha Baniye Yaadgar</span>
        </span>
      </a>
      <nav class="nav-links" aria-label="Primary">${navA}</nav>
      <div class="nav-cta">
        <a href="book.html" class="btn btn-gold">Book Now</a>
      </div>
      <button class="hamburger" id="hamburgerBtn" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
  <nav class="mobile-nav" id="mobileNav" aria-label="Mobile">${navA}
    <a href="book.html" class="btn btn-gold">Book Now</a>
  </nav>`;
}


function renderFooter(){
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img class="footer-logo" src="images/logo/logo-cream.png" alt="Yaadgar Events Planner">
          <p>Yaadgar Events Planner designs and manages celebrations and private functions across the city — turning every occasion into a memory that lasts. Har Lamha Baniye Yaadgar.</p>
          <div class="social-row">
            <a href="https://www.instagram.com/_yaadgar.events_" target="_blank" rel="noopener" aria-label="Instagram"><svg><use href="#icon-instagram"/></svg></a>
            <a href="https://www.tiktok.com/@_yaadgar.events_" target="_blank" rel="noopener" aria-label="TikTok"><svg><use href="#icon-tiktok"/></svg></a>
            <a href="https://wa.me/923078719144" target="_blank" rel="noopener" aria-label="WhatsApp"><svg><use href="#icon-whatsapp"/></svg></a>
          </div>
        </div>
        <div class="footer">
          <h4>Quick Links</h4>
          <ul class="footer-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="events.html">Events</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="reviews.html">Reviews</a></li>
            <li><a href="book.html">Book Now</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer">
          <h4>Popular Events</h4>
          <ul class="footer-links">
            <li><a href="events-mehndi.html">Mehndi</a></li>
            <li><a href="events-baat-pakki.html">Baat Pakki</a></li>
            <li><a href="events-birthday.html">Birthday Events</a></li>
          </ul>
        </div>
        <div class="footer">
          <h4>Get In Touch</h4>
          <ul class="footer-contact">
            <li><svg><use href="#icon-phone"/></svg><span>Abdullah Sheikh<br>+92 307 8719144</span></li>
            <li><svg><use href="#icon-phone"/></svg><span>Huzaifa Wazir<br>+92 335 1414844</span></li>
            <li><svg><use href="#icon-mail"/></svg><span>yaadgareventsplanner@gmail.com</span></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; <span id="year"></span> Yaadgar Events Planner. All rights reserved.</span>
        <span>Designed with care for unforgettable moments.</span>
      </div>
    </div>
  </footer>`;
}

function renderFloats(){
  return `
  <div class="float-stack">
    <a class="float-btn whatsapp" href="https://wa.me/923078719144" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><svg><use href="#icon-whatsapp"/></svg></a>
    <button class="float-btn top" id="scrollTopBtn" aria-label="Scroll to top"><svg viewBox="0 0 24 24" style="width:20px;height:20px" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg></button>
  </div>`;
}

/* ---------------------------------------------------------------------
   3. LAYOUT INIT — called once per page with the active nav key.
   -------------------------------------------------------------------- */
function initLayout(activePage){
  document.body.insertAdjacentHTML('afterbegin', ICON_SPRITE);

  const headerMount = document.getElementById('header-mount');
  if (headerMount) headerMount.outerHTML = renderHeader(activePage);

  const footerMount = document.getElementById('footer-mount');
  if (footerMount) footerMount.outerHTML = renderFooter();

  const floatMount = document.getElementById('float-mount');
  if (floatMount) floatMount.outerHTML = renderFloats();

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  initPreloader();
  initMobileNav();
  initHeaderScroll();
  initScrollReveal();
  initScrollTop();
}

/* Preloader */
function initPreloader(){
  const pre = document.getElementById('preloader');
  if (!pre) return;
  window.addEventListener('load', () => {
    setTimeout(() => pre.classList.add('hide'), 350);
  });
  // Fallback in case load already fired
  setTimeout(() => pre.classList.add('hide'), 2200);
}

/* Mobile nav toggle */
function initMobileNav(){
  const btn = document.getElementById('hamburgerBtn');
  const nav = document.getElementById('mobileNav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.classList.toggle('active', open);
    btn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    btn.classList.remove('active');
    document.body.style.overflow = '';
  }));
}

/* Sticky header shrink-on-scroll */
function initHeaderScroll(){
  const header = document.getElementById('siteHeader');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* Scroll-triggered reveal animations */
function initScrollReveal(){
  const targets = document.querySelectorAll('.reveal, .reveal-stagger');
  if (!targets.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  targets.forEach(t => io.observe(t));
}

/* Scroll-to-top float button */
function initScrollTop(){
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;
  document.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------------------------------------------------------------------
   4. GALLERY + LIGHTBOX (with lazy loading & category filtering)
   -------------------------------------------------------------------- */
function buildGallery(containerId, items, opts = {}){
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = items.map((it, i) => {
    if (it.placeholder){
      return `<div class="gallery-placeholder" data-cat="${it.cat}">
        <svg><use href="#icon-camera"/></svg>
        <strong style="font-family:var(--font-display);font-size:1.05rem;color:var(--cream)">${it.label}</strong>
        <span>Gallery coming soon</span>
      </div>`;
    }
    return `<figure class="gallery-item" data-cat="${it.cat}" data-index="${i}">
        <div class="g-media">
          <img src="${it.src}" alt="${it.alt}" loading="lazy">
          <div class="g-overlay"><span><svg style="width:14px;height:14px"><use href="#icon-camera"/></svg>${it.alt}</span></div>
        </div>
        ${it.price ? `<figcaption class="g-price">${it.price}</figcaption>` : ''}
      </figure>`;
  }).join('');

  const images = items.filter(it => !it.placeholder);
  el.querySelectorAll('.gallery-item').forEach(fig => {
    fig.addEventListener('click', () => openLightbox(images, images.findIndex(x => x.src === fig.querySelector('img').getAttribute('src'))));
  });
}

let lbImages = [], lbIndex = 0;
function openLightbox(images, index){
  lbImages = images; lbIndex = index;
  renderLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function renderLightbox(){
  const item = lbImages[lbIndex];
  document.getElementById('lightboxImg').src = item.src;
  document.getElementById('lightboxImg').alt = item.alt;
  document.getElementById('lightboxCaption').textContent = item.alt;
}
function closeLightbox(){
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function initLightboxControls(){
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev').addEventListener('click', () => { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; renderLightbox(); });
  document.getElementById('lightboxNext').addEventListener('click', () => { lbIndex = (lbIndex + 1) % lbImages.length; renderLightbox(); });
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') document.getElementById('lightboxPrev').click();
    if (e.key === 'ArrowRight') document.getElementById('lightboxNext').click();
  });
}

/* Gallery category filter (Events page) */
function initGalleryFilter(){
  const bar = document.getElementById('filterBar');
  if (!bar) return;
  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    document.querySelectorAll('#masonryGallery > *').forEach(item => {
      const show = cat === 'all' || item.dataset.cat === cat;
      item.style.display = show ? '' : 'none';
    });
  });
}

/* ---------------------------------------------------------------------
   5b. EVENT DETAIL PAGE — shared renderer for each dedicated category page
       (events-mehndi.html, events-birthday.html, etc.) so the banner,
       intro, priced gallery and CTA markup only has to be written once.
   -------------------------------------------------------------------- */
function initEventDetailPage(data){
  document.title = `${data.title} | Yaadgar Events Planner`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', data.metaDescription || data.intro);

  const heroMount = document.getElementById('event-hero-mount');
  if (heroMount){
    heroMount.outerHTML = `
    <section class="page-hero" style="--img:url('../images/gallery/${data.heroImg}')">
      <div>
        <p class="eyebrow">${data.eyebrow || 'A Celebration, Perfected'}</p>
        <h1>${data.title}</h1>
        <p class="breadcrumb"><a href="index.html">Home</a> / <a href="events.html">Events</a> / ${data.title}</p>
      </div>
    </section>`;
  }

  const introMount = document.getElementById('event-intro-mount');
  if (introMount){
    introMount.outerHTML = `
    <section>
      <div class="container" style="padding-block:var(--space-lg) var(--space-md)">
        <div class="event-meta reveal">
          <div>
            <div class="service-icon" style="margin:0 0 1.1rem"><svg><use href="#${data.icon}"/></svg></div>
            <p class="section-sub" style="max-width:680px">${data.intro}</p>
            ${data.priceNote ? `<p style="margin-top:.8rem;font-size:.85rem;color:var(--bronze-deep);font-weight:500;letter-spacing:.02em">${data.priceNote}</p>` : ''}
          </div>
          <a href="book.html" class="btn btn-primary">Book This Event <svg style="width:14px;height:14px"><use href="#icon-arrow-right"/></svg></a>
        </div>
      </div>
    </section>`;
  }

  const galleryMount = document.getElementById('event-gallery-mount');
  if (galleryMount){
    if (data.gallery && data.gallery.length){
      galleryMount.outerHTML = `
      <section class="gallery-section" style="padding-top:0">
        <div class="container">
          <div class="masonry" id="eventMasonry"></div>
        </div>
      </section>`;
      buildGallery('eventMasonry', data.gallery.map(g => ({ cat: data.slug, src: `images/gallery/${g.src}`, alt: `${data.title} — ${g.alt || 'decor photo'}`, price: g.price })));
      initLightboxControls();
    } else {
      galleryMount.outerHTML = `
      <section class="gallery-section" style="padding-top:0">
        <div class="container">
          <div class="gallery-placeholder" style="aspect-ratio:auto;padding:3.5rem 1.5rem">
            <svg><use href="#icon-camera"/></svg>
            <strong style="font-family:var(--font-display);font-size:1.2rem;color:var(--cream)">Gallery Coming Soon</strong>
            <span>Photos from ${data.title.toLowerCase().replace(/ events$/,'')} events will be added here.</span>
          </div>
        </div>
      </section>`;
    }
  }
}

/* ---------------------------------------------------------------------
   6. TESTIMONIAL SLIDER
   -------------------------------------------------------------------- */
function initTestimonials(){
  const slides = document.querySelectorAll('.t-slide');
  const dotsWrap = document.getElementById('tDots');
  if (!slides.length || !dotsWrap) return;
  let idx = 0, timer;
  dotsWrap.innerHTML = Array.from(slides).map((_, i) => `<button aria-label="Testimonial ${i+1}" class="${i===0?'active':''}"></button>`).join('');
  const dots = dotsWrap.querySelectorAll('button');
  function show(n){
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[n].classList.add('active'); dots[n].classList.add('active');
    idx = n;
  }
  function next(){ show((idx + 1) % slides.length); }
  dots.forEach((d,i) => d.addEventListener('click', () => { show(i); resetTimer(); }));
  function resetTimer(){ clearInterval(timer); timer = setInterval(next, 5500); }
  resetTimer();
}

/* ---------------------------------------------------------------------
   6. FAQ ACCORDION
   -------------------------------------------------------------------- */
function initFAQ(){
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => { o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null; });
      if (!isOpen){ item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });
}

/* ---------------------------------------------------------------------
   7. BOOKING FORM — validation + WhatsApp handoff + confirmation modal
   -------------------------------------------------------------------- */
const BUSINESS_WHATSAPP = '923078719144'; // Abdullah Sheikh — primary booking WhatsApp

function openWhatsAppWithMessage(message){
  const url = `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
}

function initBookingForm(){
  const form = document.getElementById('bookingForm');
  if (!form) return;
  const modal = document.getElementById('confirmModal');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      const wrap = field.closest('.field');
      const err = wrap.querySelector('.error-msg');
      if (!field.value.trim()){
        wrap.classList.add('error');
        if (err) err.textContent = 'This field is required.';
        valid = false;
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)){
        wrap.classList.add('error'); if (err) err.textContent = 'Enter a valid email address.'; valid = false;
      } else if (field.type === 'tel' && field.value.replace(/\D/g,'').length < 10){
        wrap.classList.add('error'); if (err) err.textContent = 'Enter a valid phone number.'; valid = false;
      } else {
        wrap.classList.remove('error'); if (err) err.textContent = '';
      }
    });
    if (!valid) return;

    const f = new FormData(form);
    const decoration = form.querySelector('input[name="decoration"]:checked')?.value || 'Not specified';
    const decorationImageFile = form.querySelector('#decorationImage')?.files?.[0];
    const lines = [
      'Hello Yaadgar Events Planner! I would like to book an event. Here are my details:',
      '',
      `Name: ${f.get('fullName') || '-'}`,
      `Phone: ${f.get('phone') || '-'}`,
      `Email: ${f.get('email') || '-'}`,
      `Event Type: ${f.get('eventType') || '-'}`,
      `Event Date: ${f.get('eventDate') || '-'}`,
      `Event Time: ${f.get('eventTime') || '-'}`,
      `Location: ${f.get('location') || '-'}`,
      `Decoration Required: ${decoration}`,
      `Special Requirements: ${f.get('requirements') || 'None'}`,
      `Additional Notes: ${f.get('notes') || 'None'}`,
    ];

    // Open WhatsApp immediately (within the click gesture, so it isn't popup-blocked)
    openWhatsAppWithMessage(lines.join('\n'));

    // Keep a reference to the picked image so the "Share Photo" button in the
    // confirmation modal can send it, and show/hide that button accordingly.
    lastDecorationImage = decorationImageFile || null;
    const shareBtn = document.getElementById('shareImageBtn');
    const shareHint = document.getElementById('shareImageHint');
    if (shareBtn) shareBtn.style.display = lastDecorationImage ? 'block' : 'none';
    if (shareHint) shareHint.style.display = lastDecorationImage ? 'block' : 'none';

    // Also show the on-page confirmation for reassurance
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    form.reset();
  });

  // WhatsApp links can only pre-fill text, never a file — that's a WhatsApp
  // limitation, not something a website can work around. The closest we can
  // get is the device's native Share Sheet, which lets the user pick the
  // WhatsApp chat that just opened and send the photo into it in one tap.
  let lastDecorationImage = null;
  const shareBtn = document.getElementById('shareImageBtn');
  if (shareBtn){
    shareBtn.addEventListener('click', async () => {
      if (!lastDecorationImage) return;
      if (navigator.canShare && navigator.canShare({ files: [lastDecorationImage] })){
        try {
          await navigator.share({
            files: [lastDecorationImage],
            title: 'Decoration Inspiration Photo',
            text: 'Decoration inspiration photo for my Yaadgar Events Planner booking.',
          });
        } catch (err) {
          // User cancelled the share sheet — nothing to do.
        }
      } else {
        alert("Your browser can't share files directly. Please open the WhatsApp chat that just opened and attach the photo manually — it only takes a second.");
      }
    });
  }

  form.addEventListener('reset', () => {
    form.querySelectorAll('.field.error').forEach(f => { f.classList.remove('error'); f.querySelector('.error-msg').textContent = ''; });
  });

  const closeModal = () => { modal.classList.remove('open'); document.body.style.overflow = ''; };
  document.getElementById('modalCloseBtn')?.addEventListener('click', closeModal);
  document.getElementById('modalCloseX')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
}

/* Advance payment details modal (Book Now page) */
function initAdvancePaymentModal(){
  const modal = document.getElementById('advanceModal');
  if (!modal) return;
  const open = () => { modal.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = () => { modal.classList.remove('open'); document.body.style.overflow = ''; };
  document.getElementById('viewAdvancePaymentBtn')?.addEventListener('click', open);
  document.getElementById('proceedAdvanceBtn')?.addEventListener('click', () => {
    document.getElementById('confirmModal')?.classList.remove('open');
    open();
  });
  document.getElementById('advanceModalCloseX')?.addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
}

/* ---------------------------------------------------------------------
   8. CONTACT FORM — validation + WhatsApp handoff + success state
   -------------------------------------------------------------------- */
function initContactForm(){
  const form = document.getElementById('contactForm');
  if (!form) return;
  const successBox = document.getElementById('contactSuccess');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      const wrap = field.closest('.field');
      if (!field.value.trim()){ wrap.classList.add('error'); valid = false; } else { wrap.classList.remove('error'); }
    });
    if (!valid) return;

    const name = document.getElementById('cName')?.value || '-';
    const email = document.getElementById('cEmail')?.value || '-';
    const phone = document.getElementById('cPhone')?.value || 'Not provided';
    const message = document.getElementById('cMessage')?.value || '-';
    const lines = [
      'Hello Yaadgar Events Planner! I have a question.',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Message: ${message}`,
    ];

    openWhatsAppWithMessage(lines.join('\n'));

    form.style.display = 'none';
    if (successBox) successBox.style.display = 'flex';
  });
}

/* ---------------------------------------------------------------------
   9. REVIEW FORM — validation + WhatsApp handoff + success state
   -------------------------------------------------------------------- */
function initReviewForm(){
  const form = document.getElementById('reviewForm');
  if (!form) return;
  const successBox = document.getElementById('reviewSuccess');
  const starWrap = document.getElementById('starRating');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[required]').forEach(field => {
      const wrap = field.closest('.field');
      const err = wrap.querySelector('.error-msg');
      if (!field.value.trim()){ wrap.classList.add('error'); if (err) err.textContent = 'This field is required.'; valid = false; }
      else { wrap.classList.remove('error'); if (err) err.textContent = ''; }
    });

    const rating = form.querySelector('input[name="rating"]:checked')?.value;
    const ratingError = document.getElementById('ratingError');
    if (!rating){
      starWrap?.classList.add('error');
      if (ratingError) ratingError.textContent = 'Please select a rating.';
      valid = false;
    } else {
      starWrap?.classList.remove('error');
      if (ratingError) ratingError.textContent = '';
    }

    if (!valid) return;

    const name = document.getElementById('rName')?.value || '-';
    const eventType = document.getElementById('rEventType')?.value || 'Not specified';
    const reviewText = document.getElementById('rMessage')?.value || '-';
    const stars = '★'.repeat(Number(rating)) + '☆'.repeat(5 - Number(rating));

    const lines = [
      'Hello Yaadgar Events Planner! I would like to share a review of my experience with you:',
      '',
      `Name: ${name}`,
      `Event Type: ${eventType}`,
      `Rating: ${stars} (${rating}/5)`,
      `Review: ${reviewText}`,
    ];

    openWhatsAppWithMessage(lines.join('\n'));

    form.style.display = 'none';
    if (successBox) successBox.style.display = 'flex';
  });
}

/* Active-link highlight for in-page anchors on events.html (scrollspy-lite) */
function initEventsScrollSpy(){
  const sections = document.querySelectorAll('[data-event-section]');
  const navLinks = document.querySelectorAll('.jump-nav a');
  if (!sections.length || !navLinks.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        navLinks.forEach(l => l.classList.remove('active'));
        const match = document.querySelector(`.jump-nav a[href="#${e.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(s => io.observe(s));
}
