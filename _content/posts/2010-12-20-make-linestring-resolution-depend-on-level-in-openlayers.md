---
title:  "Make LineString Resolution Depend on Zoom Level in OpenLayers"
date:   2010-12-20
tags: [web]
---

So, you want to render a route on your OpenLayers map. Everything will be nice and sweet until you’ll have to render a huge route, in which case no matter what computer your clients have, most probably it will stall. To solve this you have two possibilities: you either reduce the number of lines you send from the server or you reduce the number of points rendered directly on the client’s browser.

Both solutions will raise a problem: if the user will zoom deep enough, they will see a discrepancy between the route and the road (the number of points in the route will not be equal with the number of point on the road). So, the road may do a turn where your route plotting will just cut the corner. To solve this, I found a very adaptive solution that will reduce the number of point in your route the further you zoom out.

The solution is to create a custom renderer. In the following example it is shown how to override the default behaviour for the SVG renderer, but you can implement it also for other renderer if required.

<script src="https://gist.github.com/surdu/1e298cff07ed81c7c0c562956019b76b.js"></script>

The way I determine by how much to reduce the number of points based on the zoom is simple: I just have an array of zoom factors. If the user zoom to level `x` it just looks which is the closest value to `x` defined in my array.

Ok, so after you’ve defined your new renderer, it’s time to use it on your map. The way to do this is to add it to your vector layer that you use to render your route like so:

<script src="https://gist.github.com/surdu/ca21acb448fa75d5b61f27d71e3ac245.js"></script>

You just have to add the name of your render class as a string. The default list of renderers where `['SVG', 'VML', 'Canvas']`. So you noticed how I’ve changed only the SVG with my renderer. That is because browsers like Internet Explorer does not support SVG. This way, if OpenLayers sees that it can not use our `Smart` renderer, it will proceed with the next one in the list until it finds one that it can use.

Of course, if the browser will use `VML` or `Canvas`, you’ll have again this problem, so you may want to implement this solution also for the other renderers. I suspect it’s just a matter of changing the class your renderer extends, but I didn’t tried it yet.

Hope it helps 😉
