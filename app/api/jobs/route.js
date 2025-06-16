import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Job from '@/lib/models/Job';

export async function GET(request) {
  try {
    console.log('Connecting to MongoDB...');
    await connectToDatabase();
    console.log('MongoDB connected successfully');
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const location = searchParams.get('location') || '';
    const skills = searchParams.get('skills')?.split(',').filter(Boolean) || [];
    const remote = searchParams.get('remote') === 'true';
    const urgent = searchParams.get('urgent') === 'true';
    const jobType = searchParams.get('jobType') || '';

    console.log('Received search params:', { page, limit, search, location, skills, remote, urgent, jobType });

    // Build query
    const query = {};

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

    console.log('MongoDB query:', JSON.stringify(query, null, 2));

    const skip = (page - 1) * limit;

    console.log('Executing MongoDB find operation...');
    const [jobs, total] = await Promise.all([
      Job.find(query)
        .select('-__v')
        .sort({ isPremium: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Job.countDocuments(query)
    ]);
    console.log(`Found ${total} jobs, returning ${jobs.length} jobs for current page`);

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
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
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
      skills,
      experience,
      requirements,
      benefits,
      remote,
      urgent,
      contactEmail
    } = body;

    // Validate required fields
    if (!title || !description || !company || !location || !type || !skills || !experience || !contactEmail) {
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
      skills,
      experience,
      requirements: requirements ? [requirements] : [],
      benefits: benefits ? [benefits] : [],
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