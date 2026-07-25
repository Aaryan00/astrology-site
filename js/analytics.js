/* Google Analytics 4 (gtag) configuration.
   Kept in a self-hosted file so the Content-Security-Policy can stay strict
   (script-src 'self' + googletagmanager.com — no 'unsafe-inline' needed).
   The gtag.js loader itself is included via <script async> in each page head. */
(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());

  // Don't send hits from local development.
  var host = location.hostname;
  if (host !== 'localhost' && host !== '127.0.0.1' && host !== '') {
    gtag('config', 'G-GWDX9YK5P0');
  }
})();
