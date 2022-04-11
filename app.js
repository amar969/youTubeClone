const videoCardContainer = document.querySelector(".video-container");
let API_KEY = "AIzaSyDb0P8DDvcP1U48ydkXg1d0pRp97xitOS4";
let url = `https://www.googleapis.com/youtube/v3/videos?`;
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(
  url +
    new URLSearchParams({
      key: API_KEY,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 50,
      regionCode: "IN",
    })
)
  .then((res) => res.json())
  .then((data) => {
    data.items.forEach((element) => {
      getChannelIcon(element);
    });
  })
  .catch((err) => console.log(err));

const getChannelIcon = (video_data) => {
  fetch(
    channel_http +
      new URLSearchParams({
        key: API_KEY,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      video_data.channelThumbnail =
        data.items[0].snippet.thumbnails.default.url;
      makeVideoCard(video_data);
    });
};

const makeVideoCard = (data) => {
  videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href='https://youtube.com/watch?v={data.id}'">
    <img src="${data.snippet.thumbnails.high.url}" alt="" class="thumbnail">
    <div class="content">
        <img src="${data.channelThumbnail}" alt="" class="channel-icon">
        <div class="info">
            <h4 class="title">${data.snippet.title}</h4>
            <p class="channel-name">${data.snippet.channelTitle}</p>
        </div>
        </div>
    </div>
    `;
};


// search bar

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector(".search-btn");
let searchLink = 'https://www.youtube.com/results?search_query=';

searchBtn.addEventListener("click", () => {
  if(searchInput.value.length){
    location.href = searchLink + searchInput.value;
  }
})