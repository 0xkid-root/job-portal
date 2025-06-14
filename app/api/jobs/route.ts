import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Job from '@/lib/models/Job';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const location = searchParams.get('location') || '';
    const skills = searchParams.get('skills')?.split(',').filter(Boolean) || [];
    const remote = searchParams.get('remote') === 'true';
    const urgent = searchParams.get('urgent') === 'true';
    const jobType = searchParams.get('jobType') || '';
    const minRate = parseInt(searchParams.get('minRate') || '0');
    const maxRate = parseInt(searchParams.get('maxRate') || '999999');

    // Build query
    const query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (skills.length > 0) {
      query.skills = { $in: skills };
    }

    if (remote) {
      query.remote = true;
    }

    if (urgent) {
      query.urgent = true;
    }

    if (jobType) {
      query.type = jobType;
    }

    const skip = (page - 1) * limit;

    const [jobs, total] = await Promise.all([
      Job.find(query)
        .populate('postedBy', 'firstName lastName company')
        .sort({ isPremium: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Job.countDocuments(query)
    ]);

    return NextResponse.json({
      success: true,
      data: {
        jobs,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Jobs fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const {
      title,
      description,
      company,
      location,
      type,
      duration,
      rate,
      skills,
      experience,
      requirements,
      benefits,
      remote,
      urgent,
      contactEmail
    } = body;

    // Validate required fields
    if (!title || !description || !company || !location || !type || !rate || !skills || !experience || !contactEmail) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const job = new Job({
      title,
      description,
      company,
      location,
      type,
      duration,
      rate,
      skills,
      experience,
      requirements: requirements || [],
      benefits: benefits || [],
      remote: remote || false,
      urgent: urgent || false,
      contactEmail
    });

    await job.save();

    return NextResponse.json({
      success: true,
      data: job
    });

  } catch (error) {
    console.error('Job creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}