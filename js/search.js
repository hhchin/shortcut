"use strict";
$(document).ready(function() {
  $.when(
    $.getScript("/js/fuse.min.js"),
    $.getScript("/js/masterArr.js"),
    $.Deferred(function(deferred) {
      $(deferred.resolve);
    })
    ).done(function() {
      console.log("total entries in master list: " + masterList.length);

      var fuseOptions = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ["name"]
      };
      var fuse = new Fuse(masterList, fuseOptions);

      function query() {
        var queryTerms = document.getElementById("searchBar").value;
        var result = fuse.search(queryTerms);
        var resultListHTML = "";
        for (var i = 0; i < result.length; i++) {
          if (result[i].url === "") {
            resultListHTML +=
            '<li><a>' +
            result[i].name +
            "</a></li>";
          } else {
            resultListHTML +=
            '<li><a href="' +
            result[i].url +
            '" target="_blank">' +
            result[i].name +
            "</a></li>";
          }
        }
        $("#resultList").empty();
        $("#resultList").append(resultListHTML);
      }

      document.getElementById("searchSubmit").addEventListener("click", query);
      document
      .getElementById("searchBar")
      .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
          query();
        }
      });
  }); //end of main function
  });
