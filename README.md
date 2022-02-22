# django_vue
django/vue CRUD application

# installation guide
Venv

Create `.env` inside `djangovue/` and add in `.env`:

```
DEBUG=on
SECRET_KEY='XXX'
ALLOWED_HOSTS = ['127.0.0.1', 'localhost']
CORS_ORIGIN_ALLOW_ALL=True
```

then do:

`./manage.py migrate`
`./manage.py runserver`
