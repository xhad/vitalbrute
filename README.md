# VitalBrute

Vitalbrute is an Ethereum smart contract scanner that performs a brutal simulation and savagely aggressive series of contract attacks. It also runs static code analysis for known vulnerabilities.

### Getting Started
To get started, ensure that you have docker and docker-compose install on your system.

```
docker-compose up --build

```

### Mythril

```
docker run -it vitalbrute_mythril
cd contracts
myth -x wallet.sol
```
