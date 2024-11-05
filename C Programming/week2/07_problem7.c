/*
    Author: Abhishek Adhikari
    Date: 7th August 2024
    Purpose: Writing a program to calculate the Volume of the Cube.
    Formula: Volume of Cube = side*side*side

    Additional: The program will keep asking for input until valid integers are entered. If the user enters non-integer values, the program will display an error message and ask for input again.
 */

#include <stdio.h>

int main()
{

    int side, validInput;

    do
    {
        printf("\nEnter the length of the cube: ");
        validInput = scanf("%d", &side);

        if (validInput != 1)
        {
            printf("\n\033[1;31mInvalid input. Please enter only integers.\033[0m\n\n");
            while (getchar() != '\n')
                ;
        }

        if (validInput == 1 && side > 0)
        {
            printf("\nVolume of the cube:\033[1;33m %d \033[0m\n", side * side * side);
            break;
        }

    } while (validInput != 1);
    return 0;
}