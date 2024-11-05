/*
    Author: Abhishek Adhikari
    Date: 10th August 2024
    Topic: Temperature Message
    Purpose: Display a suitable message according to the temperature in centigrade.
    Hint: Temp < 0 then Freezing weather; Temp 0-10 then Very Cold weather; etc.

    Additional: The program will keep asking for input until a valid integer is entered.
*/

#include <stdio.h>
#include <stdlib.h>
int main()
{
    int temperature, validInput;

    do
    {
        printf("Enter temperature in centigrade: ");
        validInput = scanf("%d", &temperature);

        if (validInput != 1)
        {
            printf("\n\033[1;31mInvalid input. Please enter an integer.\033[0m\n\n");
            while (getchar() != '\n')
                ;
        }

    } while (validInput != 1);

    if (temperature < 0)
        printf("Freezing weather.\n\n");
    else if (temperature >= 0 && temperature < 10)
        printf("Very Cold weather.\n\n");
    else if (temperature >= 10 && temperature < 20)
        printf("Cold weather.\n\n");
    else if (temperature >= 20 && temperature < 30)
        printf("Normal in Temperature.\n\n");
    else if (temperature >= 30 && temperature < 40)
        printf("It's Hot.\n\n");
    else
        printf("It's Very Hot.\n\n");
    system("pause");
    return 0;
}
