import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Hotlist from '@/lib/models/Hotlist';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const hotlist = await Hotlist.findById(params.id);

    if (!hotlist) {
      return NextResponse.json(
        { success: false, error: 'Hotlist not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: hotlist,
    });
  } catch (error) {
    console.error('Error fetching hotlist:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hotlist' },
      { status: 500 }
    );
  }
}