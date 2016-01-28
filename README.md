##Let's Kickstart a Site!

I can't be the only one who's somewhat bewildered by boilerplates that incorporate tech stacks that I don't have experience with, right? This is an easy-to-build well documented boilerplate for static sites that should:

1. Make it easy to kickstart _static sites_
2. Use Grunt-Includes to emulate PHP-style includes, making your site more modular
3. Minimize and prepare your files for deployment
4. Give _you_ a starting point for you to take advantage of Grunt and Bower for your projects

I'm using [GitHub's Atom](https://atom.io/) and [iTerm2](https://www.iterm2.com/)

You'll need [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/)

If you're using a Mac, check out and start using [Homebrew](http://brew.sh/)

####What's the stack here?

1. [Bootstrap](https://github.com/twbs/bootstrap)
2. [Bower](https://github.com/bower/bower)
3. [Grunt](https://github.com/gruntjs/grunt)

And of course, Bootstrap depends on [jQuery](https://github.com/jquery/jquery).

####Credits

1. [Subtle Patterns](http://subtlepatterns.com/) for the background.
2. [Team Treehouse](https://teamtreehouse.com/) for being awesome.

###Initial Setup

Install the Grunt Command Line Interface.
```
npm install -g grunt-cli
```
The package.json file specifies the dependencies we'll need here. So we need to install them.
```
npm install
```
If you encounter any errors, make sure to check [npm's Issues](https://github.com/npm/npm/issues)

Install Bower globally.
```
npm install -g bower
```
Now we need to install the dependencies listed in the bower.json file.
```
bower install
```
###Basic Structure

Grunt builds your html pages and fills the /css, /img, and /js folders, so you don't have to touch those.

Everything _you_ modify will be in the src/ folder.

####HTML
```
src/
    html/
        include/
            footer.hmtl
            head.html
            nav.html
        index.html
```
Looks easy right? You put your content in the actual page files, i.e. "index.html".

If you edit the files in the include folder and run Grunt, those changes will be included where you have: include "(file).html"

####img
```
src/
    img/
        code_logos/
        large/
        pages/
        texture/
```
Grunt minifies images in the large/ folder and copies all others to /img/.

####JavaScript
```
src/
    js/
        _bower.js
        config/
```
Grunt compiles JavaScript to js/ => js/config/ => script.js.

####SCSS
```
src/
    scss/
        FontAwesome/
        layout/
        _bower.scss
        style.scss
```
Grunt compiles to scss/ runs Sass, and outputs CSS to /css/style.css.

###Ready?

Follow the structure in the src/ folder, include your content, add your Sass/CSS, restyle everything, include plugins and custom JavaScript, put all the wonderful things your site has to offer in, then, when you're ready, run:
```
grunt
```
The 'default' task compiles "development" versions of your assets, they are not minified or mangled and are ready for you to test.
```
grunt build
```
The 'build' task minifies and mangles your assets, getting them ready for production.

###Oh!

I didn't go over the Gruntfile? No worries, I've heavily documented it to help you better understand what's going on at every point, but if you have any questions please let me know :)

I changed the license to MIT to get rid of Bower's complaints. Do whatever you want with this repo.
