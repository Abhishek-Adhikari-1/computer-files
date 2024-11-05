/*
    Author: Abhishek Adhikari
    Date: 10th August 2024
    Topic: Triangle Type Check
    Purpose: Determine if a triangle is equilateral, isosceles, or scalene.
    Hint: Compare the three sides of the triangle.

    Additional: The program will keep asking for input until three valid integers are entered.
*/

#include <stdio.h>
#include <stdlib.h>
int main()
{
    int side1, side2, side3, validInput;

    do
    {
        printf("Enter the three sides of the triangle: ");
        validInput = scanf("%d %d %d", &side1, &side2, &side3);

        if (validInput != 3)
        {
            printf("\n\033[1;31mInvalid input. Please enter three integers.\033[0m\n\n");
            while (getchar() != '\n')
                ;
        }

    } while (validInput != 3);

    if (side1 == side2 && side2 == side3)
        printf("The triangle is Equilateral.\n\n");
    else if (side1 == side2 || side2 == side3 || side1 == side3)
        printf("The triangle is Isosceles.\n\n");
    else
        printf("The triangle is Scalene.\n\n");
    system("pause");
    return 0;
}
