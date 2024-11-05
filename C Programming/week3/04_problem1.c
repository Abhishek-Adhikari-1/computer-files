/*
    Author: Abhishek Adhikari
    Date: 10th August 2024
    Topic: Voting Eligibility
    Purpose: Determine if a candidate is eligible for voting.
    Hint: age >= 18

    Additional: The program will keep asking for input until a valid integer is entered.
*/

#include <stdio.h>
#include <stdlib.h>
int main()
{
    int age, validInput;

    do
    {
        printf("Enter your age: ");
        validInput = scanf("%d", &age);

        if (validInput != 1)
        {
            printf("\n\033[1;31mInvalid input. Please enter an integer.\033[0m\n\n");
            while (getchar() != '\n')
                ;
        }

    } while (validInput != 1);

    if (age >= 18)
        printf("You are eligible to vote.\n\n");
    else
        printf("You are not eligible to vote.\n\n");
    system("pause");
    return 0;
}
