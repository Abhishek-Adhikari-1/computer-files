/*
    Author: Abhishek Adhikari
    Date: 7th August 2024
    Purpose: Writing a program to calculate a Simple Interest.
    Formula:  Simple Interest = (Amount * Rate * Time ) / 100

    Additional: The program will keep asking for input until valid integers are entered. If the user enters non-integer values, the program will display an error message and ask for input again.
 */

#include <stdio.h>

int main()
{

    int amount, rate, time, validInput;

    do
    {
        printf("\n\nEnter the amount rate and time: ");
        validInput = scanf("%d %d %d", &amount, &rate, &time);

        if (validInput != 3)
        {
            printf("\n\033[1;31mInvalid input. Please enter only integers.\033[0m\n\n");
            while (getchar() != '\n')
                ;
        }

        if (validInput == 3 && amount > 0 && rate > 0 && time > 0)
        {
            double simpleInterest = (amount * rate * time) / 100.0;
            printf("\nSimple Interest:\033[1;32m %.2f \033[0m\n\n", simpleInterest);
            break;
        }

    } while (validInput != 3);
    return 0;
}