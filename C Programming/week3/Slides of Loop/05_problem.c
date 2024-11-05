#include <stdio.h>
#include <stdlib.h>

int main() {
    int number, choice;
    int validInput;

    do {
        printf("Enter a number: ");
        validInput = scanf("%d", &number);

        if (validInput != 1) {
            printf("\n\033[1;31mInvalid input. Please enter an integer.\033[0m\n\n");
            while (getchar() != '\n')
                ;
            continue; 
        }

        switch (number % 2) {
            case 0:
                printf("%d is divisible by 2.\n", number);
                break;
            default:
                break;
        }

        switch (number % 3) {
            case 0:
                printf("%d is divisible by 3.\n", number);
                break;
            default:
                break;
        }

        switch (number % 5) {
            case 0:
                printf("%d is divisible by 5.\n", number);
                break;
            default:
                break;
        }

        switch (number % 7) {
            case 0:
                printf("%d is divisible by 7.\n", number);
                break;
            default:
                break;
        }

        printf("Do you want to check another number? (1 for Yes, 0 for No): ");
        validInput = scanf("%d", &choice);

        if (validInput != 1) {
            printf("\n\033[1;31mInvalid input. Please enter 1 or 0.\033[0m\n\n");
            while (getchar() != '\n')
                ;
            choice = 1; 
        }

    } while (choice == 1);

    return 0;
}
