(function () {
  var supported = ["en", "de", "es", "ja", "nl", "fr"];
  function pick() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q && supported.indexOf(q) >= 0) return q;
    try { var s = localStorage.getItem("keygel-lang"); if (s && supported.indexOf(s) >= 0) return s; } catch (e) {}
    var langs = navigator.languages || [navigator.language || "en"];
    for (var i = 0; i < langs.length; i++) {
      var code = String(langs[i]).slice(0, 2).toLowerCase();
      if (supported.indexOf(code) >= 0) return code;
    }
    return "en";
  }
  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-lang]").forEach(function (el) {
      el.classList.toggle("on", el.getAttribute("data-lang") === lang);
    });
    document.querySelectorAll(".langs button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-set") === lang ? "true" : "false");
    });
    var t = document.querySelector('[data-title-' + lang + ']');
    if (t) document.title = t.getAttribute('data-title-' + lang);
  }
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".langs button").forEach(function (b) {
      b.addEventListener("click", function () {
        var l = b.getAttribute("data-set");
        try { localStorage.setItem("keygel-lang", l); } catch (e) {}
        apply(l);
      });
    });
    apply(pick());
  });
})();
