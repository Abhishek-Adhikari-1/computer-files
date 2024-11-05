/*
    Author: Abhishek Adhikari
    Date: 10th August 2024
    Topic: Triangle Formation Check
    Purpose: Check whether a triangle can be formed by the given angles.
    Hint: Sum of angles = 180 degrees.

    Additional: The program will keep asking for input until three valid integers are entered.
*/

#include <stdio.h>
#include <stdlib.h>
int main()
{
    int angle1, angle2, angle3, validInput;

    do
    {
        printf("Enter the three angles of the triangle: ");
        validInput = scanf("%d %d %d", &angle1, &angle2, &angle3);

        if (validInput != 3)
        {
            printf("\n\033[1;31mInvalid input. Please enter three integers.\033[0m\n\n");
            while (getchar() != '\n')
                ;
        }

    } while (validInput != 3);

    if (angle1 + angle2 + angle3 == 180)
        printf("The angles can form a triangle.\n\n");
    else
        printf("The angles cannot form a triangle.\n\n");
    system("pause");
    return 0;
}
