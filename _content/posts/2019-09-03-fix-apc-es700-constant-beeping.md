---
title:  "How I Fixed the Beeping Problem of My 'APC Back-UPS ES 700'"
meta_image: /assets/images/apc/bad-caps.jpg
featured: true
tags: [electronics]
---

Lately, my APC Back-UPS ES 700 was crippled by the problem that seems to kill most of its models: after a surge event, instead of switching to battery, it started to continuously beep. For a while, I could restart it several times and the problem would go away, but in the past few days, nothing would make it turn on again without constant beeping.

<danger>
Don't take anything in this article as advice, I'm not an electrical engineer. I did this at my own risk. Opening your UPS exposes you to the danger of electrocution and can cause fires if handled incorrectly.
</danger>

## Before opening

First of all, I wanted to make sure that the beeping is not caused by a normal condition. I checked the [user manual's](/assets/images/apc/manual.pdf) *Status Indicators* section for *Constant tone* audible indication.

It was not a normal condition, so it was time to take it apart.

Before opening it up, I unplugged it from the 220V outlet, disconnected the battery and left it sitting for about an hour for any caps to have a chance to discharge.

## Inspecting the insides

Once opened, I took a picture of its connections, as there are plenty of them and I wanted to remember how to put it back.

![Connections](/assets/images/apc/connections.jpg)

After a quick visual inspection of the main board, it was clear that no parts were blown. Next, I checked on a hint from a YouTube comment, that someone was successful in fixing it by replacing some bad capacitors, but he/she didn't go into any more detail than that.

Time to take out the [ESR Meter](http://s.click.aliexpress.com/e/5uSjWch2). This will allow me to determine if a capacitor might be bad without taking it out of the circuit.

Measured all capacitors and sure enough, found 4 caps that were dead as a dodo. I've circled them in red in the following picture.

<note>
The capacitors in the picture below are already changed with the good ones, as I forgot to take a picture beforehand.
</note>

![Bad Capacitors](/assets/images/apc/bad-caps.jpg)


## The fix

The fix was pretty obvious by now: I needed to replace the bad caps with good ones.

All 4 bad caps were the same: capacitance `22uF` and voltage rating of `25V` made by Jamicon.

![Culprit](/assets/images/apc/culprit.jpg)

I replaced them with better-quality [Nichicon capacitors](https://uk.farnell.com/nichicon/uka1e220mdd1td/cap-22-f-25v-20/dp/2841899) as I didn't want to replace them again anytime soon.

I also made sure to put them back in the same orientation, as these electrolytic capacitors are polarized. The polarity of the caps is indicated by a [solid line on the side with the negative lead](https://en.wikipedia.org/wiki/Electrolytic_capacitor#/media/File:Polarity-wet-Al-Elcaps.jpg).

After putting it back together I realized that this also fixed another problem: for as far as I can remember, like 5 seconds after starting the UPS, it started buzzing loudly for a while. Now I can barely hear the buzzing.

