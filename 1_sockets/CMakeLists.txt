cmake_minimum_required(VERSION 3.17)
project(sockets_cpp)

set(CMAKE_CXX_STANDARD 14)

add_executable(sockets_cpp socket_http_client.cpp)