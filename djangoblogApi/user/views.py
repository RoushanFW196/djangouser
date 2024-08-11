
# implementation using  Django's function-based views:
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from django.utils.decorators import method_decorator
from .models import User
import json


# tumhari aukat jhant k brabar v nhi hai

# GET method to retrieve all user details
class UserListView(View):
    def get(self, request):
        users = User.objects.all().values('id', 'first_name', 'last_name', 'email', 'age', 'mobile', 'profile_pic', 'created_at')
        user_list = list(users)  # Convert the QuerySet to a list
        return JsonResponse(user_list, safe=False)  # Return the list as JSON
    



# POST method to create a new user
@method_decorator(csrf_exempt, name='dispatch')
class UserCreateView(View):
    def post(self, request):
        try:
            # Extract data from request.POST (form data) and request.FILES (file data)
            first_name = request.POST.get('first_name')
            last_name = request.POST.get('last_name')
            email = request.POST.get('email')
            age = request.POST.get('age')
            mobile = request.POST.get('mobile')
            profile_pic = request.FILES.get('profile_pic')  # Get the file from request.FILES
            password = request.POST.get('password')

            # Create the user
            user = User.objects.create(
                first_name=first_name,
                last_name=last_name,
                email=email,
                age=age,
                mobile=mobile,
                profile_pic=profile_pic,  # Save the file reference in the model
                password=password,
            )

            return JsonResponse({"message": "User created successfully!", "user_id": user.id}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)




# put method to update the existing user
@method_decorator(csrf_exempt, name='dispatch')
class UserUpdateView(View):
    def put(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            # Update fields from request.POST and request.FILES
            user.first_name = request.POST.get('first_name', user.first_name)
            user.last_name = request.POST.get('last_name', user.last_name)
            user.email = request.POST.get('email', user.email)
            user.age = request.POST.get('age', user.age)
            user.mobile = request.POST.get('mobile', user.mobile)
            user.password = request.POST.get('password', user.password)
            if 'profile_pic' in request.FILES:
                user.profile_pic = request.FILES['profile_pic']
            print('userrrrrr', user)
            user.save()

            return JsonResponse({"message": "User updated successfully!", "user_id": user.id}, status=200)
        except User.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
