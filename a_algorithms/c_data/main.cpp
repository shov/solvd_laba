#include <iostream>


struct Pixel {
    long x{0}, y{0};
    char r{0}, g{0}, b{0};
    int alpha{0};
    int z{0};
};

struct Pixel2 {
    char r{0}, g{0}, b{0};
    int z{0};
    int alpha{0};
    long x{0}, y{0};
};

struct Node {
    int value{0};
    Node* next{nullptr};
    Node* prev{nullptr};
};

int main() {
    int a = 1;
    long b = 2;
    short c = 3;
    char d = 97;
    char e = 'a';
    void *p_a = &a;
    long p_aa = (long) p_a;

    int a_arr[4] = {1, 2, 3, 4};
    long l_arr[4] = {1, 2, 3, 4};

    const char *str = "hello";
    const char *u8str = u8"[привет]";
    const wchar_t *wstr = L"[привет]"; //UCS-2 ?

    Pixel p = {0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17};
    Pixel2 p2 = {0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27};

    Node list[3] = {{1}, {2}, {3}};

    for(int i = 0; i < 3; i++) {
        list[i].next = i == 2 ? &list[0] : &list[i+1];
        list[i].prev = i == 0 ? &list[2] : &list[i-1];
    }

    std::cout << "Press anykey";
    std::cin.get();
    return 0;
}
