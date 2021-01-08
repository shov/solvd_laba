#include <cstdio>
#include <cstring>
#include <cstdlib>
#include <unistd.h>

#include <netinet/tcp.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <netdb.h>

#define BUFFER_SIZE 1024
int socket_connect(char *host, in_port_t port);


int main() {
    int fd;
    const char* host = "www.google.com";
    in_port_t port = 80;

    fd = socket_connect((char *)host, port);

    const char* body = "GET /search?q=what+http+is HTTP/1.0\r\n"
                             "Host: www.google.com\r\n"
                             "\r\n";

    printf("Request\n%s\n\n", body);
    write(fd, body, strlen(body));

    char buffer[BUFFER_SIZE];
    bzero(buffer, BUFFER_SIZE);
    while (read(fd, buffer, BUFFER_SIZE - 1) != 0) {
        printf("%s", buffer);
        bzero(buffer, BUFFER_SIZE);
    }

    shutdown(fd, SHUT_RDWR);
    close(fd);

    return 0;
}

int socket_connect(char *host, in_port_t port) {
    struct hostent *hp;
    struct sockaddr_in addr{};
    int on = 1, sock;

    if ((hp = gethostbyname(host)) == NULL) {
        herror("gethostbyname");
        exit(1);
    }
    bcopy(hp->h_addr, &addr.sin_addr, hp->h_length);
    addr.sin_port = htons(port);
    addr.sin_family = AF_INET;
    sock = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
    setsockopt(sock, IPPROTO_TCP, TCP_NODELAY, (const char *) &on, sizeof(int));

    if (sock == -1) {
        perror("setsockopt");
        exit(1);
    }

    if (connect(sock, (struct sockaddr *) &addr, sizeof(struct sockaddr_in)) == -1) {
        perror("connect");
        exit(1);

    }
    return sock;
}