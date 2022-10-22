---
title:  "Write more meaningful time constants"
tags: [js, quick-tip]
draft: true
---

One thing that I strive to achieve is to write code that doesn't need comments to convey meaning. The most basic thing when doing this is to avoid using magic numbers. In this short article, I'll illustrate how I avoid using magic numbers when it comes to time constants.

<quote>
The term **magic number** or **magic constant** refers to the anti-pattern of using numbers directly in source code. This obscures the developers' intent in choosing that number, increases opportunities for subtle errors and makes it more difficult for the program to be adapted and extended in the future.

[Wikipedia](https://en.wikipedia.org/wiki/Magic_number_%28programming%29)
</quote>

Usually, time values in JavaScript are expressed in milliseconds, so what we see in code when it comes to time values is something like this:

```js
performAction(retryConnection, 1320000);
```

If I haven't given you the hint above, it would be hard to know what `1320000` represents. Is it a time interval or maybe a memory limit?

The above is a simple example of a magic number.

After a code review, this code might get changed into this:

```js
const retryInterval = 1320000;
performAction(retryConnection, retryInterval);
```

Now it's clear that it is a time interval, but it is not easy to understand how much `1320000` milliseconds represent. Do we retry the connection in minutes? Hours?

Usually, the next attempt to make it more clear is like this:

```js
const retryInterval = 1000 * 60 * 22;
performAction(retryConnection, retryInterval);
```

Slightly better, but now we have more magic numbers that don't convey much meaning. Let's see if we can do even better:

```js
const retryInterval = 22 * TIME.MINUTES;
performAction(retryConnection, retryInterval);
```

Much better, isn't it?

To write your time constants like this, just throw the following code in your constants file and you're ready to go:

```js
const TIME = {
	MILLISECONDS: 1,
};
TIME.SECONDS = 1000 * TIME.MILLISECONDS;
TIME.MINUTES = 60 * TIME.SECONDS;
TIME.HOURS = 60 * TIME.MINUTES;
TIME.DAYS = 24 * TIME.HOURS;
TIME.WEEKS = 7 * TIME.DAYS;
TIME.MONTHS = 4 * TIME.WEEKS;
TIME.YEARS = 365 * TIME.DAYS;
// Continues adding more units as needed
```

As you can see, we apply the same principle even when we define our constants.

This pattern can be applied to any unit that grows in multiples. Here is how you would express sizes in megabytes:

```js
const SIZE = {
	MEGABYTES: 1,
};
SIZE.GIGABYTES = 1024 * SIZE.MEGABYTES;
SIZE.PETABYTES = 1024 * SIZE.GIGABYTES;
// ...
```

Or distances in millimeters:

```js
const DISTANCE = {
	MILLIMETERS: 1,
};
DISTANCE.CENTIMETERS = 10 * DISTANCE.MILLIMETERS;
DISTANCE.METERS = 100 * DISTANCE.CENTIMETERS;
DISTANCE.KILOMETERS = 1000 * DISTANCE.METERS;
// ...
```

Pretty simple, ha? Now we're one step closer to a more meaningful code.



