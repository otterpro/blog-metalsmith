var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var watch = require('metalsmith-watch');
var serve = require('metalsmith-serve');
var autotoc = require('metalsmith-autotoc');
var collections = require('metalsmith-collections');

Metalsmith(__dirname)
  .metadata({
    title: "Otter's Blog",
    description: "Hello World",
    generator: "Metalsmith",
    url: "http://www.otter.pro/"
  })
  .source('./src')
  .destination('./public')
  .clean(true)
  .use(collections({
    posts: {
      pattern: '*.md',
      sortBy: 'date' ,
      reverse: true
    }
  }))
  .use(markdown({
    breaks:true
  }))
  .use(permalinks( {pattern: ':slug'}))
 .use(autotoc({selector: 'h1, h2'}))
  .use(layouts({
    engine: 'handlebars',
    default: 'post.html'
  }))
 .use(
    watch({
      paths: {'${source}/**/*': true, 'layouts/**/*': '**/*.md'},
      livereload: false,
    }),
  )
  .use(serve())
  .build(function(err, files) {
    if (err) { throw err; }
  });
// .use(permalinks( {}))
