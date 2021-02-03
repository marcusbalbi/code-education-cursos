package main

import (
	"fmt"
	"math/rand"
	"time"
)

func greetings(msg string) {
	fmt.Println("OLA BRASIl: " + msg)
	time.Sleep(time.Duration(rand.Intn(1000)) * time.Second)
}

func main() {
	go greetings("BALBI 1")
	go greetings("BALBI 2")
	go greetings("BALBI 3")
	time.Sleep(3 * time.Second)
}
