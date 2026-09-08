def vul_bevestigde_letters_in(bevestigd, raadwoord, resultaat):
    """Sla groene letters op zodat ze bij de volgende poging al staan"""
    for i in range(len(raadwoord)):
        if resultaat[i] == "groen":
            bevestigd[i] = raadwoord[i]