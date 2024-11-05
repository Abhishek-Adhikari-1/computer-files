/*
    Author: Abhishek Adhikari
    Date: 7th August 2024
    Purpose: Writing a program to find the Area of a Triangle.
    Formula: Area of a Triangle: (Height*Breadth)/2

    Additional: The program will keep asking for input until valid integers are entered. If the user enters non-integer values, the program will display an error message and ask for input again.
 */

#include <stdio.h>

int main()
{
    int area, validInput, height, breadth;

    do
    {
        printf("\n\nEnter the height and breadth of the triangle: ");
        validInput = scanf("%d %d", &height, &breadth);

        if (validInput != 2)
        {
            printf("\n\033[1;31mInvalid input. Please enter only integers.\033[0m\n\n");
            while (getchar() != '\n')
                ;
        }

        if (validInput == 2 && height > 0 && breadth > 0)
        {
            area = (height * breadth) / 2;
            printf("\nThe area of the triangle is:\033[1;33m %d \033[0m\n\n", area);
            break;
        }

    } while (validInput != 2);

    return 0;
}