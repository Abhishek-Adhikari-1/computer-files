/*
    Author: Abhishek Adhikari
    Date: 7th August 2024
    Purpose: Writing a program to calculate the Volume of the Cone.
    Formula: Volume of a Cone = π * r^2* h

    Additional: The program will keep asking for input until valid integers are entered. If the user enters non-integer values, the program will display an error message and ask for input again.
 */

#include <stdio.h>
#define PI 3.14

int main()
{
    int radius, height, validInput;

    do
    {
        printf("\n\nEnter the radius and height of the cone (positive integer): ");
        validInput = scanf("%d %d", &radius, &height);

        if (validInput != 2)
        {
            printf("\n\033[1;31mInvalid input. Please enter only integers.\033[0m\n\n");
            while (getchar() != '\n')
                ;
        }

        if (radius <= 0)
        {
            printf("\n\033[1;31mInvalid input. Radius must be a positive integer.\033[0m\n\n");
        }

        if (validInput == 2 && radius > 0)
        {
            double area = PI * radius * radius * height;

            printf("\nVolume of the cone:\033[33m %.2lf \033[0m\n", area);
            break;
        }

    } while (validInput != 2);

    return 0;
}