import plyvel
from ethereum.db import BaseDB
from ethereum import utils

class ETH_DB(BaseDB):
    '''
    adopts pythereum BaseDB using plyvel
    '''

    def __init__(self, path):
        self.db = plyvel.DB(path)

    def get(self, key):
        '''
        gets value for key
        '''
        return self.db.get(key)

    def put(self, key, value):
        '''
        puts value for key
        '''
        self.db.put(key, value)