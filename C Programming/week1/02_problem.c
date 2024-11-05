/*
    Author: Abhishek Adhikari,
    Date: 7/13/2024,
    Purpose: Writing a program to divide two numbers.
    Description: This program calculates the division of two numbers and displays the result in float of .2f.

    Example:
    Input: 10, 3
    Output: 3.33
    Constraints: The input numbers should be integers between -1000 and 1000.
    Additional: The program handles cases where the divisor is zero by displaying an error message. Also the program will keep asking for input until valid integers are entered. If the user enters non-integer values, the program will display an error message and ask for input again.
*/

#include <stdio.h>

int main()
{
    int num1, num2;
    float result;
    int validInput;

    do
    {
        printf("Enter two numbers: ");
        validInput = scanf("%d %d", &num1, &num2);

        if (validInput != 2)
        {
            while (getchar() != '\n')
                ;
            printf("\033[1;31mInvalid input. Please enter only integers.\033[0m\n\n");
        }

        if (num2 == 0 && validInput == 2)
        {
            printf("\033[1;31mError: Division by zero does not exist.\033[0m\n\n");
            validInput = 0;
        }

    } while (validInput != 2);

    result = (float)num1 / num2;
    printf("Result: %.2f\n", result);

    return 0;
}
