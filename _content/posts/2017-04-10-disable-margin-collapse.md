---
title:  "Disable Margin Collapse in CSS with No Visual Impact"
tags: [css]
---

When working with CSS you sometimes have to work around a behaviour known as [margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing). Basically, the top/bottom margin of two neighboring block elements will be set to the biggest margin value in-between the two elements, if their top/bottom margins are adjacent and no text, clearance, padding nor border separate them.

Let's say we want to have a green box inside a red box and the green box to be 50 pixels down inside the red box.

If we just add `margin-top: 50px;` to the inside green box we'll soon realize that the result is not as intended:

<codepen height="275" slug="QppVGv" version="2" />

Note that the top-margin of the green children element seems to be passed on to the red parent.

The most common method of preventing this is to use `overflow: hidden;` on the parent element. Other methods include adding `float`, `border`, `padding` or something else that will separate the two margins.

But if we don't want to change the way the parent acts and looks, all of the above methods will not work for us.

## The solution
Sub-pixels values to the rescue !

What we can do is set top/bottom padding to a value that is greater than 0 pixels, so that margin collapsing is not applied, but also less than 1 pixels so the browser doesn't render anything.

After running a [quick test](http://codepen.io/surdu/pen/GWMNZK) on a variety of browser and screen density combinations I've come to the conclusion that `0.05px` is our best bet in order to not render anything.

I would say `0.1px` it's still a good choice if you set it on only one side, but Firefox seems to render the accumulated 0.2 pixels on retina displays if you set the padding on both top and bottom.

So let's apply this to our example:

<codepen height="309" slug="mWqYdQ" version="2" />

As you can see, after applying the 0.05 pixels padding to the parent element's top and bottom, now the margin  of the children element is applied as we initially intended.

In order to make sure this doesn't have any visual impact, I encourage you to run the [above mentioned test](http://codepen.io/surdu/pen/GWMNZK) on your combination of browser and screen density. The solution will have no visual impact if the last green box with the `0.05px` text in it has no red borders on top and bottom.

If you find a context in which this solution fails, please let me know in the comments below.

Hope this helps 👍
