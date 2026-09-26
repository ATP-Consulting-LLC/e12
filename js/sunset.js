/* ==========================================================================
   Takedown notice: this site closes on 2026-10-26.

   A dismissible banner at the top of every public page with a countdown that
   is worked out in the visitor's own browser each day. Dismissing it hides it
   for the rest of that day only; it comes back the next day. Load after
   chrome.js so the language switch re-draws it.
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
    var left = n > 1 ? T(n + " days left", "quedan " + n + " días")
      : n === 1 ? T("1 day left", "queda 1 día")
      : T("last day", "último día");
    var when = n > 0
      ? T("This site will be taken down on October 26, 2026", "Este sitio se dará de baja el 26 de octubre de 2026")
      : T("This site is being taken down today", "Este sitio se da de baja hoy");
    bar.innerHTML =
      '<div class="sunset-in">' +
        '<p class="sunset-msg"><strong>' + when + ' (' + left + ').</strong> ' +
          T("Owners: contact ", "Propietarios: escriban a ") +
          '<a href="mailto:' + CONTACT + '">' + CONTACT + '</a>' +
          T(" for more information.", " para más información.") +
        '</p>' +
        '<div class="sunset-actions">' +
          '<a class="sunset-visit" href="' + ATP + '">' + T("Visit ATP Consulting", "Visitar ATP Consulting") + '</a>' +
          '<button type="button" class="sunset-close" aria-label="' + T("Dismiss notice", "Cerrar aviso") + '">&times;</button>' +
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
