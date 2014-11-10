# Radio.Controller

A simple controller component for [Backbone.radio](https://github.com/marionettejs/backbone.Radio), a delightful little library that breaks out the messaging patterns from [Backbone.Marionette](http://marionettejs.com).

## Installation

Install with npm:

```bash
npm install radio.controller --save
```

Use with [Browserify](http://browserify.org):

```javascript
var Controller = require('backbone.radio');
```

## Usage

Radio.Controller works sort of like the `events` object on a regular Backbone view, which maps UI events to callbacks on the view - except, on a controller, the events can be any event, command, or request published via Backbone.Radio.

### Events

A controller can bind to events on multiple channels. Use the same syntax you'd use to bind UI events to view methods, except, use the format `<channel> <event>` instead of `<event> <selection>`. Like so:

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

And, then, triggering the bound events will fire the callbacks. So, this:

```javascript
var channel1 = Radio.channel('channel1');
channel1.trigger('event1');
```

... will call `Ctl.event1()`.

Sometimes, you want to subscribe _lots_ of events on the same channel, and it gets annoying to duplicate the event name over and over again in the key names. If you want, you can use an alternate syntax that lets you nest a bunch of event-callback pairs under a single key that identifies the channel. So, this is equivalent:

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
