from django.shortcuts import render
from django.http import Http404
from django.shortcuts import get_object_or_404
# Create your views here.
from django.http import HttpResponse


def index(request):
    print('request', request)
    #return render(request, "this is blog home page")
    return HttpResponse('this is basic landing page')

# def detail(request, question_id):
#     #return render(request, "this is blog detail page")
#     return HttpResponse(' this is basic blog detail page')

def Bdetail(request, question_id):
    return HttpResponse(f"This is the blog detail page for question {question_id}")
