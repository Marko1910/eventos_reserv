from django.db import models

# Create your models here.

class TipoEvento(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='tipo_eventos/', blank=True, null=True)

    def __str__(self):
        return self.nombre


class Evento(models.Model):
    tipo_evento = models.ForeignKey(TipoEvento, on_delete=models.CASCADE, related_name='eventos')
    nombre = models.CharField(max_length=100)
    fecha = models.DateField()
    lugar = models.CharField(max_length=150)
    costo = models.DecimalField(max_digits=10, decimal_places=2)
    imagen = models.ImageField(upload_to='eventos/', blank=True, null=True)

    def __str__(self):
        return self.nombre