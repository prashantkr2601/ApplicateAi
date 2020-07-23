$.getJSON("http://localhost:8080/Data/Data.json", function (data) {
  var t = new Date();
  var d = t.getDate();
  var m = t.getMonth() + 1;
  var y = t.getFullYear();
  if (d > 7) {
    var w = d - 7;
  } else w = d;
  if (m > 1) {
    var pm = m - 1;
  } else pm = m;

  if (m < 10) {
    m = "0" + m;
  }
  if (d < 10) {
    d = "0" + d;
  }

  if (pm < 10) {
    pm = "0" + pm;
  }
  if (w < 10) {
    w = "0" + w;
  }
  //   console.log(d);
  //   console.log(w);
  //   console.log(pm);

  var tdate = d + "/" + m + "/" + y;
  var wdate = w + "/" + m + "/" + y;
  var mdate = d + "/" + pm + "/" + y;

  var torder = 0;
  var tamount = 0;
  var worder = 0;
  var wamount = 0;
  var morder = 0;
  var mamount = 0;
  var mtdorder = 0;
  var mtdamount = 0;

  var today_details = data.user.map(function (e) {
    if (e.orderDate == tdate && e.status == "confirm") {
      torder = torder + 1;
      tamount = tamount + e.totalAmount;
    }
  });

  var today_details = data.user.map(function (e) {
    let da = e.orderDate;
    let month = da.slice(3, 5);
    // console.log(month);
    let day = da.slice(0, 2);
    // console.log(m == month);
    if (day >= w && e.status == "confirm") {
      worder = worder + 1;
      wamount = wamount + e.totalAmount;
    }
  });

  var today_details = data.user.map(function (e) {
    let da = e.orderDate;
    let month = da.slice(3, 5);
    // console.log(month);
    let day = da.slice(0, 2);
    // console.log(day >= d && pm <= month, day <= d && m == month);
    if (
      ((day >= d && pm <= month) || (day <= d && m == month)) &&
      e.status == "confirm"
    ) {
      morder = morder + 1;
      mamount = mamount + e.totalAmount;
    }
  });
  var today_details = data.user.map(function (e) {
    if (e.totalAmount && e.status == "confirm") mtdorder = mtdorder + 1;
    mtdamount = mtdamount + e.totalAmount;
  });
  data.count[0].torder = torder;
  data.count[0].worder = worder;
  data.count[1].torder = morder;
  data.amount[0].tamount = tamount;
  data.amount[0].wamount = wamount;
  data.amount[1].tamount = mamount;
  data.count[1].worder = mtdorder;
  data.amount[1].wamount = mtdamount;

  Handlebars.registerHelper("torder", function () {
    return torder;
  });
  Handlebars.registerHelper("worder", function () {
    return worder;
  });
  Handlebars.registerHelper("morder", function () {
    return morder;
  });
  Handlebars.registerHelper("tamount", function () {
    return tamount;
  });
  Handlebars.registerHelper("wamount", function () {
    return wamount;
  });
  Handlebars.registerHelper("mamount", function () {
    return mamount;
  });
  Handlebars.registerHelper("mtdorder", function () {
    return mtdorder;
  });
  Handlebars.registerHelper("mtdamount", function () {
    return mtdamount;
  });
  $(document).ready(function () {
    $("#submit").click(function (e) {
      e.preventDefault();
      var sdate = $("#sdate").val();
      var edate = $("#edate").val();
      //   $(".update_table4").html(sdate + " " + " " + edate);
      var today_details = data.user.map(function (e) {
        let da = e.orderDate;
        let month = da.slice(3, 5);
        // console.log(month);
        let day = da.slice(0, 2);
        let year = da.slice(6, 10);
        // console.log(year);

        let sday = sdate.slice(8, 10);
        let smonth = sdate.slice(5, 7);
        let syear = sdate.slice(0, 4);

        let eday = edate.slice(8, 10);
        let emonth = edate.slice(5, 7);
        let eyear = edate.slice(0, 4);
        // console.log(sday);
        // console.log(smonth);
        // console.log(syear);
        // console.log(eday);
        // console.log(emonth);
        // console.log(eyear);

        if (
          (day >= sday &&
            month >= smonth &&
            year >= syear &&
            day <= eday &&
            month <= emonth &&
            year <= eyear) ||
          (day <= sday &&
            month < smonth &&
            year >= syear &&
            day <= eday &&
            month <= emonth &&
            year <= eyear) ||
          (day >= sday &&
            month >= smonth &&
            year >= syear &&
            day >= eday &&
            month <= emonth &&
            year <= eyear) ||
          (day <= sday &&
            month < smonth &&
            year >= syear &&
            day >= eday &&
            month < emonth &&
            year <= eyear)
        ) {
          return e;
        }
      });
      console.log(today_details);
    });
  });
});

// var update_table = $("#update_table").html();
//           var update_table2 = Handlebars.compile(update_table);
//           $.ajax(e).done(function (a) {
//             console.log(update_table2(a));
//             $(".update_table4").html(update_table2(a));
//           });var update_table = $("#update_table").html();
//           var update_table2 = Handlebars.compile(update_table);
//           $.ajax(e).done(function (a) {
//             console.log(update_table2(a));
//             $(".update_table4").html(update_table2(a));
//           });