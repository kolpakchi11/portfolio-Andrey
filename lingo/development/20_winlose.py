#  WIN / VERLIES CONTROLE

def controleer_winst(spel):
    if spel["groene_ballen"] >= 3:
        return True, "3 groene ballen getrokken!"
    if heeft_lijn(spel["bingo_kaart"]):
        return True, "Lijn op de bingo-kaart!"
    if spel["woorden_goed"] >= 10:
        return True, "10 woorden goed geraden!"
    return False, ""


def controleer_verlies(spel):
    if spel["rode_ballen"] >= 3:
        return True, "3 rode ballen getrokken!"
    if spel["fouten_op_rij"] >= 3:
        return True, "3 woorden op rij fout geraden!"
    return False, ""
