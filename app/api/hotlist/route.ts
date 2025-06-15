import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Hotlist from '@/lib/models/Hotlist';

export async function GET() {
  try {
    await connectToDatabase();
    
    const hotlists = await Hotlist.find({})
      .sort({ createdAt: -1 })
      .limit(50);

    return NextResponse.json({
      success: true,
      data: hotlists,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hotlists' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const data = await request.json();
    const { title, content, screenshot, recruiterEmail } = data;

    // Validate required fields
    if (!title || !content || !recruiterEmail) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new hotlist entry
    const hotlist = await Hotlist.create({
      title,
      content,
      screenshot,
      recruiterEmail,
    });
    console.log(hotlist,"hotlist")

    return NextResponse.json({
      success: true,
      data: hotlist,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create hotlist' },
      { status: 500 }
    );
  }
}