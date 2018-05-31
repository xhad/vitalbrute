FROM ubuntu:16.04

RUN mkdir -p /mythril
COPY . /mythril

RUN mkdir -p /contracts
WORKDIR /contracts
COPY ./contracts /contracts

RUN apt-get update \
  && apt-get install -y software-properties-common \
  && add-apt-repository -y ppa:ethereum/ethereum \
  && apt-get update \
  && apt-get install -y \
     solc \
     libssl-dev \
     python3-pip=9.0.1-2 \
     python3-dev \
     pandoc \
     git \
  && ln -s /usr/bin/python3 /usr/local/bin/python \
  && cd /mythril \
  && pip3 install -r requirements.txt \
  && python setup.py install

CMD ["/bin/bash"]

