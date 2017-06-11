class ReiteratableWrapper(object):
    def __init__(self, f):
        self._f = f

    def __iter__(self):
        return self._f()
