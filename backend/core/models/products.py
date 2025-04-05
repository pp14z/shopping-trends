from django.db import models

from .choices import Category, Season, Size


class Product(models.Model):
    id = models.AutoField("id", primary_key=True)
    name = models.CharField("nombre del producto", max_length=100, unique=True)
    category = models.CharField(
        "categoría",
        max_length=30,
        choices=Category.choices,
        default=Category.OTHER,
    )
    season = models.CharField(
        "temporada",
        max_length=30,
        choices=Season.choices,
        default=Season.NON_SEASONAL,
    )

    class Meta:
        verbose_name = "producto"
        verbose_name_plural = "productos"
        indexes = [
            models.Index(fields=["category"]),
            models.Index(fields=["season"]),
        ]

    def __str__(self):
        return self.name


class ProductVariant(models.Model):
    id = models.AutoField("id", primary_key=True)
    product = models.ForeignKey(
        "Product",
        verbose_name="producto",
        on_delete=models.CASCADE,
        related_name="variants",
    )
    size = models.CharField(
        "talla",
        max_length=20,
        choices=Size.choices,
        default=Size.OTHER,
    )
    color = models.CharField("color", max_length=30)

    class Meta:
        verbose_name = "variante de producto"
        verbose_name_plural = "variantes de producto"
        unique_together = ("product", "size", "color")
        constraints = [
            models.UniqueConstraint(
                fields=["product", "size", "color"], name="unique_variant"
            ),
        ]
        indexes = [
            models.Index(fields=["size"]),
        ]

    def __str__(self):
        return f"{self.product.name} - {self.size} - {self.color}"
