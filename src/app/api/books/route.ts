import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Transform to match the library page format
    const transformedBooks = books.map((book: any) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.purchasePrice || 0,
      stock: book.available,
      cover: 'bg-orange-100',
      iconColor: 'text-orange-500',
      icon: null, // Will be set in the component
    }));

    return NextResponse.json(transformedBooks);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { error: 'Failed to fetch books', details: (error as Error).message },
      { status: 500 }
    );
  }
}
