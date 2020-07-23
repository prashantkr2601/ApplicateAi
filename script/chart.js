$.getJSON("http://localhost:8080/Data/Data.json", function (data) {
  var labels = data.user.map(function (e) {
    // // if (e.status == "confirm") {
    //   console.log(e.orderDate);
    return e.orderDate;
    // }
  });
  var amount = data.user.map(function (e) {
    // if (e.status == "confirm") {
    //   console.log(e.totalAmount);
    return e.totalAmount;
    // }
  });

  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    type: "line",

    data: {
      labels: labels,
      datasets: [
        {
          data: amount,
          lable: "date vs amount",
          fill: false,
          backgroundColor: "transparent",
          borderColor: "#150ab8",
        },
      ],
    },
    options: {
      responsive: "true",
    },
  });
});
