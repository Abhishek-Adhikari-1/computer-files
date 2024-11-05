/*
    Author: Abhishek Adhikari
    Date: 7th August 2024
    Purpose: Writing a program to convert Temperature Fahrenheit into Celsius.
    Formula: Celsius= (Fahrenheit/1.8) - 32

    Additional: The program will keep asking for input until valid integers are entered. If the user enters non-integer values, the program will display an error message and ask for input again.
 */

#include <stdio.h>

int main()
{

    int far, validInput;
    float cel;

    do
    {
        printf("\n\nEnter the temperature in Fahrenheit: ");
        validInput = scanf("%d", &far);

        if (validInput != 1)
        {
            printf("\n\033[1;31mInvalid input. Please enter only integers.\033[0m\n\n");
            while (getchar() != '\n')
                ;
        }

        if (validInput == 1)
        {
            cel = (far - 32) * 5 / 9;
            printf("\nThe temperature in Celsius is:\033[1;33m %.2f \033[0m\n", cel);
        }

    } while (validInput != 1);
    return 0;
}