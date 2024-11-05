/*
    Author: Abhishek Adhikari,
    Date: 7/25/2024,
    Purpose: Writing a program to input numbers from user and reversing it with optimization.
*/

#include <stdio.h>
#define arrLength 5

int main()
{
    int arr1[arrLength];
    int valid_input;

    printf("\n\033[1;34mEnter %d numbers to reverse them:\033[0m\n", arrLength);

    // Taking only valid integers from user and storing them in array
    for (int i = 0; i < arrLength; i++)
    {
        do
        {
            printf("Enter number [%d]: ", i);
            valid_input = scanf("%d", &arr1[i]);

            // Invalid inputs gets warning and again returns the same block until validates
            if (valid_input != 1)
            {
                while (getchar() != '\n')
                    ;
                printf("\n\033[1;31mInvalid input. Please enter only integers.\033[0m\n\n");
            }
        } while (valid_input != 1);
    }

    printf("\n\033[1;32mReversed array is:\033[0m\n");

    // Printing the array
    for (int i = arrLength - 1; i >= 0; i--)
    {
        printf("%d ", arr1[i]);
    }
    printf("\n\n");

    return 0;
}
