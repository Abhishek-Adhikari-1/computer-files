#include <stdio.h>
#include <stdlib.h>

int main() {
    float a, b, c;
    int validInput;

    do {
        printf("Enter the lengths of the three sides of the triangle: ");
        validInput = scanf("%f %f %f", &a, &b, &c);

        if (validInput != 3) {
            printf("\n\033[1;31mInvalid input. Please enter three numbers.\033[0m\n\n");
            while (getchar() != '\n')
                ;
        }

    } while (validInput != 3);

    if (a == b && b == c) 
        printf("The triangle is Equilateral.\n");
    else if (a == b || b == c || a == c) 
        printf("The triangle is Isosceles.\n");
    else 
        printf("The triangle is Scalene.\n");
    

    system("pause");
    return 0;
}
