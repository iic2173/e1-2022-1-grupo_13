from celery import shared_task
import math
from collections import Counter
from workers_backend.mail import send_mail_to



@shared_task()
def adding_task(x, y):
    print("async")
    return x + y


@shared_task()
def handle_request(request):
    user_1 = request["ids"]["user_1"]
    user_2 = request["ids"]["user_2"]
    ping_id = request["ids"]["pingId"]
    mail_user1 = request["emails"]["email_1"]
    mail_user2 = request["emails"]["email_2"]
    points_user1 = request["sidi"]["positions_1"]
    points_user2 = request["sidi"]["positions_2"]
    tags_user1 = request["siin"]["tags_1"]
    tags_user2 = request["siin"]["tags_2"]
    result = dindin_index(points_user1, points_user2, tags_user1, tags_user2)
    result["user_1"] = user_1
    result["user_2"] = user_2
    result["ping_id"] = ping_id
    message = f'Hola, se han actualizado los indices del ping {ping_id}\n Indice sidi: {result["sidi"]} \
                Indice siin: {result["siin"]} \n Indice dindin: {result["dindin"]}'
    send_mail_to(message, recievers=[mail_user1, mail_user2])

    return result


def sidi_index(points_user1, points_user2):
    x_user1, y_user1 = 0, 0
    x_user2, y_user2 = 0, 0
    for obj in points_user1:
        x_user1 += obj["lat_long"][1]
        y_user1 += obj["lat_long"][0]
    x_user1 = x_user1 / len(points_user1)
    y_user1 = y_user1 / len(points_user1)
    for obj in points_user2:
        x_user2 += obj["lat_long"][1]
        y_user2 += obj["lat_long"][0]
    x_user2 = x_user2 / len(points_user2)
    y_user2 = y_user2 / len(points_user2)
    n_puntos = len(points_user1) + len(points_user2)
    centro1 = (x_user1, y_user1)
    centro2 = (x_user2, y_user2)
    index = n_puntos / math.log(math.dist(centro1, centro2))
    return index


def siin_index(tags_user1, tags_user2):
    frec1 = Counter(tags_user1)
    n1 = sum(frec1.values())
    frec2 = Counter(tags_user2)
    n2 = sum(frec2.values())
    frec1.subtract(frec2)
    diff = 0
    for x in frec1:
        diff += abs(frec1[x])
    n_total = n1 + n2
    index = (n_total - diff) / n_total
    return index


def dindin_index(points_user1, points_user2, tags_user1, tags_user2):
    sidi = sidi_index(points_user1, points_user2)
    siin = siin_index(tags_user1, tags_user2)
    return {"dindin": (sidi * siin), "sidi": sidi, "siin": siin}

