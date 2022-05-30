from django.conf.urls import url
from polls import views 

urlpatterns = [
    url(r'^api/polls$', views.polls_list),
]
