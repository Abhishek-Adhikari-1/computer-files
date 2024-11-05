/*
    Author: Abhishek Adhikari
    Date: 7th August 2024
    Purpose: Writing a program to calculate the Area of the Trapezium.
    Formula: Area of trapezium = 0.5*(base1+base2)*height

    Additional: The program will keep asking for input until valid integers are entered. If the user enters non-integer values, the program will display an error message and ask for input again.
 */

#include <stdio.h>

int main()
{

    int base1, base2, height, area, validInput;

    do
    {
        printf("\nEnter the two parallel sides and height of the trapezium: ");
        validInput = scanf("%d %d %d", &base1, &base2, &height);

        if (validInput != 3)
        {
            printf("\n\033[1;31mInvalid input. Please enter only integers.\033[0m\n\n");
            while (getchar() != '\n')
                ;
        }

        if (validInput == 3 && base1 > 0 && base2 > 0)
        {
            area = 0.5 * (base1 + base2) * height;
            printf("\nThe area of the trapezium is:\033[1;32m %d \033[0m\n\n", area);
            break;
        }

    } while (validInput != 3);
    return 0;
}