const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass'); 
const browserSync = require('browser-sync').create();
const surge = require('gulp-surge');
const minify = require('gulp-minify');

gulp.task('compress', () => {
    gulp.src(['app/js/*.js'])
      .pipe(minify())
      .pipe(gulp.dest('dist'))
  });

gulp.task('babelize', () => {
    gulp.src('app/es6/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('app/js'));
});

gulp.task('sass', () => {
    gulp.src('app/sass/**/*.sass')
        .pipe(sass({sourceComments: 'normal'})) // using gulp-sass
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('surge', [], () => surge({
    project: './',
    domain: 'daft-wiki.surge.sh'
}))

gulp.task('watch', ['browserSync', 'babelize'], function() {
    gulp.watch('app/es6/**/*.js', ['babelize', 'compress']);
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/css/**/*.css', browserSync.reload);
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});
