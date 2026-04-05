// lib/asana-client.ts
// Server-side Asana API client for vendor portal + SMS bridge
// Uses ASANA_PAT env var (Personal Access Token)

const ASANA_BASE = 'https://app.asana.com/api/1.0';

function getToken(): string {
  const token = process.env.ASANA_PAT || process.env.ASANA_ACCESS_TOKEN;
  if (!token) throw new Error('ASANA_PAT or ASANA_ACCESS_TOKEN not set');
  return token;
}

async function asanaFetch(path: string, options: RequestInit = {}): Promise<any> {
  const res = await fetch(`${ASANA_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Asana ${res.status}: ${body}`);
  }
  return res.json();
}

export interface AsanaTask {
  gid: string;
  name: string;
  notes: string;
  completed: boolean;
  due_on: string | null;
  assignee: { gid: string; name: string } | null;
}

export interface AsanaProject {
  gid: string;
  name: string;
  notes: string;
}

/** Get project details */
export async function getProject(projectId: string): Promise<AsanaProject> {
  const data = await asanaFetch(`/projects/${projectId}?opt_fields=name,notes`);
  return data.data;
}

/** Get all tasks in a project */
export async function getProjectTasks(projectId: string): Promise<AsanaTask[]> {
  const data = await asanaFetch(
    `/projects/${projectId}/tasks?opt_fields=name,notes,completed,due_on,assignee.name&limit=100`
  );
  return data.data;
}

/** Add a comment (story) to a task */
export async function addTaskComment(taskId: string, text: string): Promise<void> {
  await asanaFetch(`/tasks/${taskId}/stories`, {
    method: 'POST',
    body: JSON.stringify({ data: { text } }),
  });
}

/** Create a task in a project */
export async function createTask(projectId: string, name: string, notes?: string): Promise<string> {
  const data = await asanaFetch('/tasks', {
    method: 'POST',
    body: JSON.stringify({
      data: {
        projects: [projectId],
        name,
        notes: notes || '',
      },
    }),
  });
  return data.data.gid;
}

/** Complete a task */
export async function completeTask(taskId: string): Promise<void> {
  await asanaFetch(`/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify({ data: { completed: true } }),
  });
}

/** Re-open a completed task (e.g. GitHub issue reopened) */
export async function uncompleteTask(taskId: string): Promise<void> {
  await asanaFetch(`/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify({ data: { completed: false } }),
  });
}
