/*
    Author: Abhishek Adhikari
    Date: 10th August 2024
    Topic: Positive or Negative Number
    Purpose: Check whether a given number is positive or negative.
    Hint: number > 0; number < 0

    Additional: The program will keep asking for input until a valid integer is entered.
*/

#include <stdio.h>
#include <stdlib.h>
int main()
{
    int number, validInput;

    do
    {
        printf("Enter an integer: ");
        validInput = scanf("%d", &number);

        if (validInput != 1)
        {
            printf("\n\033[1;31mInvalid input. Please enter an integer.\033[0m\n\n");
            while (getchar() != '\n')
                ;
        }

    } while (validInput != 1);

    if (number > 0)
        printf("The number is Positive.\n\n");
    else if (number < 0)
        printf("The number is Negative.\n\n");
    else
        printf("The number is Zero.\n\n");
    system("pause");
    return 0;
}
