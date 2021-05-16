from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from backend.serializers import UserSerializer
from rest_framework.authentication import (
    SessionAuthentication,
    BasicAuthentication,
    TokenAuthentication,
)
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().exclude(is_superuser=True).order_by("date_joined")
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [
        TokenAuthentication,
    ]
