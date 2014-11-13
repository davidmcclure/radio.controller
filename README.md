# Radio.Controller

An itty-bitty, super-simple, low-drama controller component for [Backbone.radio](https://github.com/marionettejs/backbone.Radio).

## Installation

Install with [npm](https://www.npmjs.org):

```bash
npm install radio.controller --save
```

Use with [Browserify](http://browserify.org):

```javascript
var Controller = require('backbone.radio');
```

## Usage

The word "controller" has been used to describe lots of different patterns in front-end architecture in the last couple years. Here, it's just a simple component that automatically binds events, commands, and requests pubished with [Backbone.Radio](https://github.com/marionettejs/backbone.Radio) onto callbacks. A controller could be used in lots of different ways. I like to think of it as a component that _manges the lifecycle of a view_ - it instantiates it when the application starts, feeds it with data and triggers state changes, and tears it down when it's not needed anymore. But, there are lots of ways to skin a cat!

### Events

A controller can bind to events on multiple channels. Use the same syntax you'd use to bind UI events to callbacks in a Backbone view:

**Style 1: Like Backbone views**

```javascript
var Ctl = Controller.extend({

  events: {
    'channel1 event1': 'event1',
    'channel1 event2': 'event2',
    'channel2 event3': 'event3',
    'channel2 event4': 'event4'
  },

  event1: function() { /* .. */ },
  event2: function() { /* .. */ },
  event3: function() { /* .. */ },
  event4: function() { /* .. */ }

});
```

And, then, triggering the bound events will fire the callbacks.

```javascript
var channel1 = Radio.channel('channel1');
channel1.trigger('event1'); // Calls Ctl.event1();
```

Sometimes, you want to subscribe _lots_ of events on the same channel, and it gets annoying to duplicate the event name over and over again in the key names. If you want, you can use an alternate syntax that lets you nest a bunch of event-callback pairs under a single key that identifies the channel. So, this is equivalent:

**Style 2: Nested objects**

```javascript
var Ctl = Controller.extend({

  events: {
    channel1: {
      event1: 'event1',
      event2: 'event2'
    },
    channel2: {
      event3: 'event3',
      event4: 'event4'
    }
  },

  event1: function() { /* .. */ },
  event2: function() { /* .. */ },
  event3: function() { /* .. */ },
  event4: function() { /* .. */ }

});
```

### Commands and Requests

The semantics of commands and requests are a bit different. So as not to violate the [single responsibity principle](http://en.wikipedia.org/wiki/Single_responsibility_principle) and incur the wrath of Robert Martin, Radio.Controller assumes that a controller only ever responds to commands or requests on a single channel. This makes sense, if you think about it - if you're writing a `Map` controller, it should respond to requests like `map:getLonLat` or `map:getZoom`, but not things like `timeline:getDate` - that's the `Timeline` controller's job.

Radio.Controller formalizes this by connecting to a "local" channel set on the controller, and then binding command/request callbacks on that channel. Eg:

```javascript
var Map = Controller.extend({

  channel: 'map',

  commands: {
    command1: 'command1',
    command2: 'command2'
  },

  requests: {
    request1: 'request1',
    request2: 'request2'
  },

  command1: function() { /* .. */ },
  command2: function() { /* .. */ },
  request1: function() { /* .. */ },
  request2: function() { /* .. */ }

});
```

And, now, commands/requests on the `map` channel will get routed accordingly:

```javascript
var mapChannel = Radio.channel('map');
mapChannel.command('command1'); // Calls Map.command1();
mapChannel.request('request2'); // Calls Map.request2();
```

## Bugs/Ideas/PRs

File an issue here, or hit me up on Twitter ([@clured](https://twitter.com/clured)).
