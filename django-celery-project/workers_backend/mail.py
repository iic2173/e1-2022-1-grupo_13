from django.core.mail import send_mail
from workers_backend.settings import EMAIL_HOST_USER


def send_mail_to(message, recievers):
    subject = "SE HAN ACTUALIZADO LOS INDICES DE UN PING"
    send_mail(subject, message, EMAIL_HOST_USER, recievers, fail_silently=False)