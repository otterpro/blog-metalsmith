var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var watch = require('metalsmith-watch');
var serve = require('metalsmith-serve');
var autotoc = require('metalsmith-autotoc');
var collections = require('metalsmith-collections');
var tags = require('metalsmith-tags');
var excerpts = require('metalsmith-excerpts');

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
  .use(tags({
    // yaml key for tag list in you pages (front matter: tags: )
    handle: 'tags',
    // path for result pages
    path:'tags/:tag.html',
    //path:':tag.html',
    // this is missing in doc
    //pathPage:'tags/:tag/:num/index.html',
    pathPage:'tags/:tag/:num/index.html',
    // layout to use for tag listing
    //layout:'/partials/tag.hbt',
    layout:'tag.html',
    // provide posts sorted by 'date' (optional)
    sortBy: 'date',
    // sort direction (optional)
    reverse: true,
    // skip updating metalsmith's metadata object.
    // useful for improving performance on large blogs
    // (optional)
    skipMetadata: false,
    // metadatakey: Use a non-default key in the metadata. Useful if you you want to
    // have two sets of tags in different sets with metalsmith-branch.
    //metadataKey: "category",  (DEFAULT: tags)
    // Any options you want to pass to the [slug](https://github.com/dodo/node-slug) package.
    // Can also supply a custom slug function.
    // slug: function(tag) { return tag.toLowerCase() }
    //slug: {mode: 'rfc3986'}
  }))
  .use(excerpts())
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
/*
  */
