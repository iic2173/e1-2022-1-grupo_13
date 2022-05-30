from django.db import models


# Create your models here.
class Poll(models.Model):
    index_sidi = models.DecimalField(max_digits=19, decimal_places=10)
    index_siin = models.DecimalField(max_digits=19, decimal_places=10)
    index_dindin = models.DecimalField(max_digits=19, decimal_places=10)
