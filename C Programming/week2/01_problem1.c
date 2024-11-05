/*
    Author: Abhishek Adhikari
    Date: 7th August 2024
    Purpose: Writing a program to find the Area and Circumference of a Circle.
    Formula: Area of circle = 3.145*r*r and Circumference = 2*3.14*r

    Additional: The program will keep asking for input until valid integers are entered. If the user enters non-integer values, the program will display an error message and ask for input again.
 */

#include <stdio.h>
#define PI 3.14

int main()
{
    int radius, validInput;

    do
    {
        printf("\n\nEnter the radius of the circle (positive integer): ");
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
            double area = PI * radius * radius;
            double circumference = 2 * PI * radius;

            printf("\nArea of the circle:\033[33m %.2lf \033[0m\n", area);
            printf("Circumference of the circle:\033[33m %.2lf \033[0m\n\n", circumference);
            break;
        }

    } while (validInput != 1);

    return 0;
}