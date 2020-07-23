var gulp = require("gulp");
connect = require("gulp-connect");

gulp.task("connect", function () {
  connect.server();
});
gulp.task("default", gulp.series("connect"));
