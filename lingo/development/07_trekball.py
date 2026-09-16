def trek_bal(ballen):
    """Trekt een willekeurige bal uit de bak (bal verdwijnt)"""
    if not ballen:
        return None
    index = random.randrange(len(ballen))
    return ballen.pop(index)