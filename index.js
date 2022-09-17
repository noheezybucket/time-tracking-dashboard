const dashboard = document.querySelector(".dashboard");

const getData = (timevalue) => {
  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      dashboard.innerHTML = "";
      dashboard.innerHTML += `
      <div class="userbox">
        <div class="user">
          <img src="./images/image-jeremy.png" alt="Jeremy Robson" />
          <p class="user__report">Report for</p>
          <p class="user__name">Jeremy Robson</p>
        </div>
        <div class="dates">
          <p id="daily" onclick="active('daily')">Daily</p>
          <p id="weekly" onclick="active('weekly')">Weekly</p>
          <p id="monthly" onclick="active('monthly')">Monthly</p>
        </div>
      </div>`;
      for (let i = 0; i < data.length; i++) {
        const regx = /\s/;
        dashboard.innerHTML += `
            <div class="activity">
            <div class="activity__header activity__header--${data[i].title
              .toLowerCase()
              .replace(regx, "")}">
            <img src="./images/icon-${data[i].title
              .toLowerCase()
              .replace(regx, "-")}.svg" alt="cartable"></div>
            <h2 class="activity__title">${data[i].title}</h2>
            <h3 class="activity__current">${
              data[i].timeframes[`${timevalue}`].current
            }hrs</h3>
            <p class="activity-previous">Last Week - ${
              data[i].timeframes[`${timevalue}`].previous
            }hrs</p>
          </div>
            `;
      }

      return dashboard;
    })
    .catch((err) => err);
};

const active = (timevalue) => {
  switch (timevalue) {
    case "daily":
      daily.classList.add("active");
      weekly.classList.remove("active");
      monthly.classList.remove("active");
      getData("daily");
      break;
    case "weekly":
      weekly.classList.add("active");
      daily.classList.remove("active");
      monthly.classList.remove("active");
      getData("weekly");

      break;
    case "monthly":
      weekly.classList.remove("active");
      daily.classList.remove("active");
      monthly.classList.add("active");
      getData("monthly");
      break;
    default:
      console.log("not working");
  }
};

window.onload = async () => {
  await getData("weekly");
  console.log("yes");
};
