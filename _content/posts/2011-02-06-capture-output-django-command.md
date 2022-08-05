---
title:  "Capture the Output of a Django Command"
tags: [web, python]
---


The documentation is very slim when it talks about [how to call a Django command from code](https://docs.djangoproject.com/en/2.1/ref/django-admin/#running-management-commands-from-your-code). In order to do this, just use `call_command`. To solve the trick of capturing the output of this I had to dig a little into the Django source.

The solution to capturing the output of the command being called is passing to `call_command` an argument called `stdout` to which you assign where the output is written (a file or any bite stream). Here is an example:

<script src="https://gist.github.com/surdu/5db721a9970b3e59af82af932d73c4d1.js"></script>

In the above example we call `python manage.py dumpdata`, which will output all the data from all the models in all the installed apps from the current project in form of a JSON.

Hope it helps 😉
