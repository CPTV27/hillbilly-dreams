"use client";

import React, { useEffect, useState, useRef } from 'react';
import styles from './AgentsPage.module.css';

type RegistryTool = {
  id: string;
  name: string;
  authClass: string;
  modelTier: string | null;
  schema: any;
};

type AgentAction = {
  id: string;
  agent: string;
  action: string;
  summary: string;
  domain: string;
  impact: string;
  createdAt: string;
};

export default function AdminAgentsPage() {
  const [tools, setTools] = useState<RegistryTool[]>([]);
  const [actions, setActions] = useState<AgentAction[]>([]);
  const [selectedTool, setSelectedTool] = useState<RegistryTool | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/admin/registry')
      .then(r => r.json())
      .then(d => {
        if (d.ok) setTools(d.tools);
      });
  }, []);

  const fetchActions = () => {
    fetch('/api/admin/agent-actions?limit=15')
      .then(r => r.json())
      .then(d => {
        if (d.actions) setActions(d.actions);
      });
  };

  useEffect(() => {
    fetchActions();
    const int = setInterval(fetchActions, 5000);
    return () => clearInterval(int);
  }, []);

  const handleExecute = async () => {
    if (!selectedTool) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: selectedTool.id,
          params: formData,
          includeTelemetry: true,
        })
      });
      const data = await res.json();
      
      if (!res.ok) {
        setResult({ _errorType: 'HTTP rejection', status: res.status, ...data });
      } else {
        setResult(data);
      }
      
      fetchActions(); // Immediate refresh
    } catch (e: any) {
      setResult({ _errorType: 'Network/Transport Error', message: e.message || 'Execution failed' });
    } finally {
      setLoading(false);
    }
  };

  const renderSchemaForm = (schema: any, parentKey = '') => {
    if (!schema || !schema.properties) return <p>No parameters required.</p>;
    const props = schema.properties;
    
    return (
      <div className={styles.formGrid}>
        {Object.keys(props).map(k => {
          const field = props[k];
          const isRequired = schema.required?.includes(k);
          const fullKey = parentKey ? `${parentKey}.${k}` : k;
          
          if (field.type === 'object') {
            return (
              <div key={fullKey} className={styles.nestedGroup}>
                <label className={styles.nestedLabel}>{fullKey}</label>
                {renderSchemaForm(field, fullKey)}
              </div>
            );
          }

          return (
            <div key={fullKey} className={styles.formGroup}>
              <label>
                {fullKey} {isRequired ? '*' : ''}
              </label>
              {(field.type === 'string' && !field.enum) && (
                <input 
                  type="text" 
                  value={formData[fullKey] || ''}
                  onChange={e => setFormData({...formData, [fullKey]: e.target.value})}
                  placeholder={field.description || ''}
                />
              )}
              {field.type === 'number' && (
                <input 
                  type="number" 
                  value={formData[fullKey] || ''}
                  onChange={e => setFormData({...formData, [fullKey]: Number(e.target.value)})}
                />
              )}
              {field.type === 'boolean' && (
                <input 
                  type="checkbox" 
                  checked={formData[fullKey] || false}
                  onChange={e => setFormData({...formData, [fullKey]: e.target.checked})}
                />
              )}
              {field.enum && (
                <select 
                  value={formData[fullKey] || ''}
                  onChange={e => setFormData({...formData, [fullKey]: e.target.value})}
                >
                  <option value="">Select...</option>
                  {field.enum.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Control Plane</h1>
        <p>Token Guard Fleet Command</p>
      </header>

      <div className={styles.layout}>
        <div className={styles.sidebar}>
          <h3>Registry Tools</h3>
          <ul className={styles.toolList}>
            {tools.map(tool => (
              <li 
                key={tool.id} 
                className={selectedTool?.id === tool.id ? styles.selected : ''}
                onClick={() => {
                  setSelectedTool(tool);
                  setFormData({});
                  setResult(null);
                }}
              >
                <strong>{tool.name}</strong>
                <span className={styles.tier}>{tool.modelTier || 'ROUTINE'}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.main}>
          {selectedTool ? (
            <div className={styles.formCard}>
              <h2>{selectedTool.name}</h2>
              <p className={styles.toolId}>{selectedTool.id} — {selectedTool.authClass}</p>

              <div className={styles.paramsBox}>
                {renderSchemaForm(selectedTool.schema)}
              </div>

              <div className={styles.actions}>
                <button 
                  onClick={handleExecute} 
                  disabled={loading}
                  className={styles.executeBtn}
                >
                  {loading ? 'Executing...' : 'Execute Tool'}
                </button>
              </div>

              {result && (
                <div className={styles.resultBox}>
                  <h4>Output</h4>
                  <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>Select a tool from the registry to execute.</p>
            </div>
          )}
        </div>

        <div className={styles.telemetryPanel}>
          <h3>Live Feed</h3>
          <div className={styles.feed}>
            {actions.map(action => (
              <div key={action.id} className={styles.feedItem}>
                <div className={styles.feedHeader}>
                  <span className={styles.feedAgent}>[{action.agent}]</span>
                  <span className={styles.feedDomain}>{action.domain}</span>
                </div>
                <div className={styles.feedSummary}>{action.action}: {action.summary}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
