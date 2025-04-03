from django.shortcuts import render, redirect, get_object_or_404
from .models import Thing, Comment
from .forms import ThingForm, CommentForm
from django.http import JsonResponse

def index(request):
    things = Thing.objects.all()
    return render(request, 'items/index.html', {'things': things})

def add_thing(request):
    if request.method == 'POST':
        form = ThingForm(request.POST)
        if form.is_valid():
            thing = form.save()  # Save the new item
            return render(request, 'items/partials/thing.html', {'thing': thing})  # Return only the new thing
    else:
        form = ThingForm()

    return render(request, 'items/partials/add_thing.html', {'form': form})

def edit_thing(request, id):
    thing = get_object_or_404(Thing, id=id)  # Ensure a valid ID is retrieved
    print({request.method})
    if request.method == 'POST':
        print('step 1')
        form = ThingForm(request.POST, instance=thing)
        if form.is_valid():
            print('step 2')
            form.save()
            things = Thing.objects.all()
            return render(request, 'items/index.html', {'things': things})
            # return render(request, 'items/partials/thing.html', {'thing': thing})  # Render updated thing
    else:
        print('step 3')
        form = ThingForm(instance=thing)

    return render(request, 'items/partials/edit_thing.html', {'form': form, 'thing': thing})

def delete_thing(request, id):
    thing = Thing.objects.get(id=id)
    thing.delete()
    return JsonResponse({'id': id}) # Return a JSON response with the id of the thing


def thing_list(request):
    things = Thing.objects.all()
    return render(request, 'items/index.html', {'things': things})

def add_comment(request, id):
    thing = get_object_or_404(Thing, id=id)  # ✅ Fetch the Thing instance
    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.thing = thing  # ✅ Assign the object, not just the ID
            comment.save()
            return render(request, 'items/partials/comment.html', {'comment': comment})  # Return only the new thing
    else:
        form = CommentForm()
    return render(request, 'items/add_comment.html', {'form': form, 'thing': thing})

def delete_comment(request, id):
    comment = get_object_or_404(Comment, id=id)
    comment.delete()
    return JsonResponse({'id': id}) # Return a JSON response with the id of the thing

