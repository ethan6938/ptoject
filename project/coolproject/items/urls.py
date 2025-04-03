from django.urls import path
from .views import thing_list, add_thing, edit_thing, delete_thing, add_comment, delete_comment
from . import views

urlpatterns = [
    path('',views.thing_list, name='thing_list'),
    path('add_thing',views.add_thing, name='add_thing'),
    path('<int:id>/edit/',views.edit_thing, name='edit_thing'),
    path('<int:id>/delete/',views.delete_thing, name='delete_thing'),
    path('<int:id>/comment/',views.add_comment, name='add_comment'),
    path("comment/<int:id>/delete/", views.delete_comment, name="delete_comment"),
]