# VitalBrute

Vitalbrute is an Ethereum smart contract scanner that performs a brutal and savagely aggressive contract attack. It also runs code analysis for known vulnerabilities.

### Getting Started
To get started, ensure that you have docker and docker-compose install on your system.

```
docker-compose up --build

```

### Mythril

```
docker run -it vitalbrute_mythril
cd contracts
myth -x wallet.sol --max-depth 10
```

### Oyente

```
docker run -it vitalbrute_oyente
cd /oyente/oyente
python oyente.py -s /contracts/wallet.sol
```

### Manticore

```
docker run -it vitalbrute_manticore
```
