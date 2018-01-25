const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const query ={
    q: `${searchTerm} in:name`,
    key: "AIzaSyA3VsVJzPoBF1by_ZatUPFcbypNO2t4I4s",
    maxResults: 50,
    pageInfo: {
      resultsPerPage: 50
    },
    part:"snippet" 
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  
  console.log(`${result.id.videoId}`);
  return `
  <div class="resultFormat">
  <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
  <img src="${result.snippet.thumbnails.medium.url}" alt= "${result.snippet.title}">${result.snippet.title}</a>
  </div>
  `;
  

}

function displayYouTubeSearchData(data) {
  //console.log(data.items.map((snippet.title, index)=>renderResult(item)));
  const results = data.items.map((item, index)=>renderResult(item));
  console.log(data.items.length);
  numResults = data.items.length;
  $('.js-results')
  .prop('hidden', false)
  .html(`<div class="numResults">${numResults} Results Returned</div> ${results}`);
}

function watchSubmit() {
  $(".searchResults").hide();
  $('.form-submit').submit(event => {
    event.preventDefault();
    $(".searchResults").show();
    const queryTarget = $(event.currentTarget).find('.queryText');
    const query = queryTarget.val();
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);