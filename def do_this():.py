import random

def do_this():
    """A simple number guessing game"""
    secret_number = random.randint(1, 100)
    attempts = 0
    
    print("Welcome to the Number Guessing Game!")
    print("I'm thinking of a number between 1 and 100.")
    print("Type 0 anytime to quit.")
    
    while True:
        try:
            guess = int(input("\nGuess the number: "))

            if guess == 0:
                print("Game ended. See you next time!")
                break

            attempts += 1
            
            if guess < secret_number:
                print("Too low! Try again.")
            elif guess > secret_number:
                print("Too high! Try again.")
            else:
                print(f"🎉 You got it! The number was {secret_number}.")
                print(f"It took you {attempts} attempts.")
                break
        except ValueError:
            print("Please enter a valid number.")

if __name__ == "__main__":
    do_this()