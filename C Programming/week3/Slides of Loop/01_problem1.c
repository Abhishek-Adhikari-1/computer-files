#include <stdio.h>
#include <stdlib.h>

int main(){
    int units;
    float bill;
    int validInput;

    do
    {
        printf("Enter the number of units consumed: ");
        validInput = scanf("%d", &units);
        if (validInput != 1){
            printf("\n\033[1;31mInvalid input. Please enter an integer.\033[0m\n\n");
            while (getchar() != '\n')
                ;
        }
    } while (validInput != 1);

    if (units <= 100)
        bill = units * 1.50;
    else if (units <= 200)
        bill = 100 * 1.50 + (units - 100) * 2.00;
    
    else
        bill = 100 * 1.50 + 100 * 2.00 + (units - 200) * 3.00;
    
    printf("Total bill: $%.2f\n", bill);
    system("pause");
    return 0;
}
