function parseChangelog(cardElement, url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send(null);
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        var monthNames = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];
        var cardText = "";
        var a = JSON.parse(request.responseText);
        a.forEach(function(changelog) {
          var date = new Date(changelog.date);
          var releaseDate = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        
          var changeText = "<ul>";
          changelog.changes.forEach(function(change) {
            changeText += `<li>${change.text}</li>`;
          });
          changeText += "</ul>";
        
          cardText += `<p><h2>${changelog.versionName} — ${releaseDate}</h2>${changeText}</p>`;
        });
        cardElement.innerHTML += cardText;       
      }
    }
}