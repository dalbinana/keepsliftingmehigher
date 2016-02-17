if (typeof window.KeepsLiftingMe === 'undefined') {
  window.KeepsLiftingMe = {};
}
KeepsLiftingMe.init = function () {
  var spoti = new KeepsLiftingMe.Spotify;
 

  // $('form').on('submit', spoti.fetchSong.bind(spoti));
}
$(document).on('ready', KeepsLiftingMe.init);