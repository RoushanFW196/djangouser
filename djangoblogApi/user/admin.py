from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'email', 'age', 'mobile', 'created_at')
    search_fields = ('first_name', 'last_name', 'email', 'mobile')
    list_filter = ('created_at',)
    ordering = ('-created_at',)

# Alternatively, you can use this approach:
# admin.site.register(User, UserAdmin)
