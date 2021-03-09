from django.db import models

# Create your models here.
class instructor(models.Model):
    name = models.CharField(max_length=150, default=" ")
    email = models.CharField(max_length=70, default=" ")
    password = models.CharField(max_length=70, default=" ")
    id = models.AutoField(auto_created=True, primary_key=True, serialize=False, default=False)


def __str__(self):
    return self.name
