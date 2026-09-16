#  BALLENBAK

def maak_ballenbak():
    """
    Maakt de ballenbak aan.
    3 groene, 3 rode, en nummers (even voor team1, oneven voor team2)
    """
    ballen = (
        ["groen"] * 3 +
        ["rood"]  * 3 +
        list(range(2, 50, 2)) +   # even nummers: team 1
        list(range(1, 50, 2))     # oneven nummers: team 2
    )
    random.shuffle(ballen)
    return ballen