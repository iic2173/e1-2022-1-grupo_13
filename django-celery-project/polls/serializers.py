from rest_framework import serializers 
from polls.models import Poll


class PollSerializer(serializers.ModelSerializer):

    class Meta:
        model = Poll
        fields = ('id',
                  'index_sidi',
                  'index_siin',
                  'index_dindin')
