/*
    Author: Abhishek Adhikari,
    Date: 7/13/2024,
    Purpose: Writing a program to multiply two numbers and display the result.
    Description: This program calculates the product of two numbers and displays the result as integer.

    Example: 
    Input: 3, 6
    Output: 18
    Additional: The program will keep asking for input until valid integers are entered. If the user enters non-integer values, the program will display an error message and ask for input again.
*/

#include <stdio.h>

int main()
{
    int num1, num2, product;
    int valid_input;

    do
    {
        printf("Enter two numbers: ");
        valid_input = scanf("%d %d", &num1, &num2);

        if (valid_input != 2)
        {
            while (getchar() != '\n')
                ;
            printf("\n\033[1;31mInvalid input. Please enter only integers.\033[0m\n\n");
        }
    } while (valid_input != 2);

    product = num1 * num2;
    printf("\nProduct of %d and %d is: %d\n", num1, num2, product);

    return 0;
}
