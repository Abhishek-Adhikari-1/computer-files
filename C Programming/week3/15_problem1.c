/*
    Author: Abhishek Adhikari
    Date: 10th August 2024
    Topic: Character Type Check
    Purpose: Check if a character is uppercase, lowercase, digit, or special symbol.
    Hint: Use ASCII values to determine the type.

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

    if (ch >= 'A' && ch <= 'Z')
        printf("The character is Uppercase.\n");
    else if (ch >= 'a' && ch <= 'z')
        printf("The character is Lowercase.\n");
    else if (ch >= '0' && ch <= '9')
        printf("The character is a Digit.\n");
    else
        printf("The character is a Special Symbol.\n");
    system("pause");
    return 0;
}
