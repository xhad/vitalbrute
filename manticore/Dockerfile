FROM ubuntu:16.04

RUN mkdir -p /contracts
WORKDIR /contracts

RUN apt-get -y update && \
	DEBIAN_FRONTEND=noninteractive apt-get -y install python-pip nano git && \
	git clone https://github.com/trailofbits/manticore.git && \
	cd manticore && \
	pip install .

RUN useradd -m manticore
USER manticore
WORKDIR /home/manticore
ENV HOME /home/manticore

CMD ["/bin/bash"]
