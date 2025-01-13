import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const subjects = ["The dog", "The turtle", "My friend", "Sebastian"];
  const predicates = ["runs fast", "is very wise", "loves coding", "sings poorly"];

  const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
  const randomPredicate = predicates[Math.floor(Math.random() * predicates.length)];

  let phrase = `${randomSubject} ${randomPredicate}`;

  if (randomSubject.length > 8) {
    phrase = `${randomSubject} intelligent ${randomPredicate}`;
  }

  if (randomPredicate.includes("coding")) {
    phrase = `${randomSubject} ${randomPredicate}!`;
  }

  return NextResponse.json({ phrase });
}