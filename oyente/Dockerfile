FROM ubuntu:bionic

RUN mkdir -p /contracts

RUN apt-get update
RUN apt-get install -y wget curl unzip python-virtualenv \
    git build-essential software-properties-common curl
RUN add-apt-repository -y ppa:ethereum/ethereum
RUN add-apt-repository -y ppa:ethereum/ethereum-dev
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
# RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update
RUN apt-get install -y build-essential golang-go nano solc \
    ethereum python3-dev python3-pip \
    ruby ruby-rails ruby-dev rake nano \
    git-core curl zlib1g-dev build-essential \
    libssl-dev libreadline-dev npm libyaml-dev \
    libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev \
    libcurl4-openssl-dev python-software-properties \
    libffi-dev nodejs && apt-get clean
RUN pip3 install requests web3
RUN npm install npm@latest -g  && npm install n --global && n stable

RUN mkdir -p /deps/z3/ &&  \
    wget https://github.com/Z3Prover/z3/archive/z3-4.5.0.zip -O /deps/z3/z3.zip && \
    cd /deps/z3/ && unzip /deps/z3/z3.zip && \
    ls /deps/z3 && mv /deps/z3/z3-z3-4.5.0/* /deps/z3/ &&  rm /deps/z3/z3.zip && \
    python scripts/mk_make.py --python && cd build && make && make install

COPY . /oyente/

RUN apt-get install nodejs
RUN npm i -g yarn
RUN cd /oyente/web && ./bin/yarn install
RUN cd /oyente/web && gem install bundler && bundle update && bundle install
WORKDIR /oyente

CMD ["/bin/bash"]

