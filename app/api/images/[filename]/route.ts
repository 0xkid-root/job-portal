import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Hotlist from '@/lib/models/Hotlist';

export async function GET(request: Request, { params }: { params: { filename: string } }) {
  try {
    await connectToDatabase();
    
    const hotlist = await Hotlist.findOne({ screenshot: params.filename });
    
    if (!hotlist || !hotlist.screenshot) {
      return new NextResponse('Image not found', { status: 404 });
    }

    // Assuming the screenshot field contains base64 data
    const base64Data = hotlist.screenshot;
    console.log(base64Data,"assuming the screenshot!!!")
    const buffer = Buffer.from(base64Data.split(',')[1], 'base64');
    
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('Error serving image', { status: 500 });
  }
}