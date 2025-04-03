from django.db import models

class Thing(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

class Comment(models.Model):
    thing = models.ForeignKey(Thing, related_name='comments', on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text[:30]  # Display the first 30 characters
