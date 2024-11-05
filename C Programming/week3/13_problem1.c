/*
    Author: Abhishek Adhikari
    Date: 10th August 2024
    Topic: Character Type Check
    Purpose: Check whether a character is an alphabet, digit, or special character.
    Hint: Use ASCII values to determine character type.

    Additional: The program will keep asking for input until a valid character is entered.
*/

#include <stdio.h>
#include <stdlib.h>
int main()
{
    char ch;
    int validInput;

    do
    {
        printf("Enter a character: ");
        validInput = scanf(" %c", &ch);

        if (validInput != 1)
        {
            printf("\n\033[1;31mInvalid input. Please enter a single character.\033[0m\n\n");
            while (getchar() != '\n')
                ;
        }

    } while (validInput != 1);

    if ((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z'))
        printf("The character is an Alphabet.\n\n");
    else if (ch >= '0' && ch <= '9')
        printf("The character is a Digit.\n\n");
    else
        printf("The character is a Special Character.\n\n");
    system("pause");
    return 0;
}
