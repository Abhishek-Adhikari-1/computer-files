#include <stdio.h>
#include <time.h>

int main()
{
    int maxIterations;
    clock_t start, end;
    double cpu_time_used;

    printf("\nEnter the max number of iterations: ");
    scanf("%d", &maxIterations);

    start = clock(); // Start the timer

    printf("\n\033[1;33mIteration started: \033[0m");
    for (int i = 0; i <= maxIterations; i++)
    {
        // if (i % 10000000 == 0)
        // {
        //     printf("\nIteration is on %d", i);
        // }
    }

    end = clock();
    cpu_time_used = ((double)(end - start)) / CLOCKS_PER_SEC;

    printf("\n\033[1;35mIteration completed.\033[0m");
    printf("\n\033[1;37mTime taken: %f seconds\n\033[0m", cpu_time_used);

    return 0;
}
