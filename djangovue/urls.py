from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from backend import views

router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("api/", include(router.urls)),
    path("admin/", admin.site.urls),
    path("accounts/", include("allauth.urls")),
    path("api/auth/", include("djoser.urls.authtoken")),
    path("api/auth/", include("djoser.urls.base")),
    path("dj-rest-auth/", include("dj_rest_auth.urls")),
]
