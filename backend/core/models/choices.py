from django.db import models


class AgeGroup(models.TextChoices):
    UNDER_18 = "<18", "Menores de 18"
    B18_25 = "18-25", "18 a 25"
    B26_35 = "26-35", "26 a 35"
    B36_50 = "36-50", "36 a 50"
    OVER_51 = ">51", "Mayores de 51"


class Gender(models.TextChoices):
    FEMALE = "female", "Femenino"
    MALE = "male", "Masculino"
    UNKNOWN = "unknown", "Desconocido"


class PurchaseFrequency(models.TextChoices):
    WEEKLY = "weekly", "Semanal"
    BI_WEEKLY = "bi-weekly", "Cada 2 semanas"
    FORTNIGHTLY = "fortnightly", "Cada 15 días"
    MONTHLY = "monthly", "Mensual"
    EVERY_3_MONTHS = "every 3 months", "Cada 3 meses"
    QUARTERLY = "quarterly", "Trimestral"
    ANNUALLY = "annually", "Anual"
    UNKNOWN = "unknown", "Desconocida"


class PaymentMethod(models.TextChoices):
    BANK_TRANSFER = "bank transfer", "Transferencia Bancaria"
    CASH = "cash", "Efectivo"
    CREDIT_CARD = "credit card", "Tarjeta de Crédito"
    DEBIT_CARD = "debit card", "Tarjeta de Débito"
    PAYPAL = "paypal", "PayPal"
    VENMO = "venmo", "Venmo"
    UNKNOWN = "unknown", "Desconocido"


class Category(models.TextChoices):
    ACCESSORIES = "accessories", "Accesorios"
    CLOTHING = "clothing", "Ropa"
    FOOTWEAR = "footwear", "Calzado"
    OUTERWEAR = "outerwear", "Abrigo"
    OTHER = "other", "Otra"


class Season(models.TextChoices):
    SPRING = "spring", "Primavera"
    SUMMER = "summer", "Verano"
    FALL = "fall", "Otoño"
    WINTER = "winter", "Invierno"
    UNKNOWN = "unknown", "Desconocida"


class Size(models.TextChoices):
    S = "s", "S"
    M = "m", "M"
    L = "l", "L"
    XL = "xl", "XL"
    OTHER = "other", "Otro"


class ShippingType(models.TextChoices):
    TWO_DAY = "2-day shipping", "Envío en 2 Días"
    EXPRESS = "express", "Exprés"
    FREE = "free shipping", "Envío Gratuito"
    NEXT_DAY_AIR = "next day air", "Entrega al Día Siguiente (Aéreo)"
    STANDARD = "standard", "Estándar"
    STORE_PICKUP = "store pickup", "Recogida en Tienda"
