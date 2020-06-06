const gulp        = require('gulp')
const sass        = require('gulp-sass')
const rename      = require('gulp-rename')
const uglify      = require('gulp-uglify-es').default;
const cleancss    = require('gulp-clean-css')
const concat      = require('gulp-concat')
const imagemin    = require('gulp-imagemin')
const browsersync = require('browser-sync').create()
const del         = require('del')
const sourcemaps  = require('gulp-sourcemaps')
const babel = require('gulp-babel');


// PATH
const paths = {
    js: {
        src: ['./src/js/**/*.js'],
        dest: './dist/js',
    },
    css: {
        // src: ['./src/scss/**/*.scss'],
        src: ['./src/scss/styles.scss'],
        dest: './dist/css'
    },
    images: {
        src: ['./src/images/**/*'],
        dest: './dist/images'
    },
    html: {
        src: ['./*.html'],
    }
}


const styles = () =>
    gulp.src(paths.css.src)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass().on('error', sass.logError))
        .pipe(cleancss())
        .pipe(concat('styles.css'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.css.dest))
        .pipe(browsersync.stream())

const scripts = () =>
    gulp.src(paths.js.src)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
        }))
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.js.dest))
        .pipe(browsersync.stream())

const images = () =>
    gulp.src(paths.images.src, {since: gulp.lastRun(images)} )
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest))

// BROWSER SYNC (live)
const browserSyncWatch = () => {
    browsersync.init({
        server: { baseDir: "./" },
        port: 8000
    })
}

const clean = () => del(['public'])

const watchFiles = () => {
    gulp.watch(paths.js.src, scripts)
    gulp.watch(paths.css.src, styles)
    gulp.watch(paths.images.src, images)
}



// SERIES
const watcher = gulp.parallel(watchFiles, browserSyncWatch)
const build = gulp.series(clean, gulp.parallel(styles, scripts, images));

exports.watch = watcher         // exec with : gulp watcher
exports.build = build         // exec with : gulp build
exports.image = images
