---
title:  "How to Set a Variable in Django Template"
tags: [web, python]
---

As you may have figured by now, Django does not implement such a feature. That is, because the logic of setting the variable must go in the view, not in the template. But there are some rare cases when you actually need this.

The way you can solve this is by using a [custom Django template tag](https://docs.djangoproject.com/en/2.1/howto/custom-template-tags/#writing-custom-template-tags).

To do this, you create a file called `set_var.py` in [your `templatetags` folder](https://docs.djangoproject.com/en/2.1/howto/custom-template-tags/#code-layout) that contains the following code:

```python
from django import template

register = template.Library()

class SetVarNode(template.Node):

    def __init__(self, var_name, var_value):
        self.var_name = var_name
        self.var_value = var_value

    def render(self, context):
        try:
            value = template.Variable(self.var_value).resolve(context)
        except template.VariableDoesNotExist:
            value = ""
        context[self.var_name] = value
        return u""

def set_var(parser, token):
    """
        {% set <var_name>  = <var_value> %}
    """
    parts = token.split_contents()
    if len(parts) < 4:
        raise template.TemplateSyntaxError("'set' tag must be of the form:  {% set <var_name>  = <var_value> %}")
    return SetVarNode(parts[1], parts[3])

register.tag('set', set_var)
```

Then to use this in your template, you just do the following:

```django
{% load set_var %}

{% set a = 3 %}
{% set b = some_context_variable %}
{% set c = "some string" %}

Value of a is {{a}}
Value of b is {{b}}
Value of c is {{c}}
```

As you can see, you can put in your variables anything that you could normally get inside a Django template: a number, another context variable, a string, etc.

Hope it helps 😉
