Projects
=======
> Code Samples for Anthony Su

# 1. Guac
> DOM Framework based of jQuery tested with Mocha and integrate continuously with Travis CI

Learn more in detail about what I learned from reading jQuery source via my blog post
[http://radialglo.github.io/blog/2014/10/27/additional-things-i-learned-from-jquery-source/](http://radialglo.github.io/blog/2014/10/27/additional-things-i-learned-from-jquery-source/)
- **Repository url:** [https://github.com/radialglo/guac](https://github.com/radialglo/guac)
  - To clone, run ```git clone https://github.com/radialglo/guac.git```
- **Tests:** [/test](https://github.com/radialglo/guac/tree/master/test)

My library implements a subset of jQuery's functionality namely static methods like ```$.each``` in [core.js](https://github.com/radialglo/guac/blob/master/src/core.js)
a [PubSub/event system](https://github.com/radialglo/guac/blob/master/src/events.js), [class manipulation](https://github.com/radialglo/guac/blob/master/src/attributes/classes.js),
and [AJAX](https://github.com/radialglo/guac/blob/master/src/ajax.js).
The library ES5 features like ```document.querySelectorAll```, ```Array.prototypeforEach```, and ```Array.prototype.some```.
I also added a static method ```Guac.some``` to help simplify the implementation of some methods like ```hasClass```.
My event system is based off [Dean Edwards addEvent](http://dean.edwards.name/weblog/2005/10/add-event/).

### Some things I learned
- jQuery stores queried objects directly in ```this```. Since many methods return ```this``` for method chaining, this structure
allows for convenient indexing like ```$(".myclass")[0]```.
- jQuery has a static version of ```jQuery.each``` and a prototype version ```jQuery.prototype.each``` which uses ```jQuery.each```.
Internally many of jQuery's methods uses ```jQuery.prototype.each``` to take advantage of implicit iteration.

# 2. Ready for Khan Academy
> Conceptualized, designed and implemented 3D slide deck to complement my application to Khan Academy. 
This site was developed with Vanilla JavaScript, CSS3D Transforms, CSS3 Transitions, Animated SVGs, Canvas and Web Workers.
Built with consideration of motion, responsive design, browser compatibility, scalability and performance. 

- **Live url:** [http://www.readyforkhanacademy.com/](http://www.readyforkhanacademy.com/)
- **Repository url:** [https://github.com/radialglo/readyforkhanacademy/tree/master](https://github.com/radialglo/readyforkhanacademy/tree/master)
  - To clone run ```git clone https://github.com/radialglo/readyforkhanacademy.git```
- **In Depth Technical/Soft Description of Project**: [How I Built readyforkhanacademy.com and What I Learned Applying to Khan Academy](https://medium.com/@radialglo/how-i-built-readyforkhanacademy-com-and-what-i-learned-applying-to-khan-academy-4ba364452a1b) 
- [Web Worker used for Image Processing](https://github.com/radialglo/readyforkhanacademy/blob/master/assets/js/src/thread/prepareVideoSlideView.js)

Please note that the ```master``` branch is different from the ```gh-pages``` branch as the code on the ```gh-pages``` is a compiled
down version of the ```master`` branch and certain routses have been changed.

