import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Job from '@/lib/models/Job';

export async function GET() {
  try {
    await connectToDatabase();
    
    const jobs = await Job.find({ 
      status: 'active',
      $or: [
        { isPremium: true },
        { urgent: true }
      ]
    })
    .populate('postedBy', 'firstName lastName company')
    .sort({ isPremium: -1, createdAt: -1 })
    .limit(6)
    .lean();

    return NextResponse.json({
      success: true,
      data: jobs
    });

  } catch (error) {
    console.error('Featured jobs fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}