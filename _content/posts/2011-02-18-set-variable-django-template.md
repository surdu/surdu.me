---
title:  "How to Set a Variable in Django Template"
tags: [web, python]
---

As you may have figured by now, Django does not implement such a feature. That is, because the logic of setting the variable must go in the view, not in the template. But there are some rare cases when you actually need this.

The way you can solve this is by using a [custom Django template tag](https://docs.djangoproject.com/en/2.1/howto/custom-template-tags/#writing-custom-template-tags).

To do this, you create a file called `set_var.py` in [your `templatetags` folder](https://docs.djangoproject.com/en/2.1/howto/custom-template-tags/#code-layout) that contains the following code:

<script src="https://gist.github.com/surdu/c9970da44dcaef6b18fee40dfcbabcd3.js"></script>

Then to use this in your template, you just do the following:

<script src="https://gist.github.com/surdu/fe0e1b48661541d29156798be462f428.js"></script>

As you can see, you can put in your variables anything that you could normally get inside a Django template: a number, another context variable, a string, etc.

Hope it helps 😉
