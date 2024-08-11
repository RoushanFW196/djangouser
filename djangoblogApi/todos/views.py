from django.shortcuts import render
from django.http import Http404
from django.shortcuts import get_object_or_404
# Create your views here.
from django.http import HttpResponse


def index(request):
    print('request', request)
    #return render(request, "this is blog home page")
    return HttpResponse('this is basic todo landing page')

# def detail(request, question_id):
#     #return render(request, "this is blog detail page")
#     return HttpResponse(' this is basic blog detail page')

def tododetail(request, todo_id):
    return HttpResponse(f"This is the todo detail page for question {todo_id}")
