#include <stdio.h>
#include <stdlib.h>

int main()
{
    int choice;
    float num1, num2, result;
    int validInput;

    do{
        printf("Menu:\n");
        printf("1. Addition\n");
        printf("2. Subtraction\n");
        printf("3. Multiplication\n");
        printf("4. Division\n");
        printf("5. Exit\n");
        printf("Enter your choice: ");
        validInput = scanf("%d", &choice);

        if (validInput != 1){
            printf("\n\033[1;31mInvalid input. Please enter an integer.\033[0m\n\n");
            while (getchar() != '\n');
            continue;
        }

        if (choice == 5)
            exit(0);

        printf("Enter two numbers: ");
        validInput = scanf("%f %f", &num1, &num2);

        if (validInput != 2){
            printf("\n\033[1;31mInvalid input. Please enter two numbers.\033[0m\n\n");
            while (getchar() != '\n');
            continue;
        }

        switch (choice){
        case 1:
            result = num1 + num2;
            printf("Result: %.2f\n", result);
            break;
        case 2:
            result = num1 - num2;
            printf("Result: %.2f\n", result);
            break;
        case 3:
            result = num1 * num2;
            printf("Result: %.2f\n", result);
            break;
        case 4:
            if (num2 != 0){
                result = num1 / num2;
                printf("Result: %.2f\n", result);
            }
            else{
                printf("Error: Division by zero.\n");
            }
            break;
        default:
            printf("Invalid choice.\n");
            break;
        }
    } while (1);

    return 0;
}
