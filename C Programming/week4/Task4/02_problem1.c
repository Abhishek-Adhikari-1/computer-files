#include <stdio.h>
#include <stdlib.h>

int maxOfThree(int a, int b, int c)
{
    if (a >= b && a >= c)
    {
        return a;
    }
    else if (b >= a && b >= c)
    {
        return b;
    }
    else
    {
        return c;
    }
}

int main()
{
    int a = 10, b = 15, c = 7;
    printf("The maximum of %d, %d, and %d is %d.\n", a, b, c, maxOfThree(a, b, c));
    system("pause");
    return 0;
}
