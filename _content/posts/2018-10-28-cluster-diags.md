---
title:  "Display car diagnostics and graphics on my VW Golf 4 cluster"
tags: [electronics]
---

  - bought cheap cluster for test
  - http://grauonline.de/wordpress/?p=74
  - changed baudrate to 10400, otherwise connect was spewing garbage (after reading https://www.blafusel.de/obd/obd2_kw1281.html)
  - managed to easily make top-fis work
  - started working on full fis
  - realized difference between nav and non-nav when it comes to crc check
  - needed cluster from car, made harness
  - fixed image render function
  - arduino acted weird because of too much memory
  - started prototyping for car

I had this project idea in my head for a while now: show custom text on my 2001 VW Golf cluster. My initial idea was to show the current song playing on my phone, but then I found Alexander Grau's [blog post](http://grauonline.de/wordpress/?p=74) that gave me both the idea and the code for what I should display instead: car parameters read from various car modules.

## The Circuit

One thing I wanted to make different from what Alexander did is not having to break one of my VAG-COM cables that I didn't have in order to get access to the K-line with my Arduino. Luckily, I found this nice schematic of a VAG-COM cable on a VW forum (and bought 2 cables from AliExpress that arrived right in time to not need them anymore):

![VAG-COM cable ](/assets/images/cluster/cable-diagram.gif)

We basically need the right-side half of this circuit in order to convert the 12V logic of the car's K-line to 5V logic needed for the Arduino. The only components needed are the LM339 and some common resistors.

Here is how we're going to connect the LM339 to the K-line and to Arduino:

![VAG-COM cable ](/assets/images/cluster/cable-diagram.gif)

I don't think we need the K-line2 connection, as all the communication is done using the K-line, but I left it there for now until I understand what's used for.

## Workbench

Of course I was not gonna sit in the car to test all this, especially during this crappy cold winter, so I had to find a way to test this in the warmth of my house.

Luckily, I found out really quick that the cluster works perfectly separated from the car. It only needs 12V on a few pins and we can read it's K-line as if it where in the car. So I bought a cheap Passat B5.5 cluster, which is compatible with Golf 4. Didn't want to fry my good one from the car.

In order to power up the cluster I only had to do the following connections to the cluster's blue connector:

 - pin 1 and 23 to 12V
 - pin 24 to GND

To make sure everything is working fine, I also connected a VAG-COM cable to the cluster by making the following connections to the cable's pins:

 - pin 16 to 12V
 - pin 4 and 5 to GND
 - pin 7 to cluster's blue connector pin 25

The pin arrangement on the OBD2/VAG-COM cable can be observed in the first image from the previous section. Please note that the pin arrangement depicted there is for the female connector in which the VAG-COM cable is inserted.

Here is the [full pinout for the cluster's blue connector](https://gist.github.com/surdu/f1fda10304ec736ab188c04226ff0140#file-cluster-blue-connector) and here is the [full pinout for the OBD2 connector](https://gist.github.com/surdu/f1fda10304ec736ab188c04226ff0140#file-obd2).
