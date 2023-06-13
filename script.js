const videoCardContainer = document.querySelector('.video-container');

const apiKey = "AIzaSyBkmoipICuIKDxky5HUSFFNaauOF9k2d74";
const videoUrl = "https://www.googleapis.com/youtube/v3/videos?";
const channelUrl = "https://www.googleapis.com/youtube/v3/channels?";

fetch(videoUrl + new URLSearchParams({
    key: apiKey,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
  .then(res => res.json())
  .then(data => {
    data.items.forEach(item => {
      getChannelIcon(item);
    });
  })
  .catch(err => console.log(err));

const getChannelIcon = (videoData) => { 
  fetch(channelUrl + new URLSearchParams({
    key: apiKey,
    part: 'snippet',
    id: videoData.snippet.channelId
  }))
    .then(res => res.json())
    .then(data => {
      videoData.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
      makeVideoCard(videoData);
    });
};

const makeVideoCard = (data) => {
  videoCardContainer.innerHTML +=
    `<div class="video" onclick="location.href = 'https://www.youtube.com/watch?v=${data.id}'"> 
      <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
      <div class="content">
        <img src="${data.channelThumbnail}" class="channel-icon" alt="">
        <div class="info">
          <h4 class="title">${data.snippet.title}</h4>
          <p class="channel-name">${data.snippet.channelTitle}</p>
        </div>
      </div>
    </div>`;
};

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {
  if (searchInput.value.length > 0) {
    const searchQuery = encodeURIComponent(searchInput.value);
    location.href = `https://www.youtube.com/results?search_query=${searchQuery}`;
  }
});
