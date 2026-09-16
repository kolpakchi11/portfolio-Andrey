def invoer_is_geldig(raadwoord, woord, bevestigd):
    """
    Controleert of het ingevoerde woord geldig is:
    1. Juiste lengte?
    2. Alleen letters?
    3. Bevestigde letters op de juiste plek?
    """
    if len(raadwoord) != len(woord):
        print("  " + rood_tekst(f"✗ Het woord moet {len(woord)} letters hebben!"))
        return False
    if not raadwoord.isalpha():
        print("  " + rood_tekst("✗ Alleen letters toegestaan!"))
        return False
    for i, letter in enumerate(bevestigd):
        if letter and raadwoord[i] != letter:
            print("  " + rood_tekst(f"✗ Positie {i+1} moet '{letter.upper()}' zijn!"))
            return False
    return True
