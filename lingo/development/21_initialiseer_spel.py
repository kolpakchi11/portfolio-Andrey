def initialiseer_spel(naam1, naam2):
    # Reset alles naar 0 — nieuw spel
    return {
        "scores":        {1: 0, 2: 0},
        "bingo_kaart":   maak_bingo_kaart(),
        "ballenbak":     maak_ballenbak(),
        "rode_ballen":   0,
        "groene_ballen": 0,
        "woorden_goed":  0,
        "fouten_op_rij": 0,
        "huidig_team":   1,
        "team1_naam":    naam1,
        "team2_naam":    naam2,
    }