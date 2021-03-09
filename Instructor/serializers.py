from rest_framework import serializers

from Instructor.models import instructor

class instructorserializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = instructor
        fields = (

        "name",
        "email",
        "password",
        "id",

        )
