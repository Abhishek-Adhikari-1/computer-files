
#include <stdio.h>
#include <math.h>
#include <stdlib.h>
int main()
{
    int a, b, c, validInput;
    float discriminant, root1, root2;

    do
    {
        printf("Enter coefficients a, b, and c: ");
        validInput = scanf("%d %d %d", &a, &b, &c);

        if (validInput != 3)
        {
            printf("\n\033[1;31mInvalid input. Please enter three integers.\033[0m\n\n");
            while (getchar() != '\n')
                ;
        }

    } while (validInput != 3);

    discriminant = b * b - 4 * a * c;

    if (discriminant > 0)
    {
        root1 = (-b + sqrt(discriminant)) / (2 * a);
        root2 = (-b - sqrt(discriminant)) / (2 * a);
        printf("Roots are real and different: %.2f and %.2f\n\n", root1, root2);
    }
    else if (discriminant == 0)
    {
        root1 = root2 = -b / (2 * a);
        printf("Roots are real and the same: %.2f and %.2f\n\n", root1, root2);
    }
    else
    {
        float realPart = -b / (2 * a);
        float imaginaryPart = sqrt(-discriminant) / (2 * a);
        printf("Roots are complex and different: %.2f + %.2fi and %.2f - %.2fi\n\n", realPart, imaginaryPart, realPart, imaginaryPart);
    }
    system("pause");
    return 0;
}
