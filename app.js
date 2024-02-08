const loadData = (categoryId) => {
  fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  )
    .then((res) => res.json())
    .then((data) => displayData(data.data));
};
const setupButtonClick = (buttonId, categoryId) => {
  document.getElementById(buttonId).addEventListener("click", () => {
    if (buttonId === "drawingButton") {
      const emptyButton = document.createElement("h1");
      emptyButton.innerHTML = "";
    }
    loadData(categoryId);
  });
};

const displayData = (data) => {
  const videoContainer = document.getElementById("video_container");
  videoContainer.innerHTML = "";
  if (data.length === 0) {
    const ins = document.createElement("div");
    ins.classList.add("No_data");
    ins.innerHTML = `
    <img class="icon_img" src="icon.png" alt="">
    <h1>OOPS!! Sorry, There is No Content Here.</h1>
    `;
    videoContainer.appendChild(ins);
  } else {
    data.forEach((video) => {
      console.log(video);
      const videoCard = document.createElement("div");
      videoCard.classList.add("item_card");
      
      // Check if the video is verified
      if (video.authors[0].verified === true) {
        videoCard.innerHTML = `
          <span><i class="fa-solid fa-check"></i></span>
        `;
      }
      
      videoCard.innerHTML = videoCard.innerHTML + `
        <div class="Card_details">
          <img class="img_div" src="${video.thumbnail}" alt="">
          <img class="img_profile" src="${video.authors[0].profile_picture}" alt="">
          <span class="tittle">${video.title}</span>
          <h3 class="name">${video.authors[0].profile_name}</h3>
          <h5 class="view">${video.others.views}</h5>
        </div>
      `;
      
      videoContainer.appendChild(videoCard);
    });
  }
};

setupButtonClick("allButton", 1000);
setupButtonClick("musicButton", 1001);
setupButtonClick("comedyButton", 1003);
setupButtonClick("drawingButton", 1005);
