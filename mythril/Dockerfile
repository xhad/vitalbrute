FROM ubuntu:bionic
RUN mkdir -p /mythril
COPY . /mythril

EXPOSE 4000
RUN apt-get update \
  && apt-get install -y curl software-properties-common \
  && add-apt-repository -y ppa:ethereum/ethereum \
  && apt-get update \
  && apt-get install -y \
     solc \
     libssl-dev \
     python3-pip \
     python3-wheel \
     python3-dev \
     pandoc \
     git \
     nano \
     npm \
  && ln -s /usr/bin/python3 /usr/local/bin/python \
  && cd /mythril \
  && pip3 install -r requirements.txt \
  && python setup.py install
#RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
RUN apt install nodejs -y

CMD ["/bin/bash"]

