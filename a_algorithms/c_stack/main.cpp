#include <iostream>

struct TStack {
    static const int SIZE = 3;
    int content[SIZE]{0};
    int top{0};

    int pop() {
        if (top == 0) {
            throw "Stack is empty!";
        }

        top--;
        return content[top];
    }

    TStack *push(int value) {
        if (top >= SIZE) {
            throw "Stack overflow!";
        }

        content[top] = value;
        top++;
        return this;
    }
};

int main() {
    TStack s;

    try {
        s.push(1);
        s.push(1);
        s.push(2);
        s.pop();
        s.push(3);
    } catch (char const *e) {
        std::cout << "Error: " << e << std::endl;
    }

    return 0;
}
