# TWIG Prototype starter with webpack

This package is built to support twig using a webpack 4 workflow.
It has bootstrap and config files all set up and ready to use.

Its mainly built to support prototypes that are to be implemented
with craft cms at a later stage. The same webpack config is used in
our base craft setup.


## Quick start

To start building simply run

`yarn && yarn run start`

This will fire up the `webpack-dev-server` and allow you to see the page at
`localhost:8080`



## Custom twig functions

Custom functions can be built easily by adding them to the webpack config.


### URL generation

To generate the correct path to a different view using this package you can use this function.

```{{ url('pagename') }}```

***Example***
```TWIG
<a href="{{ url('news') }}"> News Archive </a>
```

***Result***
```TWIG
<a href="http://localhost:8080/news.html"> News Archive </a>
```