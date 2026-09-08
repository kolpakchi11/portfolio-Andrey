def heeft_lijn(kaart):
    """
    Controleert of er een lijn is op de bingo-kaart.
    Kijkt naar: 4 rijen, 4 kolommen, 2 diagonalen
    """
    g = kaart["gemarkeerd"]

    # Horizontale rijen
    for rij in range(4):
        start = rij * 4
        if all(g[start:start + 4]):
            return True

    # Verticale kolommen
    for kolom in range(4):
        if all([g[kolom], g[kolom+4], g[kolom+8], g[kolom+12]]):
            return True

    # Diagonaal links → rechts (0, 5, 10, 15)
    if all([g[0], g[5], g[10], g[15]]):
        return True

    # Diagonaal rechts → links (3, 6, 9, 12)
    if all([g[3], g[6], g[9], g[12]]):
        return True

    return False