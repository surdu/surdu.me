---
title:  "Make LineString Resolution Depend on Zoom Level in OpenLayers"
date:   2010-12-20
tags: [js]
---

So, you want to render a route on your OpenLayers map. Everything will be nice and sweet until you’ll have to render a huge route, in which case no matter what computer your clients have, most probably it will stall. To solve this you have two possibilities: you either reduce the number of lines you send from the server or you reduce the number of points rendered directly on the client’s browser.

Both solutions will raise a problem: if the user will zoom deep enough, they will see a discrepancy between the route and the road (the number of points in the route will not equal the number of points on the road). So, the road may do a turn where your route plotting will just cut the corner. To solve this, I found a very adaptive solution that will reduce the number of points in your route the further you zoom out.

The solution is to create a custom renderer. In the following example, it is shown how to override the default behavior for the SVG renderer, but you can implement it also for another renderer if required.

```js
OpenLayers.Renderer.Smart = OpenLayers.Class(OpenLayers.Renderer.SVG, {

    getComponentsString: function(components, separator)
    {
        var zoomFactors = new Array();
        // 0 is a mandatory key
        zoomFactors[0] = 1000;
        zoomFactors[1] = 500;
        zoomFactors[2] = 400;
        zoomFactors[3] = 300;
        zoomFactors[4] = 200;
        zoomFactors[5] = 100;
        zoomFactors[6] = 50;
        zoomFactors[7] = 10;
        zoomFactors[9] = 1;

        var zoomIndex = this.map.zoom;
        var zoomFactor = zoomFactors[zoomIndex];

        // see comment above the zoomFactors array
        while (zoomFactor == undefined)
        {
            zoomIndex--;
            zoomFactor = zoomFactors[zoomIndex];
        }

        var renderCmp = [];
        var complete = true;
        var len = components.length;
        var strings = [];
        var str, component;

        // here is where we plug in the zoomFactor in the original code
        // so instead of rendering each and every point, we will skip n number of
        // points, based on the 'zoomFactors' array

        for(var i=0; i<len; i+=zoomFactor) {
            component = components[i];
            renderCmp.push(component);
            str = this.getShortString(component);
            if (str) {
                strings.push(str);
            } else {
                if (i > 0) {
                    if (this.getShortString(components[i - 1])) {
                        strings.push(this.clipLine(components[i],
                            components[i-1]));
                    }
                }
                if (i < len - 1) {
                    if (this.getShortString(components[i + 1])) {
                        strings.push(this.clipLine(components[i],
                            components[i+1]));
                    }
                }
                complete = false;
            }
        }

        return {
            path: strings.join(separator || ","),
            complete: complete
        };
    },

    CLASS_NAME: "OpenLayers.Renderer.Smart"
});
```

The way I determine by how much to reduce the number of points based on the zoom is simple: I just have an array of zoom factors. If the user zoom to level `x` it just looks which is the closest value to `x` defined in my array.

Ok, so after you’ve defined your new renderer, it’s time to use it on your map. The way to do this is to add it to your vector layer that you use to render your route like so:

```js
routeLayer = new OpenLayers.Layer.Vector("Vectors", {
   renderers: ['Smart', 'VML', 'Canvas']
});
```

You just have to add the name of your render class as a string. The default list of renderers where `['SVG', 'VML', 'Canvas']`. So you noticed how I’ve changed only the SVG with my renderer. That is because browsers like Internet Explorer do not support SVG. This way, if OpenLayers sees that it can not use our `Smart` renderer, it will proceed with the next one in the list until it finds one that it can use.

Of course, if the browser will use `VML` or `Canvas`, you’ll have again this problem, so you may want to implement this solution also for the other renderers. I suspect it’s just a matter of changing the class your renderer extends, but I didn’t try it yet.

Hope it helps 😉
