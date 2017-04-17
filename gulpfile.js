var gulp = require("gulp");
const autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    galpif = require('gulp-if');


gulp.task("hello", function () {
    console.log("Hello World!");
});

gulp.task('autoprefixer', () =>
    gulp.src('src/css/style.css')
    .pipe(autoprefixer({
        browsers: ['last 5 versions', 'safari 5', 'ie 6', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
        cascade: false
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream())
);

gulp.task("watch", function () {
    gulp.watch("src/css/*.css", ["autoprefixer"]);
})

gulp.task('browser-sync', function () {
    browserSync.init({
        server: "src/"
    });
});

gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(useref())
    .pipe(galpif("*.js", uglify()))
        .pipe(gulp.dest('dist/'));
});
gulp.task("default", ["browser-sync", "watch"])
