/*
    Author: Abhishek Adhikari
    Date: 10th August 2024
    Topic: Greatest Among Three Numbers
    Purpose: Find the greatest of three numbers.
    Hint: Compare all three numbers to find the greatest.

    Additional: The program will keep asking for input until three valid integers are entered.
*/

#include <stdio.h>
#include <stdlib.h>
int main()
{
    int a, b, c, validInput;

    do
    {
        printf("Enter three integers: ");
        validInput = scanf("%d %d %d", &a, &b, &c);

        if (validInput != 3)
        {
            printf("\n\033[1;31mInvalid input. Please enter three integers.\033[0m\n\n");
            while (getchar() != '\n')
                ;
        }

    } while (validInput != 3);

    if (a >= b && a >= c)
        printf("The greatest number is: %d\n", a);
    else if (b >= a && b >= c)
        printf("The greatest number is: %d\n", b);
    else
        printf("The greatest number is: %d\n", c);
    system("pause");
    return 0;
}
