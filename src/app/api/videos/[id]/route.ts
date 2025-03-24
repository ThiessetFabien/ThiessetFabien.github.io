import fs from 'fs';
import path from 'path';

import { NextRequest, NextResponse } from 'next/server';

const VIDEOS_DIRECTORY = path.join(process.cwd(), 'public/videos');
const DEFAULT_VIDEO_ID = 'default-video';

export const dynamic = 'force-static';
export const revalidate = false;

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  return [
    {
      id: 'casalink',
    },
  ];
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;

  if (!id || id === 'undefined') {
    if (fs.existsSync(path.join(VIDEOS_DIRECTORY, `${DEFAULT_VIDEO_ID}.mp4`))) {
      return NextResponse.redirect(
        new URL(`/videos/${DEFAULT_VIDEO_ID}`, request.url)
      );
    }

    return new NextResponse(JSON.stringify({ error: 'Video ID is required' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const videoPath = path.join(VIDEOS_DIRECTORY, `${id}.mp4`);

  if (!fs.existsSync(videoPath)) {
    return new NextResponse(JSON.stringify({ error: 'Video not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return NextResponse.json({
    videoId: id,
    url: `/videos/${id}.mp4`,
    title: `Vidéo ${id}`,
  });
}
