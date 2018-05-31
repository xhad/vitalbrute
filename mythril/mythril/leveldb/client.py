import plyvel
import binascii
import rlp
import hashlib
from ethereum import utils
from ethereum.block import BlockHeader, Block
from mythril.leveldb.state import State, Account
from mythril.leveldb.eth_db import ETH_DB
from mythril.ether.ethcontract import ETHContract, InstanceList

# Per https://github.com/ethereum/go-ethereum/blob/master/core/database_util.go
# prefixes and suffixes for keys in geth
headerPrefix = b'h'     # headerPrefix + num (uint64 big endian) + hash -> header
bodyPrefix = b'b'       # bodyPrefix + num (uint64 big endian) + hash -> block body
numSuffix = b'n'        # headerPrefix + num (uint64 big endian) + numSuffix -> hash
blockHashPrefix = b'H'  # blockHashPrefix + hash -> num (uint64 big endian)
# known geth keys
headHeaderKey = b'LastBlock' # head (latest) header hash

def _formatBlockNumber(number):
    '''
    formats block number to uint64 big endian
    '''
    return utils.zpad(utils.int_to_big_endian(number), 8)

def _encode_hex(v):
    '''
    encodes hash as hex
    '''
    return '0x' + utils.encode_hex(v)

class EthLevelDB(object):
    '''
    Go-Ethereum LevelDB client class
    '''

    def __init__(self, path):
        self.path = path
        self.db = ETH_DB(path)
        self.headBlockHeader = None
        self.headState = None
        self.all_contracts = None
        self.active_contracts = None
        self.instance_lists = None

    def get_all_contracts(self):
        '''
        get all contracts
        '''
        if not self.all_contracts:
            self.all_contracts = []
            self.active_contracts = []
            self.instance_lists = []
            state = self._get_head_state()
            accounts = state.get_all_accounts()

            for a in accounts:
                if a.code is not None:
                    code = _encode_hex(a.code)
                    md5 = hashlib.md5()
                    md5.update(code.encode('UTF-8'))
                    contract_hash = md5.digest()
                    contract = ETHContract(code, name=contract_hash.hex())
                    self.all_contracts.append(contract)

                    if a.balance != 0:
                        md5 = InstanceList()
                        md5.add(_encode_hex(a.address), a.balance)
                        self.instance_lists.append(md5)
                        self.active_contracts.append(contract)

        return self.all_contracts

    def get_active_contracts(self):
        '''
        get all contracts with non-zero balance
        '''
        if not self.active_contracts:
            self.get_all_contracts() # optimized
        return self.active_contracts

    def search(self, expression, callback_func):
        '''
        searches through non-zero balance contracts
        '''
        contracts = self.get_active_contracts()
        for i in range(0, len(contracts)):
            if contracts[i].matches_expression(expression):
                m = self.instance_lists[i]
                callback_func(contracts[i].name, contracts[i], m.addresses, m.balances)

    def eth_getBlockHeaderByNumber(self, number):
        '''
        gets block header by block number
        '''
        hash = self._get_block_hash(number)
        blockNumber = _formatBlockNumber(number)
        return self._get_block_header(hash, blockNumber)

    def eth_getBlockByNumber(self, number):
        '''
        gets block body by block number
        '''
        blockHash = self._get_block_hash(number)
        blockNumber = _formatBlockNumber(number)
        bodyKey = bodyPrefix + blockNumber + blockHash
        blockData = self.db.get(bodyKey)
        body = rlp.decode(blockData, sedes=Block)
        return body

    def eth_getCode(self, address):
        '''
        gets account code
        '''
        account = self._get_account(address)
        return _encode_hex(account.code)

    def eth_getBalance(self, address):
        '''
        gets account balance
        '''
        account = self._get_account(address)
        return account.balance

    def eth_getStorageAt(self, address, position):
        '''
        gets account storage data at position
        '''
        account = self._get_account(address)
        return _encode_hex(utils.zpad(utils.encode_int(account.get_storage_data(position)), 32))

    def _get_head_state(self):
        '''
        gets head state
        '''
        if not self.headState:
            root = self._get_head_block().state_root
            self.headState = State(self.db, root)
        return self.headState

    def _get_account(self, address):
        '''
        gets account by address
        '''
        state = self._get_head_state()
        accountAddress = binascii.a2b_hex(utils.remove_0x_head(address))
        return state.get_and_cache_account(accountAddress)

    def _get_block_hash(self, number):
        '''
        gets block hash by block number
        '''
        num = _formatBlockNumber(number)
        hashKey = headerPrefix + num + numSuffix
        return self.db.get(hashKey)

    def _get_head_block(self):
        '''
        gets head block header
        '''
        if not self.headBlockHeader:
            hash = self.db.get(headHeaderKey)
            num = self._get_block_number(hash)
            self.headBlockHeader = self._get_block_header(hash, num)
            # find header with valid state
            while not self.db.get(self.headBlockHeader.state_root) and self.headBlockHeader.prevhash is not None:
                hash = self.headBlockHeader.prevhash
                num = self._get_block_number(hash)
                self.headBlockHeader = self._get_block_header(hash, num)
            
        return self.headBlockHeader

    def _get_block_number(self, hash):
        '''
        gets block number by hash
        '''
        numberKey = blockHashPrefix + hash
        return self.db.get(numberKey)

    def _get_block_header(self, hash, num):
        '''
        get block header by block header hash & number
        '''
        headerKey = headerPrefix + num + hash
        blockHeaderData = self.db.get(headerKey)
        header = rlp.decode(blockHeaderData, sedes=BlockHeader)
        return header