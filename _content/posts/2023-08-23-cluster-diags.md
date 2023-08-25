---
title:  "Display car diagnostics and graphics on my VW Golf 4 cluster"
tags: [electronics]
---

I had this project idea in my head for a while now: show custom text on my 2001 VW Golf cluster. My initial idea was to show the current song playing on my phone, but then I found Alexander Grau's [blog post](http://grauonline.de/wordpress/?p=74) that gave me both the idea and the code for what I should display instead: car parameters read from various car modules.

## The Circuit

One thing I wanted to make different from what Alexander did is not having to break a VAG-COM cable (that I didn't have in the first place) to get access to the `K-line` with my Arduino. Luckily, I found this nice schematic of a VAG-COM cable on a VW forum :

![Diagram of a VAG-COM cable showing the connection between a CH340T chip on the left and the LM339 chip on the right](/assets/images/cluster/cable-diagram.gif)

I need the right-side half of this circuit to convert the `12V` logic of the car's `K-line` to `5V` logic needed for the Arduino. The only components needed are the LM339 and some common resistors.

Here is how I connected used the LM339 to connect the car's `K-line` to Arduino:

(ADD IMAGE HERE)

I don't think I need the `K-line2` connection, as all the communication seems to be done using the `K-line`, but I left it there for now until I figure out what's used for.

## Workbench

Of course, I was not gonna sit in the car to test all this, so I had to find a way to test this in the comfort of my house.

Luckily, I found out really quickly that the cluster works perfectly separated from the car. It only needs 12V on a few pins and we can read its `K-line` as if it were in the car. So I bought a cheap Passat B5.5 cluster, which is compatible with Golf 4, to have something to fiddle with.

To power up the cluster I only had to make the following connections to the cluster's blue connector:

|  |  |
| ----------- | ------- |
| <ul><li>pin 1 and 23 to 12V</li><li>pin 24 to GND</li></ul> | <img alt="Diagram showing the layout of the cluster's blue connector" class="sideImage" src="/assets/images/cluster/blue-connector.png" /> |

[Here](https://gist.github.com/surdu/f1fda10304ec736ab188c04226ff0140#file-cluster-blue-connector) you can find the descriptions of all the pins of the cluster's blue connector.

To make sure everything is working fine, I also connected a VAG-COM cable to the cluster by making the following connections to the cable's pins:

|  |  |
| ----------- | ------- |
| <ul><li>pin 16 to 12V</li><li>pin 4 and 5 to GND</li><li>pin 7 to cluster's blue connector pin 25</li></ul> | <img alt="Diagram showing the OBD2 connector pinout" class="sideImage" src="/assets/images/cluster/obd2-pinout.png" /> |

[Here](https://gist.github.com/surdu/f1fda10304ec736ab188c04226ff0140#file-obd2) you can find the descriptions of all the pins of the OBD2 connector.

Having the OBD2 connection to the cluster allowed me to use [VCDS](https://www.ross-tech.com/vag-com/) to connect to the cluster from my computer to make sure the data transfer works correctly.
