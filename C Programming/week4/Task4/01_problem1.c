#include <stdio.h>
#include <stdlib.h>
int isEven(int num)
{
    return num % 2 == 0 ? 1 : 0;
}

int main()
{
    int number;
    printf("Enter any number: ");
    scanf("%d", &number);

    if (isEven(number))
    {
        printf("\n%d is even.\n", number);
    }
    else
    {
        printf("\n%d is odd.\n", number);
    }
    system("pause");
    return 0;
}
