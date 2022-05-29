from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from polls.models import Poll
from polls.serializers import PollSerializer
from rest_framework.decorators import api_view
from polls.tasks import handle_request


# Create your views here.


@api_view(['GET', 'POST', 'DELETE'])
def polls_list(request):
    if request.method == 'GET':
        return JsonResponse({"message": "hola"}, status=status.HTTP_200_OK)
        # 'safe=False' for objects serialization

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        sendable_response = handle_request.delay(data).wait()
        return JsonResponse(sendable_response, status=status.HTTP_200_OK)


# @api_view(['GET', 'PUT', 'DELETE'])
# def tutorial_detail(request, pk):
#     try: 
#         tutorial = Tutorial.objects.get(pk=pk) 
#     except Tutorial.DoesNotExist: 
#         return JsonResponse({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
#     if request.method == 'GET': 
#         tutorial_serializer = TutorialSerializer(tutorial) 
#         return JsonResponse(tutorial_serializer.data) 
 
#     elif request.method == 'PUT': 
#         tutorial_data = JSONParser().parse(request) 
#         tutorial_serializer = TutorialSerializer(tutorial, data=tutorial_data) 
#         if tutorial_serializer.is_valid(): 
#             tutorial_serializer.save() 
#             return JsonResponse(tutorial_serializer.data) 
#         return JsonResponse(tutorial_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
#     elif request.method == 'DELETE': 
#         tutorial.delete() 
#         return JsonResponse({'message': 'Tutorial was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    
        
