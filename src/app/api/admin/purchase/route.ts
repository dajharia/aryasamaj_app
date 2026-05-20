import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { publisher, bookName, author, batchNo, purchasePrice, quantity, category } = body;

    console.log('Received purchase request:', body);

    // Create the book in the database
    const book = await prisma.book.create({
      data: {
        title: bookName,
        author,
        publisher,
        batchNo,
        purchasePrice,
        category,
        totalCopies: quantity,
        available: quantity,
      },
    });

    console.log('Book created successfully:', book);

    return NextResponse.json({ success: true, book }, { status: 201 });
  } catch (error) {
    console.error('Error creating book:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create book', details: (error as Error).message },
      { status: 500 }
    );
  }
}
