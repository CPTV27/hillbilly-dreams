export async function GET(req: Request) {
  const asanaToken = process.env.ASANA_PAT;
  if (!asanaToken) return new Response(JSON.stringify({ error: 'Missing ASANA_PAT' }), { status: 500 });
  
  try {
    const res = await fetch('https://app.asana.com/api/1.0/tasks?workspace=YOUR_WORKSPACE_ID&assignee=me', {
      headers: { Authorization: `Bearer ${asanaToken}` }
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to fetch Asana tasks' }), { status: 500 });
  }
}

export async function POST(req: Request) {
  const asanaToken = process.env.ASANA_PAT;
  if (!asanaToken) return new Response(JSON.stringify({ error: 'Missing ASANA_PAT' }), { status: 500 });

  try {
    const body = await req.json();
    const res = await fetch('https://app.asana.com/api/1.0/tasks', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${asanaToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: body })
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to create Asana task' }), { status: 500 });
  }
}

export async function PUT(req: Request) {
  const asanaToken = process.env.ASANA_PAT;
  if (!asanaToken) return new Response(JSON.stringify({ error: 'Missing ASANA_PAT' }), { status: 500 });

  try {
    const { taskId, ...body } = await req.json();
    if (!taskId) return new Response(JSON.stringify({ error: 'Missing taskId' }), { status: 400 });

    const res = await fetch(`https://app.asana.com/api/1.0/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${asanaToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: body })
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to update Asana task' }), { status: 500 });
  }
}
