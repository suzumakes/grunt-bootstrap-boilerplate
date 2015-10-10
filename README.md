##Let's Kickstart a Site!

I can't be the only one who's somewhat bewildered by boilerplates that incorporate tech stacks that I don't have experience with, right? This is an easy-to-build well documented boilerplate for static sites that should:

1. Help you kickstart _static sites_
2. Make it easy to change parts of many pages at once
3. Minimize the files you push to your server
4. Ensure you **_understand_** what you're doing when you use this boilerplate

I'm using GitHub's [Atom](https://atom.io/) and [iTerm2](https://www.iterm2.com/).

You'll need to have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed.

If you're using a Mac and you haven't checked out [Homebrew](http://brew.sh/), I suggest you do so right away.

####What's the stack here?

1. [Bootstrap](https://github.com/twbs/bootstrap)
2. [Bower](https://github.com/bower/bower)
3. [Grunt](https://github.com/gruntjs/grunt)

And of course, Bootstrap depends on [jQuery](https://github.com/jquery/jquery).

####Credits

1. [Subtle Patterns](http://subtlepatterns.com/) for the background.
2. [Team Treehouse](https://teamtreehouse.com/) for being awesome.

###Initial Setup

Clone or Fork this repo!

####Install Grunt

We'll use npm to install Grunt.

The package.json file specifies the dependencies we'll need here. So we need to install them. If you haven't, install the Grunt Command Line Interface.

    npm install -g grunt-cli

Now Grunt's CLI is available to all of your projects, and we need to install the dependencies needed for this specific project locally, i.e. _in this project folder_.

    npm install

If you encounter an error, make sure npm is updated!

    cd ~
    npm update -g

####Install Bower

The bower.json file specifies the assets we're using here. If you haven't, install Bower.

    npm install -g bower

Now we need to install the dependencies needed for this specific project.

    bower install

###Basic Structure

Grunt is going to build your html pages and fill the css/, img/, and js/ folders, so you don't have to touch those.

Everything you modify will be in the src/ folder.

####HTML

    src/
        html/
            include/
                footer.hmtl
                head.html
                nav.html
            index.html

Looks easy right? You put your content in the actual page files, i.e. "index.html".

If you edit the files in the include folder and run Grunt, those changes will be included where you have: include "(file).html"

####img

    src/
        img/
            code_logos/
            large/
            pages/
            texture/

Grunt copies all of these images to the root img/ folder, and minifies those images in the large/ folder.

####JavaScript

    src/
        JavaScript/
            config/
            js/
            prereq/

Bower compiles JavaScript assets to src/JavaScript/prereq/bower.js and Grunt compiles prereq/, js/, and config/ in that order so you can manage JavaScript dependencies.

####SCSS

    src/
        scss/
            layout/
            vendor/
            style.scss

Bower compiles CSS assets to src/scss/vendor/\_bower.scss and Grunt complies Sass to CSS with a sourceMap and a minified copy.

###Ready?

Follow the structure in the src/ folder, include your content, add your CSS, restyle everything, include plugins and custom JavaScript, put all the wonderful things your site has to offer in, then, when you're ready, run:

    grunt

and Grunt will do every registered task in Gruntfile.js. Oh, I didn't go over the Gruntfile? No worries, I've heavily documented the Gruntfile to help you better understand what's going on at every point, but if you have any questions please let me know :)
