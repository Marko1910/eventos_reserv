from django.shortcuts import render
from rest_framework import viewsets
from .models import TipoEvento, Evento
from .serializers import TipoEventoSerializer, EventoSerializer

# Create your views here.

class TipoEventoViewSet(viewsets.ModelViewSet):
    queryset = TipoEvento.objects.all()
    serializer_class = TipoEventoSerializer

class EventoViewSet(viewsets.ModelViewSet):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer