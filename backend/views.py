from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from backend.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().exclude().order_by("date_joined")
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [
        TokenAuthentication,
    ]

    @action(detail=False, methods=["get"])
    def get_authenticated_user(self, request, pk=None):
        if request.user.is_authenticated:
            return Response({"id": request.user.id})
