LeapJS Plugins
==============

This repository holds a collection of independent plugins which extend the functionality of LeapJS itself.

## Usage

Include LeapJS >= 0.4.0 and either javascript file of an individual plugin or a collection.
Configure your controller to use the plugin, and that functionality will be available to you.
See [hand-entry](http://leapmotion.github.io/leapjs-plugins/docs/index.html#hand-entry) for docs on hand-entry itself.

```html
<!-- your index.html -->
<script type="text/javascript" src="js/leap-0.4.0.js"></script>
<script type="text/javascript" src="js/lib/leap.hand-entry.js"></script>
<script type="text/javascript">
  new Leap.Controller()
    .use('handEntry')
</script>
```

 - Download [from the CDN](http://developer.leapmotion.com/leapjs/plugins).
 - Each plugin is individually documented, with demo, on the gh-pages [docs site](http://leapmotion.github.io/leapjs-plugins/docs/).
 - See [making plugins](http://github.com/leapmotion/leapjs/wiki/plugins) on the leapjs wiki.



Contributing
===============

 - Make a fork, name your branch, add your plugin or fix.
 - Add your name, email, and github account to the CONTRIBUTORS.txt list, thereby agreeing to the terms and conditions of the Contributor License Agreement.
 - Open a Pull Request. If your information is not in the CONTRIBUTORS file, your pull request will not be reviewed.
