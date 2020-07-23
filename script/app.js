Handlebars.registerHelper("each_upto", function (ary, max, options) {
  if (!ary || ary.length == 0) return options.inverse(this);

  var result = [];
  for (var i = 0; i < max && i < ary.length; ++i)
    result.push(options.fn(ary[i]));
  return result.join("");
});
Handlebars.registerHelper("rev_each_upto", function (ary, max, options) {
  if (!ary || ary.length == 0) return options.inverse(this);

  var result = [];
  for (var i = ary.length - 1; i > ary.length - 6; i--)
    result.push(options.fn(ary[i]));
  return result.join("");
});

$(document).ready(function () {
  var card = $("#maincard").html();
  var card2 = Handlebars.compile(card);
  var table = $("#maintable").html();
  var table2 = Handlebars.compile(table);
  $.ajax("../Data/Data.json").done(function (data) {
    // const key = ;
    // const value= "86094";
    // const result = data.filter(d=>d[key]==value);

    $(".container_card").html(card2(data));
    $(".container_table").html(table2(data));
  });
});
