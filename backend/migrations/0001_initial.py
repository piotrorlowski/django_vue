# Generated by Django 3.2.2 on 2021-05-14 15:35

from django.db import migrations

USERS = [
    {
        "first_name": "Jon",
        "last_name": "Snow",
        "username": "john@snow.com",
        "email": "john@snow.com",
    },
    {
        "first_name": "Daenerys",
        "last_name": "Targaryen",
        "username": "daenerys@targaryen.com",
        "email": "daenerys@targaryen.com",
    },
    {
        "first_name": "Arya",
        "last_name": "Stark",
        "username": "arya@stark.com",
        "email": "arya@stark.com",
    },
    {
        "first_name": "Sansa",
        "last_name": "Stark",
        "username": "sansa@stark.com",
        "email": "sansa@stark.com",
    },
    {
        "first_name": "Cersei",
        "last_name": "Lanister",
        "username": "cersei@lanister.com",
        "email": "cersei@lanister.com",
    },
    {
        "first_name": "Jaime",
        "last_name": "Lannister",
        "username": "jaime@lannister.com",
        "email": "jaime@lannister.com",
    },
]


def create_user_entries(apps, schema_editor):
    User = apps.get_model("auth", "User")
    users = [
        User.objects.update_or_create(
            first_name=user["first_name"],
            last_name=user["last_name"],
            username=user["username"],
            email=user["email"],
        )
        for user in USERS
    ]
    return users


class Migration(migrations.Migration):

    dependencies = []

    operations = [
        migrations.RunPython(create_user_entries),
    ]