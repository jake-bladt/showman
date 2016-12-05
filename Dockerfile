FROM alpine
COPY . /usr/build
WORKDIR /usr/build
RUN chmod -x ./dockerup.bat
RUN ./dockerup
