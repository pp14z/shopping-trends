from core.models import Customer, Order, Product, ProductVariant


def load_data(df):
    # === CREAR CLIENTES ===
    # Filtrar los que ya existen para evitar errores de IDs duplicados
    existing_ids = set(Customer.objects.values_list("id", flat=True))
    new_customers_df = df[~df["customer id"].isin(existing_ids)]

    # Crear nuevos clientes en bulk
    customers_to_create = [
        Customer(
            id=row["customer id"],
            age=row["age"],
            age_group=row["age group"],
            gender=row["gender"],
            subscription_status=row["subscription status"],
            previous_purchases=row["previous purchases"],
            frequency_of_purchases=row["frequency of purchases"],
            preferred_payment_method=row["preferred payment method"],
        )
        for _, row in new_customers_df.iterrows()
    ]
    Customer.objects.bulk_create(customers_to_create)

    # Crear cache de clientes
    customer_lookup = {c.id: c for c in Customer.objects.all()}

    # === CREAR PRODUCTOS ===
    # Cache con combinaciones (name, category, season) existentes en DB
    product_lookup = {(p.name, p.category, p.season): p for p in Product.objects.all()}

    products_to_create = []
    for _, row in df.iterrows():
        key = (row["item purchased"], row["category"], row["season"])
        if key not in product_lookup:
            product = Product(name=key[0], category=key[1], season=key[2])
            products_to_create.append(product)
            product_lookup[key] = product

    Product.objects.bulk_create(products_to_create)

    # Recargar todos los productos para actualizar el cache
    product_lookup = {(p.name, p.category, p.season): p for p in Product.objects.all()}

    # === CREAR VARIANTES ===
    # Cache con combinaciones únicas: (product, size, color)
    variant_lookup = {
        (v.product.name, v.product.category, v.product.season, v.size, v.color): v
        for v in ProductVariant.objects.select_related("product").all()
    }

    variants_to_create = []
    for _, row in df.iterrows():
        product_key = (row["item purchased"], row["category"], row["season"])
        product = product_lookup[product_key]

        variant_key = (
            product.name,
            product.category,
            product.season,
            row["size"],
            row["color"],
        )

        if variant_key not in variant_lookup:
            variant = ProductVariant(
                product=product, size=row["size"], color=row["color"]
            )
            variants_to_create.append(variant)
            variant_lookup[variant_key] = variant  # También actualiza la cache local

    # Crear todas las variantes nuevas en una sola operación
    ProductVariant.objects.bulk_create(variants_to_create)

    # Recargar todas las variantes para actualizar el cache
    variant_lookup = {
        (v.product.name, v.product.category, v.product.season, v.size, v.color): v
        for v in ProductVariant.objects.select_related("product").all()
    }

    # === CREAR ÓRDENES ===
    orders_to_create = []
    for _, row in df.iterrows():
        customer = customer_lookup[row["customer id"]]
        variant_key = (
            row["item purchased"],
            row["category"],
            row["season"],
            row["size"],
            row["color"],
        )
        variant = variant_lookup[variant_key]

        order = Order(
            customer=customer,
            product_variant=variant,
            purchase_amount=row["purchase amount (usd)"],
            location=row["location"],
            review_rating=row["review rating"],
            payment_method=row["payment method"],
            shipping_type=row["shipping type"],
            discount_applied=row["discount applied"],
            promo_code_used=row["promo code used"],
        )
        orders_to_create.append(order)

    Order.objects.bulk_create(orders_to_create)

    print(
        f"Creados: {len(customers_to_create)} clientes, "
        f"{len(products_to_create)} productos, "
        f"{len(variants_to_create)} variantes, "
        f"{len(orders_to_create)} órdenes."
    )
