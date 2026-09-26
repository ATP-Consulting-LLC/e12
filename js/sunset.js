/* ==========================================================================
   Takedown notice: this site closes on 2026-10-26.

   A compact, dismissible bar at the top of every public page with a countdown
   worked out in the visitor's own browser each day. Dismissing it hides it for
   the rest of that day only; it comes back the next day. Load after chrome.js
   so the language switch re-draws it.
   ========================================================================== */
(function () {
  var END = { y: 2026, m: 10, d: 26 };
  var KEY = "e12_sunset_dismissed";
  var CONTACT = "veravoss@atpconsultancy.com";
  var ATP = "https://atpconsultancy.com";

  function today() {
    var n = new Date();
    return { y: n.getFullYear(), m: n.getMonth() + 1, d: n.getDate() };
  }
  function stamp(t) { return t.y + "-" + t.m + "-" + t.d; }
  function daysLeft(t) {
    return Math.round((Date.UTC(END.y, END.m - 1, END.d) - Date.UTC(t.y, t.m - 1, t.d)) / 86400000);
  }
  function dismissedToday(t) {
    try { return localStorage.getItem(KEY) === stamp(t); } catch (e) { return false; }
  }

  var T = window.__lyxT || function (en) { return en; };
  var t = today();
  if (dismissedToday(t)) return;

  var bar = document.createElement("div");
  bar.className = "sunset";
  bar.setAttribute("role", "region");
  bar.setAttribute("aria-label", "Site notice");

  function render() {
    var n = daysLeft(t);
    var headline = n > 1 ? T("Closing Oct 26 · " + n + " days left", "Cierra el 26 de oct · quedan " + n + " días")
      : n === 1 ? T("Closing Oct 26 · 1 day left", "Cierra el 26 de oct · queda 1 día")
      : T("This site closes today", "Este sitio cierra hoy");
    bar.innerHTML =
      '<div class="sunset-in">' +
        '<div class="sunset-text">' +
          '<p class="sunset-head">' + headline + '</p>' +
          '<p class="sunset-sub">' + T("Owners: ", "Propietarios: ") +
            '<a href="mailto:' + CONTACT + '">' + CONTACT + '</a></p>' +
        '</div>' +
        '<div class="sunset-actions">' +
          '<a class="sunset-visit" href="' + ATP + '">' + T("Visit ATP Consulting", "Visitar ATP Consulting") + '</a>' +
          '<button type="button" class="sunset-close" aria-label="' + T("Dismiss notice", "Cerrar aviso") + '">' +
            '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>';
    bar.querySelector(".sunset-close").addEventListener("click", function () {
      try { localStorage.setItem(KEY, stamp(today())); } catch (e) {}
      bar.remove();
    });
  }

  render();
  document.body.insertBefore(bar, document.body.firstChild);
  document.addEventListener("lyxlang", function () { if (bar.isConnected) render(); });
})();
