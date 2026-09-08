def update_bingo_kaart(kaart, bal_nummer):
    """Kruis een nummer aan op de bingo-kaart"""
    for i, nummer in enumerate(kaart["nummers"]):
        if nummer == bal_nummer:
            kaart["gemarkeerd"][i] = True
            print("  " + groen_tekst(f"✓ Nummer {bal_nummer} aangevinkt op de kaart!"))
            return
    print("  " + dim_tekst(f"Nummer {bal_nummer} staat niet op jouw kaart."))
