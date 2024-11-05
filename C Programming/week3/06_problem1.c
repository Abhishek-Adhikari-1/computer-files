/*
    Author: Abhishek Adhikari
    Date: 10th August 2024
    Topic: Height Categorization
    Purpose: Categorize a person according to their height.
    Hint: height < 150 is short, 150 <= height < 165 is average, height >= 165 is tall

    Additional: The program will keep asking for input until a valid integer is entered.
*/

#include <stdio.h>
#include <stdlib.h>
int main()
{
    int height, validInput;

    do
    {
        printf("Enter your height in cm: ");
        validInput = scanf("%d", &height);

        if (validInput != 1)
        {
            printf("\n\033[1;31mInvalid input. Please enter an integer.\033[0m\n\n");
            while (getchar() != '\n')
                ;
        }

    } while (validInput != 1);

    if (height < 150)
        printf("You are categorized as Short.\n\n");
    else if (height >= 150 && height < 165)
        printf("You are categorized as Average.\n\n");
    else
        printf("You are categorized as Tall.\n\n");
    system("pause");
    return 0;
}
