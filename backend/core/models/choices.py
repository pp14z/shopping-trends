from django.db import models


class AgeGroup(models.TextChoices):
    UNDER_18 = "<18", "Menores de 18"
    B18_25 = "18–25", "18 a 25"
    B26_35 = "26–35", "26 a 35"
    B36_50 = "36–50", "36 a 50"
    OVER_51 = ">51", "Mayores de 51"


class Gender(models.TextChoices):
    FEMALE = "Female", "Femenino"
    MALE = "Male", "Masculino"
    UNKNOWN = "Unknown", "Desconocido"


class PurchaseFrequency(models.TextChoices):
    WEEKLY = "Weekly", "Semanal"
    BI_WEEKLY = "Bi-Weekly", "Cada 2 semanas"
    FORTNIGHTLY = "Fortnightly", "Cada 15 días"
    MONTHLY = "Monthly", "Mensual"
    EVERY_3_MONTHS = "Every 3 Months", "Cada 3 meses"
    QUARTERLY = "Quarterly", "Trimestral"
    ANNUALLY = "Annually", "Anual"
    UNKNOWN = "Unknown", "Desconocida"


class PaymentMethod(models.TextChoices):
    BANK_TRANSFER = "Bank Transfer", "Transferencia Bancaria"
    CASH = "Cash", "Efectivo"
    CREDIT_CARD = "Credit Card", "Tarjeta de Crédito"
    DEBIT_CARD = "Debit Card", "Tarjeta de Débito"
    PAYPAL = "PayPal", "PayPal"
    VENMO = "Venmo", "Venmo"
    UNKNOWN = "Unknown", "Desconocido"


class Category(models.TextChoices):
    ACCESSORIES = "Accessories", "Accesorios"
    CLOTHING = "Clothing", "Ropa"
    FOOTWEAR = "Footwear", "Calzado"
    OUTERWEAR = "Outerwear", "Abrigo"
    OTHER = "Other", "Otro"


class Season(models.TextChoices):
    SPRING = "Spring", "Primavera"
    SUMMER = "Summer", "Verano"
    FALL = "Fall", "Otoño"
    WINTER = "Winter", "Invierno"
    NON_SEASONAL = "Non-Seasonal", "No Estacional"


class Size(models.TextChoices):
    S = "S", "S"
    M = "M", "M"
    L = "L", "L"
    XL = "XL", "XL"
    OTHER = "Other", "Otro"


class ShippingType(models.TextChoices):
    TWO_DAY = "2-Day Shipping", "Envío en 2 Días"
    EXPRESS = "Express", "Exprés"
    FREE = "Free Shipping", "Envío Gratuito"
    NEXT_DAY_AIR = "Next Day Air", "Entrega al Día Siguiente (Aéreo)"
    STANDARD = "Standard", "Estándar"
    STORE_PICKUP = "Store Pickup", "Recogida en Tienda"
