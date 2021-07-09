from django.contrib.auth.models import User


def run():
    user = User.objects.create_user(
        username="Admin",
        email="admin@email.com",
        password="secret",
        is_staff=True,
        is_active=True,
        is_superuser=True
    )
    print("Admin agregado!")
