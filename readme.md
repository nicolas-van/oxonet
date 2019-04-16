
# Becode Template for JavaScript Exercises

Hello ! This is a simple but effective template to use in Becode's JavaScript exercises.

## Starting a new project from this template

```bash
sudo npm install -g download-git-repo-cli
download-git-repo github:becodeorg/becode-js-web-template <your project name>
cd <your project name>
git init
git add .
git commit -m "Initial commit"
npm install
```

Then setup a new repository on Github and publish this first version.

## Usage guide

### Installing dependencies

This project uses [npm](https://www.npmjs.com/) to download its dependencies. To install everything it needs just type:

```bash
npm install
```

### Running the project

You can't just open an `index.html` file with your web browser as this project depends on a build system named [Parcel](https://parceljs.org/). It takes care of a lot of boring tasks like rewriting the JavaScript to work on older browsers or compiling SCSS files to CSS. It doesn't mean it's complicated to use.

Just type this command to launch a small web server that propose your JavaScript application and automatically recompile your code when you modify it:

```bash
npm run dev
```

Your application can then be consulted at `http://localhost:1234`.

### Building the project and publishing on Github Pages

If you want to deploy this website for real you must first build it with this command:

```bash
npm run build
```

The result of the build will then be available in the `docs` folder. Then commit and push.

As long as your project as been properly configured to enable Github Pages on the `docs` folder it will be published.

### Multiple pages

If you want to define multiple pages for you application you could define multiple `.html` files. But it would mean you would have to copy-paste a lot of HTML tags in each file, and that's an horribly bad practice.

To solve this problem this template integrates [Nunjucks](https://mozilla.github.io/nunjucks/), a template engine.

To create a new page just define a new `.njk` file. Here is an example using a file named `page2.njk`:

```html
{% extends "_common.njk" %}

{% block content %}
<p>
  Hey, I'm a new page !
</p>
{% endblock %}
```

Then just add a link to this new page in `index.njk`:

```html
<a href="./page2.njk">To new page</a>
```

Everything will be processed by Parcel and all `.njk` files will be replaced by `.html` files.

## Files

* [index.njk](./index.njk): The main page of the application.
* [_common.njk](./_common.njk): The Nunjucks template containing the common interface elements that should appear on all pages. Don't forget to modify the title of the exercise!
* [style.scss](./style.scss): A [SCSS](https://sass-lang.com/) file that will automatically be compiled to CSS to be loaded by the HTML file. Useful if you want to add some custom CSS.
* [script.js](./script.js): A JavaScript file that is loaded by the HTML file. Modify this for every exercise.

## Integrated libraries

This template already integrate some libraries and tools:

* [Nunjucks template](https://mozilla.github.io/nunjucks/): A template engine. It is used to process HTML templates before the deployment of the application in case you want multiple pages. (And copy-pasting a bunch of HTML tags in muliple files would be very bad isn't it?)
* [Bootstrap](https://getbootstrap.com/): A CSS framework containing a lot of useful components, both in CSS and JavaScript. This template uses the [Litera](https://bootswatch.com/litera/) Bootstrap template.
* [Sass](https://sass-lang.com/): A CSS precompiler which is used to compile Bootstrap.
* [Font Awesome](https://fontawesome.com/): A library of icons that we can use to display nice little icons everywhere. There are even cats in it :smiley_cat: !
