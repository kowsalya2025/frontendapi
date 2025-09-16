// src/components/ProjectList.jsx
import { useEffect, useState } from 'react';
import api from '../api/axios';

function ProjectList(){
  const [projects, setProjects] = useState([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const [statusFilter,setStatusFilter]=useState('');
  const [priorityFilter,setPriorityFilter]=useState('');

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    api.get('projects/', {
      params: {
        status: statusFilter || undefined,
        priority: priorityFilter || undefined,
      },
      signal: controller.signal, // cancelable
    })
    .then(res => setProjects(res.data))
    .catch(err => {
      if (err.name === 'CanceledError') return; // request was cancelled
      setError(err.response?.data || err.message);
    })
    .finally(()=>setLoading(false));

    return () => controller.abort();
  }, [statusFilter, priorityFilter]);

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <select onChange={e=>setStatusFilter(e.target.value)} value={statusFilter} className="border p-2">
          <option value="">All status</option>
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="complete">Complete</option>
        </select>
        <select onChange={e=>setPriorityFilter(e.target.value)} value={priorityFilter} className="border p-2">
          <option value="">All priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {loading && <div>Loading…</div>}
      {error && <div className="text-red-600">Error: {JSON.stringify(error)}</div>}
      <ul>
        {projects.map(p => (
          <li key={p.id} className="border p-2 mb-2">
            <div className="flex justify-between">
              <div>
                <div className="font-bold">{p.title}</div>
                <div className="text-sm">{p.description}</div>
                <div className="text-xs">Status: {p.status} • Priority: {p.priority}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ProjectList;
