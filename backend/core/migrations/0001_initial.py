from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Customer",
            fields=[
                (
                    "id",
                    models.AutoField(
                        primary_key=True, serialize=False, verbose_name="ID"
                    ),
                ),
                ("age", models.PositiveIntegerField(verbose_name="edad")),
                (
                    "age_group",
                    models.CharField(
                        choices=[
                            ("<18", "Menores de 18"),
                            ("18-25", "18 a 25"),
                            ("26-35", "26 a 35"),
                            ("36-50", "36 a 50"),
                            (">51", "Mayores de 51"),
                        ],
                        max_length=10,
                        verbose_name="grupo etario",
                    ),
                ),
                (
                    "gender",
                    models.CharField(
                        choices=[
                            ("female", "Femenino"),
                            ("male", "Masculino"),
                            ("unknown", "Desconocido"),
                        ],
                        default="unknown",
                        max_length=10,
                        verbose_name="género",
                    ),
                ),
                (
                    "subscription_status",
                    models.BooleanField(default=False, verbose_name="suscrito"),
                ),
                (
                    "previous_purchases",
                    models.PositiveIntegerField(
                        default=0, verbose_name="compras previas"
                    ),
                ),
                (
                    "frequency_of_purchases",
                    models.CharField(
                        choices=[
                            ("weekly", "Semanal"),
                            ("bi-weekly", "Cada 2 semanas"),
                            ("fortnightly", "Cada 15 días"),
                            ("monthly", "Mensual"),
                            ("every 3 months", "Cada 3 meses"),
                            ("quarterly", "Trimestral"),
                            ("annually", "Anual"),
                            ("unknown", "Desconocida"),
                        ],
                        default="unknown",
                        max_length=30,
                        verbose_name="frecuencia de compra",
                    ),
                ),
                (
                    "preferred_payment_method",
                    models.CharField(
                        choices=[
                            ("bank transfer", "Transferencia Bancaria"),
                            ("cash", "Efectivo"),
                            ("credit card", "Tarjeta de Crédito"),
                            ("debit card", "Tarjeta de Débito"),
                            ("paypal", "PayPal"),
                            ("venmo", "Venmo"),
                            ("unknown", "Desconocido"),
                        ],
                        default="unknown",
                        max_length=30,
                        verbose_name="método de pago preferido",
                    ),
                ),
            ],
            options={
                "verbose_name": "cliente",
                "verbose_name_plural": "clientes",
            },
        ),
        migrations.CreateModel(
            name="Order",
            fields=[
                (
                    "id",
                    models.AutoField(
                        primary_key=True, serialize=False, verbose_name="id"
                    ),
                ),
                (
                    "purchase_amount",
                    models.DecimalField(
                        decimal_places=2,
                        max_digits=10,
                        verbose_name="monto de la compra",
                    ),
                ),
                (
                    "location",
                    models.CharField(max_length=100, verbose_name="ubicación"),
                ),
                ("review_rating", models.FloatField(verbose_name="calificación")),
                (
                    "payment_method",
                    models.CharField(
                        choices=[
                            ("bank transfer", "Transferencia Bancaria"),
                            ("cash", "Efectivo"),
                            ("credit card", "Tarjeta de Crédito"),
                            ("debit card", "Tarjeta de Débito"),
                            ("paypal", "PayPal"),
                            ("venmo", "Venmo"),
                            ("unknown", "Desconocido"),
                        ],
                        default="unknown",
                        max_length=30,
                        verbose_name="método de pago",
                    ),
                ),
                (
                    "shipping_type",
                    models.CharField(
                        choices=[
                            ("2-day shipping", "Envío en 2 Días"),
                            ("express", "Exprés"),
                            ("free shipping", "Envío Gratuito"),
                            ("next day air", "Entrega al Día Siguiente (Aéreo)"),
                            ("standard", "Estándar"),
                            ("store pickup", "Recogida en Tienda"),
                        ],
                        max_length=30,
                        verbose_name="tipo de envío",
                    ),
                ),
                (
                    "discount_applied",
                    models.BooleanField(
                        default=False, verbose_name="descuento aplicado"
                    ),
                ),
                (
                    "promo_code_used",
                    models.BooleanField(
                        default=False, verbose_name="código promocional usado"
                    ),
                ),
            ],
            options={
                "verbose_name": "orden",
                "verbose_name_plural": "órdenes",
            },
        ),
        migrations.CreateModel(
            name="Product",
            fields=[
                (
                    "id",
                    models.AutoField(
                        primary_key=True, serialize=False, verbose_name="id"
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        max_length=100, verbose_name="nombre del producto"
                    ),
                ),
                (
                    "category",
                    models.CharField(
                        choices=[
                            ("accessories", "Accesorios"),
                            ("clothing", "Ropa"),
                            ("footwear", "Calzado"),
                            ("outerwear", "Abrigo"),
                            ("other", "Otra"),
                        ],
                        default="other",
                        max_length=30,
                        verbose_name="categoría",
                    ),
                ),
                (
                    "season",
                    models.CharField(
                        choices=[
                            ("spring", "Primavera"),
                            ("summer", "Verano"),
                            ("fall", "Otoño"),
                            ("winter", "Invierno"),
                            ("unknown", "Desconocida"),
                        ],
                        default="unknown",
                        max_length=30,
                        verbose_name="temporada",
                    ),
                ),
            ],
            options={
                "verbose_name": "producto",
                "verbose_name_plural": "productos",
            },
        ),
        migrations.CreateModel(
            name="ProductVariant",
            fields=[
                (
                    "id",
                    models.AutoField(
                        primary_key=True, serialize=False, verbose_name="id"
                    ),
                ),
                (
                    "size",
                    models.CharField(
                        choices=[
                            ("s", "S"),
                            ("m", "M"),
                            ("l", "L"),
                            ("xl", "XL"),
                            ("other", "Otro"),
                        ],
                        default="other",
                        max_length=20,
                        verbose_name="talla",
                    ),
                ),
                ("color", models.CharField(max_length=30, verbose_name="color")),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="variants",
                        to="core.product",
                        verbose_name="producto",
                    ),
                ),
            ],
            options={
                "verbose_name": "variante de producto",
                "verbose_name_plural": "variantes de producto",
            },
        ),
        migrations.AddIndex(
            model_name="product",
            index=models.Index(
                fields=["category"], name="core_produc_categor_ba410e_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="product",
            index=models.Index(fields=["season"], name="core_produc_season_506cef_idx"),
        ),
        migrations.AddConstraint(
            model_name="product",
            constraint=models.UniqueConstraint(
                fields=("name", "category", "season"),
                name="unique_product_by_name_category_season",
            ),
        ),
        migrations.AddField(
            model_name="order",
            name="customer",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="orders",
                to="core.customer",
                verbose_name="cliente",
            ),
        ),
        migrations.AddField(
            model_name="order",
            name="product_variant",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="orders",
                to="core.productvariant",
                verbose_name="producto",
            ),
        ),
        migrations.AddIndex(
            model_name="customer",
            index=models.Index(
                fields=["age_group"], name="core_custom_age_gro_273d31_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="customer",
            index=models.Index(fields=["gender"], name="core_custom_gender_d00867_idx"),
        ),
        migrations.AddIndex(
            model_name="customer",
            index=models.Index(
                fields=["subscription_status"], name="core_custom_subscri_2ee03c_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="customer",
            index=models.Index(
                fields=["frequency_of_purchases"], name="core_custom_frequen_cfef83_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="customer",
            index=models.Index(
                fields=["preferred_payment_method"],
                name="core_custom_preferr_5479fa_idx",
            ),
        ),
        migrations.AddIndex(
            model_name="productvariant",
            index=models.Index(fields=["size"], name="core_produc_size_096eff_idx"),
        ),
        migrations.AddConstraint(
            model_name="productvariant",
            constraint=models.UniqueConstraint(
                fields=("product", "size", "color"), name="unique_variant"
            ),
        ),
        migrations.AlterUniqueTogether(
            name="productvariant",
            unique_together={("product", "size", "color")},
        ),
        migrations.AddIndex(
            model_name="order",
            index=models.Index(
                fields=["purchase_amount"], name="core_order_purchas_a0e3b5_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="order",
            index=models.Index(
                fields=["review_rating"], name="core_order_review__23ad9d_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="order",
            index=models.Index(
                fields=["payment_method"], name="core_order_payment_ddc40b_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="order",
            index=models.Index(
                fields=["location"], name="core_order_locatio_1db47e_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="order",
            index=models.Index(
                fields=["discount_applied"], name="core_order_discoun_c52493_idx"
            ),
        ),
    ]
