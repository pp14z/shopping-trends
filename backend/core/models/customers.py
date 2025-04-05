from django.db import models

from .choices import AgeGroup, Gender, PaymentMethod, PurchaseFrequency


class Customer(models.Model):
    id = models.AutoField("ID", primary_key=True)
    age = models.PositiveIntegerField("edad")
    age_group = models.CharField(
        "grupo etario",
        max_length=10,
        choices=AgeGroup.choices,
    )
    gender = models.CharField(
        "género",
        max_length=10,
        choices=Gender.choices,
        default=Gender.UNKNOWN,
    )
    subscription_status = models.BooleanField("suscrito", default=False)
    previous_purchases = models.PositiveIntegerField("compras previas", default=0)
    frequency_of_purchases = models.CharField(
        "frecuencia de compra",
        max_length=30,
        choices=PurchaseFrequency.choices,
        default=PurchaseFrequency.UNKNOWN,
    )
    preferred_payment_method = models.CharField(
        "método de pago preferido",
        max_length=30,
        choices=PaymentMethod.choices,
        default=PaymentMethod.UNKNOWN,
    )

    class Meta:
        verbose_name = "cliente"
        verbose_name_plural = "clientes"
        indexes = [
            models.Index(fields=["age_group"]),
            models.Index(fields=["gender"]),
            models.Index(fields=["subscription_status"]),
            models.Index(fields=["frequency_of_purchases"]),
            models.Index(fields=["preferred_payment_method"]),
        ]

    def __str__(self):
        return f"Cliente #{self.id}"
