/*
    Author: Abhishek Adhikari
    Date: 10th August 2024
    Topic: Vowel or Consonant
    Purpose: Check whether an alphabet is a vowel or consonant.
    Hint: Vowels are 'a', 'e', 'i', 'o', 'u'.

    Additional: The program will keep asking for input until a valid alphabet is entered.
*/

#include <stdio.h>
#include <ctype.h>
#include <stdlib.h>
int main()
{
    char ch;
    int validInput;

    do
    {
        printf("Enter an alphabet: ");
        validInput = scanf(" %c", &ch);

        if (validInput != 1 || !((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z')))
        {
            printf("\n\033[1;31mInvalid input. Please enter a single alphabet.\033[0m\n\n");
            while (getchar() != '\n')
                ;
        }

    } while (validInput != 1 || !((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z')));

    ch = tolower(ch);
    if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u')
        printf("The alphabet is a Vowel.\n");
    else
        printf("The alphabet is a Consonant.\n");
    system("pause");
    return 0;
}
