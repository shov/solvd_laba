
#include <cstring>
#include <netdb.h>
#include <cstdio>
#include <cstdlib>
#include <unistd.h>

int main(int argc, char **argv) {

    //create a buff
    int BUFF_SIZE = 256;
    char buff[BUFF_SIZE];
    bzero(buff, BUFF_SIZE);

    //result of gethostbyname()
    struct hostent *hostInfo;

    hostInfo = gethostbyname("www.google.com");

    //params ip addr, port 80
    int port = 80;
    int sd = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (-1 == sd) {
        perror("Cannot create a socket");
    }

    struct sockaddr_in addressInfo{};
    addressInfo.sin_family = PF_INET;
    addressInfo.sin_port = htons(port);
    memcpy(&addressInfo.sin_addr, hostInfo->h_addr, sizeof(hostInfo->h_length));

    //connect
    if (-1 == connect(sd, (const struct sockaddr *) &addressInfo, sizeof(addressInfo))) {
        perror("Cannot connect");
    }

    //write
    const char * message = "GET / HTTP/1.0\n\r"
                           "Host: www.google.com\n\r"
                           "\n\r";

    if (-1 == write(sd, message, strlen(message))) {
        perror("Cannot send the message");
    }

    //read to buff and print
    while (read(sd, &buff, BUFF_SIZE - 1) > 0) {
        printf("%s", buff);
        memset(&buff, 0, BUFF_SIZE);
    }

    //shutdown connection
    shutdown(sd, SHUT_RDWR);

    //close socket
    close(sd);
}