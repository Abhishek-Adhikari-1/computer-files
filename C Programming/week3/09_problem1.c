/*
    Author: Abhishek Adhikari
    Date: 10th August 2024
    Topic: Student Marks and Division
    Purpose: Read roll no, name, and marks of three subjects and calculate the total, percentage, and division.
    Hint: total = subject1 + subject2 + subject3; percentage = (total/300)*100;

    Additional: The program will keep asking for valid input until proper values are entered.
*/

#include <stdio.h>
#include <stdlib.h>
int main()
{
    int rollNo, subject1, subject2, subject3, total, validInput;
    char name[50];
    float percentage;

    printf("Enter Roll No: ");
    scanf("%d", &rollNo);

    printf("Enter Name: ");
    scanf("%s", name);

    do
    {
        printf("Enter marks of three subjects: ");
        validInput = scanf("%d %d %d", &subject1, &subject2, &subject3);

        if (validInput != 3)
        {
            printf("\n\033[1;31mInvalid input. Please enter three integers.\033[0m\n\n");
            while (getchar() != '\n')
                ;
        }

    } while (validInput != 3);

    total = subject1 + subject2 + subject3;
    percentage = (total / 300.0) * 100;

    printf("Total: %d\n\n", total);
    printf("Percentage: %.2f%%\n\n", percentage);

    if (percentage >= 60)
        printf("Division: First\n\n");
    else if (percentage >= 50)
        printf("Division: Second\n\n");
    else if (percentage >= 40)
        printf("Division: Third\n\n");
    else
        printf("Division: Fail\n\n");
    system("pause");
    return 0;
}
