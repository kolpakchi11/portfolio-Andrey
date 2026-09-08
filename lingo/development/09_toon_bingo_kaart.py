def toon_bingo_kaart(kaart):
    """Print de bingo-kaart mooi in de terminal"""
    print("\n  " + blauw_tekst("BINGO-KAART:"))
    print("  +" + "------+" * 4)
    for rij in range(4):
        print("  |", end="")
        for kolom in range(4):
            index = rij * 4 + kolom
            nummer = kaart["nummers"][index]
            if kaart["gemarkeerd"][index]:
                # Zachtjes gekleurd als aangevinkt
                print(Back.GREEN + Fore.WHITE + f"  {nummer:2}  " + Style.RESET_ALL + "|", end="")
            else:
                print(f"  {nummer:2}  |", end="")
        print()
    print("  +" + "------+" * 4)
