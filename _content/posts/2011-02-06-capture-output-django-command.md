---
title:  "Capture the Output of a Django Command"
tags: [web, python]
---


The documentation is very slim when it talks about [how to call a Django command from code](https://docs.djangoproject.com/en/2.1/ref/django-admin/#running-management-commands-from-your-code). In order to do this, just use `call_command`. To solve the trick of capturing the output of this I had to dig a little into the Django source.

The solution to capturing the output of the command being called is passing to `call_command` an argument called `stdout` to which you assign where the output is written (a file or any bite stream). Here is an example:

```python
from django.core.management import call_command
from StringIO import StringIO

content = StringIO()
call_command("dumpdata", stdout=content)
content.seek(0)
print content.read()
```

In the above example we call `python manage.py dumpdata`, which will output all the data from all the models in all the installed apps from the current project in form of a JSON.

Hope it helps 😉
