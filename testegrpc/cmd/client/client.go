package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"testegrpc/pb"
	"time"

	"google.golang.org/grpc"
)

func main() {
	connection, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Could not connect to Grpc: %v", err)
	}
	defer connection.Close()

	client := pb.NewUserServiceClient(connection)

	// AddUser(client)
	// AddUserVerbose(client)
	AddUSers(client)
}

func AddUser(client pb.UserServiceClient) {
	req := &pb.User{
		Id:    "0",
		Name:  "Balbi",
		Email: "balbimarcus@gmail.com",
	}

	res, err := client.AddUser(context.Background(), req)
	if err != nil {
		log.Fatalf("Could not make Grpc request: %v", err)
	}

	fmt.Println(res)
}

func AddUserVerbose(client pb.UserServiceClient) {
	req := &pb.User{
		Id:    "0",
		Name:  "Balbi",
		Email: "balbimarcus@gmail.com",
	}

	responseStream, err := client.AddUserVerbose(context.Background(), req)
	if err != nil {
		log.Fatalf("Could not make Grpc request: %v", err)
	}

	for {
		stream, err := responseStream.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatalf("Could not receive msg request: %v", err)
		}
		fmt.Println("Status: ", stream.Status)

		if stream.Status == "Completed" {
			fmt.Println("User Inserted: ", stream.User)
		}

	}
}

func AddUSers(client pb.UserServiceClient) {
	reqs := []*pb.User{
		&pb.User{
			Id:    "b1",
			Name:  "Balbi 1",
			Email: "balbimarcus@gmail.com",
		},
		&pb.User{
			Id:    "b2",
			Name:  "Jack 2",
			Email: "jack@example.com",
		},
		&pb.User{
			Id:    "b3",
			Name:  "Joe 3",
			Email: "joe@example.com",
		},
		&pb.User{
			Id:    "b4",
			Name:  "Jessie 4",
			Email: "jessie@example.com",
		},
	}

	stream, err := client.AddUsers(context.Background())
	if err != nil {
		log.Fatalf("Error createing request: %v", err)
	}

	for _, req := range reqs {
		stream.Send(req)
		time.Sleep(time.Second * 2)
	}
	res, err := stream.CloseAndRecv()
	if err != nil {
		log.Fatalf("Error receiving request: %v", err)
	}

	fmt.Println("Message REceived:", res)

}
