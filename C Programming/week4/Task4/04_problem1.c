#include <stdio.h>
#include <stdlib.h>

int factorial(int n)
{
    if (n == 0 || n == 1)
    {
        return 1;
    }
    else
    {
        return n * factorial(n - 1);
    }
}

int main()
{
    int num = 5;
    printf("Factorial of %d is %d.\n", num, factorial(num));
    system("pause");
    return 0;
}
