from rest_framework import serializers
from .models import TipoEvento, Evento

class TipoEventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoEvento
        fields = '__all__'

class EventoSerializer(serializers.ModelSerializer):
    tipo_evento = TipoEventoSerializer(read_only=True)
    tipo_evento_id = serializers.PrimaryKeyRelatedField(
        queryset=TipoEvento.objects.all(),
        source='tipo_evento',
        write_only=True
    )

    class Meta:
        model = Evento
        fields = ['id', 'nombre', 'fecha', 'lugar', 'costo', 'imagen', 'tipo_evento', 'tipo_evento_id']
