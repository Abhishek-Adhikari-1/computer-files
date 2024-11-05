/*
    Author: Abhishek Adhikari
    Date: 10th August 2024
    Topic: Determine Value of n
    Purpose: Display the value of n based on the value of m.
    Hint: n = 1 when m > 0, n = 0 when m = 0, n = -1 when m < 0

    Additional: The program will keep asking for input until a valid integer is entered.
*/

#include <stdio.h>
#include <stdlib.h>
int main()
{
    int m, n, validInput;

    do
    {
        printf("Enter an integer value for m: ");
        validInput = scanf("%d", &m);

        if (validInput != 1)
        {
            printf("\n\033[1;31mInvalid input. Please enter an integer.\033[0m\n\n");
            while (getchar() != '\n')
                ;
        }

    } while (validInput != 1);

    if (m > 0)
        n = 1;
    else if (m == 0)
        n = 0;
    else
        n = -1;

    printf("The value of n is: %d\n\n", n);
    system("pause");
    return 0;
}
