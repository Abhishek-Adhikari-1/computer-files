/*
    Author: Abhishek Adhikari
    Date: 7th August 2024
    Purpose: Writing a program to calculate the Surface area of Sphere.
    Formula: Surface Area of a Sphere = 4 * π * r^2

    Additional: The program will keep asking for input until valid integers are entered. If the user enters non-integer values, the program will display an error message and ask for input again.
 */

#include <stdio.h>
#define PI 3.14

int main()
{
    int radius, validInput;

    do
    {
        printf("\n\nEnter the radius of the sphere (positive integer): ");
        validInput = scanf("%d", &radius);

        if (validInput != 1)
        {
            printf("\n\033[1;31mInvalid input. Please enter only integers.\033[0m\n\n");
            while (getchar() != '\n')
                ;
        }

        if (radius <= 0)
        {
            printf("\n\033[1;31mInvalid input. Radius must be a positive integer.\033[0m\n\n");
        }

        if (validInput == 1 && radius > 0)
        {
            double area = 4 * PI * radius * radius;

            printf("\nSurface Area of the sphere:\033[33m %.2lf \033[0m\n", area);
            break;
        }

    } while (validInput != 1);

    return 0;
}