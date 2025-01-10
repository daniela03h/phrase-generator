import { NextResponse } from 'next/server';

// Define a POST request handler
export async function POST(req: Request) {
  // Parse the JSON body of the request
  const body = await req.json();

  // Convert the number from the body to an integer
  const number = parseInt(body.number);

  // Check if the input is not a valid number
  if (isNaN(number)) {
    // Return a 400 response with an error message
    return NextResponse.json({ error: 'Invalid number' }, { status: 400 });
  }

  // Calculate the square of the number
  const square = number ** 2;

  // Calculate the cube of the number
  const cube = number ** 3;

  // Check if the number is even
  const isEven = number % 2 === 0;

  // Return the results in JSON format
  return NextResponse.json({
    square, // The square of the number
    cube,   // The cube of the number
    isEven, // Whether the number is even
  });
}
