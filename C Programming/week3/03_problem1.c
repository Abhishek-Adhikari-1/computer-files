/*
    Author: Abhishek Adhikari
    Date: 10th August 2024
    Topic: Leap Year Check
    Purpose: Find whether a given year is a leap year or not.
    Hint: if year%4 == 0; if year%100 != 0; year%400 == 0

    Additional: The program will keep asking for input until a valid integer is entered.
*/

#include <stdio.h>
#include <stdlib.h>
int main()
{
    int year, validInput;

    do
    {
        printf("Enter a year: ");
        validInput = scanf("%d", &year);

        if (validInput != 1)
        {
            printf("\n\033[1;31mInvalid input. Please enter an integer.\033[0m\n\n");
            while (getchar() != '\n')
                ;
        }

    } while (validInput != 1);

    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))
        printf("The year is a Leap Year.\n\n");
    else
        printf("The year is not a Leap Year.\n\n");
    system("pause");
    return 0;
}
