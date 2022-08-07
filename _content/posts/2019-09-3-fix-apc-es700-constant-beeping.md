---
title:  "How I Fixed My APC Back-UPS ES Constant Beeping Problem"
meta_image: /assets/images/apc/bad-caps.jpg
---

Lately my APC Back-UPS ES 700 was crippled by the problem that seems to kill most of it's models: after a surge event, instead of switching to battery it starts to continuously beep. For a while I could restart it several times and the problem would go away, but in the past few days nothing would make it turn on again without constant beeping.

First of all, I wanted to eliminate that the beeping is not caused by a normal condition. I checked the [user manual's](/assets/images/apc/manual.pdf) *Status Indicators* section for *Constant tone* audible indication.

It was not a normal condition, so it was time to take it apart.

Before I disconnected the main board, it was be a good idea to take a picture of it's connections, as there are plenty of them:

![Connections](/assets/images/apc/connections.jpg)

After a quick visual inspection of the main board it was clear that no parts where blown. Next I checked on a hint from a YouTube comment, that someone was successful in fixing it by replacing some bad capacitors, but he/she didn't go into any more detail than that.

Time to take out the [ESR Meter](http://s.click.aliexpress.com/e/5uSjWch2). This will allow me to determine if a capacitor might be bad without taking it out of the circuit.

Measured all capacitors and sure enough, found 4 caps that where dead as a dodo. I've circled them in red in the following picture.

![Bad Capacitors](/assets/images/apc/bad-caps.jpg)

_Note: the capacitors in the picture are already changed_

All 4 bad caps where the same: capacitance `22uF` and voltage rating of `25V` made by Jamicon.

![Culprit](/assets/images/apc/culprit.jpg)

I replaced mine with better quality [Nichicon capacitors](https://uk.farnell.com/nichicon/uka1e220mdd1td/cap-22-f-25v-20/dp/2841899) as I didn't wanted to replace them again anytime soon.

After putting it back together I realized that this also fixed another problem: for as far as I can remember, like 5 seconds after starting the UPS, it started buzzing loudly for a while. Now I can barely hear the buzzing.

