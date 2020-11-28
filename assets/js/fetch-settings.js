$(function () {

  // Pull settings from URL.
  const settingsUrl = getParameterByName('settingsUrl');
  if (settingsUrl && history.pushState) {
    // Move settingsUrl param into the hash, so that setSettings doesn't
    // cause a reload loop.
    const cleanedUrl = removeParameterByName('settingsUrl').replace(window.location.hash, '');
    const newUrl = cleanedUrl + '#settingsUrl=' + encodeURIComponent(settingsUrl);
    history.pushState({}, null, newUrl);

    // Reset settings
    $.each(localStorage, function (key, value) {
      localStorage.removeItem(key);
    });
    // Fetch settings data, and set in local storage
    $.getJSON(settingsUrl, setSettings)

  }

  function removeParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&](' + name + '=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[1]) return '';
    return url.replace(results[1], '').replace('&+', '&');
  }

})
