# pyrefly: ignore [missing-import]
from django.urls import path
from . import views

urlpatterns = [
    # Jalur kosong (http://127.0.0.1:8000/) HARUS ke views.home
    path('', views.home, name='home'),
    
    # Jalur predict (http://127.0.0.1:8000/predict/) HARUS ke views.predict_cost
    path('predict/', views.predict_cost, name='predict'),
]