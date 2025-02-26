package main
import (
	"fmt"
	"runtime"
	"sync"
	"time"
)


//Time Complexity: O(1)
//Space Complexity: O(1)
func sum_to_n_a(n int) int {
    return n * (n + 1) / 2
}


//Time Complexity: O(n)
//Space Complexity: O(1)
func sum_to_n_b(n int) int {
	var wg sync.WaitGroup
	numWorkers := runtime.NumCPU()
	ch := make(chan int, numWorkers)

	chunkSize := n / numWorkers
	remainder := n % numWorkers

	start := 1
	for i := 0; i < numWorkers; i++ {
		end := start + chunkSize - 1
		if i < remainder {
			end++
		}

		wg.Add(1)
		go func(s, e int) {
			defer wg.Done()
			partialSum := 0
			for j := s; j <= e; j++ {
				partialSum += j
			}
			ch <- partialSum
		}(start, end)

		start = end + 1
	}
	wg.Wait()
	close(ch)

	total := 0
	for sum := range ch {
		total += sum
	}
	return total
}


//Time Complexity: O(n)
//Space Complexity: O(n)
func sum_to_n_c(n int) int {
	if n <= 0 {
        return 0
    }
    return n + sum_to_n_c(n-1)
}



func main() {
	n := 10000
	startA := time.Now()
	resultA := sum_to_n_a(n)
	elapsedA := time.Since(startA)
	fmt.Printf("sum_to_n_a: %d, runtime: %s\n", resultA, elapsedA)

	startB := time.Now()
	resultB := sum_to_n_b(n)
	elapsedB := time.Since(startB)
	fmt.Printf("sum_to_n_b: %d, runtime: %s\n", resultB, elapsedB)

	startC := time.Now()
	resultC := sum_to_n_c(n)
	elapsedC := time.Since(startC)
	fmt.Printf("sum_to_n_c: %d, runtime: %s\n", resultC, elapsedC)
}