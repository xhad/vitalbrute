# VitalBrute
<img src="https://github.com/xhad/vitalbrute/blob/master/assets/vitalbrute.png" width="250px" height="250px" />
Vitalbrute is an Ethereum smart contract scanner that performs a brutal and savagely aggressive contract attack. It also runs code analysis for known vulnerabilities.

### Getting Started
To get started, ensure that you have docker and docker-compose install on your system.

```
docker-compose up --build

```

## Docker Containers

Each scanner runs in a docker container and may be accessed and used individually as follows:

### Mythril

```
docker run -it vitalbrute_mythril /bin/bash
cd contracts
nano wallet.sol (paste in the contract code and ctrl-x then y)
myth -x wallet.sol --max-depth 10
```
You can access the Mythril WebUI at:
http://localhost:4000

### Oyente

```
docker run -it vitalbrute_oyente
cd contracts
nano wallet.sol (paste in the contract code and ctrl-x then y)
cd /oyente/oyente
python oyente.py -s /contracts/wallet.sol
```
You can access the Oyente WebUI at:
http://localhost:3000

### Manticore

```
docker run -it vitalbrute_manticore
```
