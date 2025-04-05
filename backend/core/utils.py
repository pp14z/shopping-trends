from .models import AgeGroup


def get_age_group(age: int) -> AgeGroup:
    if age < 18:
        return AgeGroup.UNDER_18
    elif 18 <= age <= 25:
        return AgeGroup.B18_25
    elif 26 <= age <= 35:
        return AgeGroup.B26_35
    elif 36 <= age <= 50:
        return AgeGroup.B36_50
    else:
        return AgeGroup.OVER_51
