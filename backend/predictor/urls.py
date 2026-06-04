# pyrefly: ignore [missing-import]
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('akurasi/', views.akurasi, name='akurasi'),
    path('predict/', views.predict_cost, name='predict'),
]