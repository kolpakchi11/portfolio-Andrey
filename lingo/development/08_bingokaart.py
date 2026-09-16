def maak_bingo_kaart():
    """Maakt een lege 4x4 bingo-kaart"""
    nummers = random.sample(range(1, 50), 16)
    return {
        "nummers":    nummers,
        "gemarkeerd": [False] * 16