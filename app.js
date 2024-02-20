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
    data.sort((a, b) => b.others.views - a.others.views);

    data.forEach((video) => {
      console.log(video);
      const videoCard = document.createElement("div");
      videoCard.classList.add("item_card");

      let verifiedIcon = "";
      if (video.authors[0].verified === true) {
        verifiedIcon = `<span><i class="fa-solid fa-check"></i></span>`;
      }

      videoCard.innerHTML = `
        ${verifiedIcon}
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
const addBlog = document
  .getElementById("blog")
  .addEventListener("click", () => {
    window.location.href = "index2.html";
  });

setupButtonClick("allButton", 1000);
setupButtonClick("musicButton", 1001);
setupButtonClick("comedyButton", 1003);
setupButtonClick("drawingButton", 1005);
