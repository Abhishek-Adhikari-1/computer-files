#include <stdio.h>
#include <stdlib.h>

int myFunction(char string[])
{
    printf("%s\n", string);
    return 0;
}

int main()
{

    myFunction("Softwarica");
    myFunction("Coventry");
    myFunction("Softwarica");
    myFunction("Coventry");
    myFunction("Softwarica");

    system("pause");
    return 0;
}
