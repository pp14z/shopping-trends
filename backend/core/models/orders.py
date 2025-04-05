from django.db import models

from .choices import PaymentMethod, ShippingType


class Order(models.Model):
    id = models.AutoField("id", primary_key=True)
    customer = models.ForeignKey(
        "core.Customer",
        on_delete=models.CASCADE,
        verbose_name="cliente",
        related_name="orders",
    )
    product_variant = models.ForeignKey(
        "core.ProductVariant",
        on_delete=models.CASCADE,
        verbose_name="producto",
        related_name="orders",
    )
    purchase_amount = models.DecimalField(
        "monto de la compra",
        max_digits=10,
        decimal_places=2,
    )
    location = models.CharField("ubicación", max_length=100)
    review_rating = models.FloatField("calificación")
    payment_method = models.CharField(
        "método de pago",
        max_length=30,
        choices=PaymentMethod.choices,
        default=PaymentMethod.UNKNOWN,
    )
    shipping_type = models.CharField(
        "tipo de envío",
        max_length=30,
        choices=ShippingType.choices,
    )
    discount_applied = models.BooleanField("descuento aplicado", default=False)
    promo_code_used = models.BooleanField("código promocional usado", default=False)

    class Meta:
        verbose_name = "orden"
        verbose_name_plural = "órdenes"
        indexes = [
            models.Index(fields=["purchase_amount"]),  # Added index for purchase_amount
            models.Index(fields=["review_rating"]),
            models.Index(fields=["payment_method"]),
            models.Index(fields=["location"]),
            models.Index(fields=["discount_applied"]),
        ]

    def __str__(self):
        return f"Orden #{self.id} - {self.customer} - ${self.purchase_amount}"
