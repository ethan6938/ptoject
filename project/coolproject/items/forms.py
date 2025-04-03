from django import forms
from .models import Thing, Comment

class ThingForm(forms.ModelForm):
    class Meta:
        model = Thing
        fields = ['name', 'description']

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['text']        
