/*
    Author: Abhishek Adhikari
    Date: 10th August 2024
    Topic: Even or Odd Number
    Purpose: Check whether a given number is even or odd.
    Hint: number%2 – even else odd

    Additional: The program will keep asking for input until a valid integer is entered.
*/

#include <stdio.h>
#include <stdlib.h>
int main(){
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

    if (number % 2 == 0)
        printf("\033[1;33m The number %d is Even.\033[0m\n\n", number);
    else
        printf("\033[1;33m The number %d is Odd.\033[0m\n\n", number);
    system("pause");
    return 0;
}
