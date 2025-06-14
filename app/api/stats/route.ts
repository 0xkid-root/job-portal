import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/lib/models/User';
import Job from '@/lib/models/Job';
import Application from '@/lib/models/Application';

export async function GET() {
  try {
    await connectToDatabase();
    
    const [totalJobs, totalConsultants, totalRecruiters, placementsThisMonth] = await Promise.all([
      Job.countDocuments({ status: 'active' }),
      User.countDocuments({ role: 'consultant' }),
      User.countDocuments({ role: 'recruiter' }),
      Application.countDocuments({ 
        status: 'hired',
        createdAt: { 
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) 
        }
      })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalJobs,
        totalConsultants,
        totalRecruiters,
        placementsThisMonth
      }
    });

  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}