const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const query ={
    q: `${searchTerm} in:name`,
    key: "AIzaSyA3VsVJzPoBF1by_ZatUPFcbypNO2t4I4s",
    per_page: 5 ,
    part:"snippet" 
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  
  console.log( `${result.id.videoId}`);
  return `
  <div class="resultFormat">
  <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
  ${result.snippet.title}<img src="${result.snippet.thumbnails.medium.url}" alt= "${result.snippet.title}"></a>
  </div>
  `;
  

}

function displayYouTubeSearchData(data) {
  //console.log(data.items.map((snippet.title, index)=>renderResult(item)));
  const results = data.items.map((item, index)=>renderResult(item));
  console.log(data.items[0].id.videoId);
  
  $('.searchResults').append(results);
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