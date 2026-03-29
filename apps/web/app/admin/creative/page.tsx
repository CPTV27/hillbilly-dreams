'use client';

import { useState } from 'react';
import { ImageTab } from './ImageTab';
import { VideoTab } from './VideoTab';
import { AudioTab } from './AudioTab';
import { TextTab } from './TextTab';
import { UploadTab } from './UploadTab';
import { BrowseTab } from './BrowseTab';

const TABS = [
  { id: 'image', label: 'Image', icon: 'I', desc: 'Posters, illustrations, graphics, enhancement' },
  { id: 'video', label: 'Video', icon: 'V', desc: 'Promo clips, ambient loops, social reels' },
  { id: 'audio', label: 'Audio', icon: 'A', desc: 'Voice, music, radio promos, station IDs' },
  { id: 'text', label: 'Text', icon: 'T', desc: 'Articles, social posts, scripts, reviews' },
  { id: 'upload', label: 'Upload', icon: 'U', desc: 'Files, photos, documents' },
  { id: 'browse', label: 'Browse', icon: 'B', desc: 'All assets, search and filter' },
] as const;

type TabId = typeof TABS[number]['id'];

export default function CreativeHubPage() {
  const [activeTab, setActiveTab] = useState<TabId>('image');
  const [quality, setQuality] = useState<'draft' | 'premium'>('draft');

  return (
    <>
      <div className="ch">
        {/* Header */}
        <div className="ch-header">
          <div>
            <h1 className="ch-title">Creative Hub</h1>
            <p className="ch-sub">Make anything. Image, video, audio, text — all powered by Vertex AI.</p>
          </div>
          <div className="ch-quality">
            <button
              className={`ch-quality__btn ${quality === 'draft' ? 'ch-quality__btn--active' : ''}`}
              onClick={() => setQuality('draft')}
            >
              Draft
            </button>
            <button
              className={`ch-quality__btn ${quality === 'premium' ? 'ch-quality__btn--active' : ''}`}
              onClick={() => setQuality('premium')}
            >
              Premium
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="ch-tabs">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`ch-tab ${activeTab === tab.id ? 'ch-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="ch-tab__icon">{tab.icon}</span>
              <span className="ch-tab__label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="ch-content">
          {activeTab === 'image' && <ImageTab quality={quality} />}
          {activeTab === 'video' && <VideoTab quality={quality} />}
          {activeTab === 'audio' && <AudioTab quality={quality} />}
          {activeTab === 'text' && <TextTab quality={quality} />}
          {activeTab === 'upload' && <UploadTab />}
          {activeTab === 'browse' && <BrowseTab />}
        </div>
      </div>

      <style>{`
        .ch { max-width: 1100px; margin: 0 auto; }

        .ch-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem; }
        .ch-title { font-size: 1.5rem; font-weight: 800; color: var(--text, #e8e0d4); margin: 0; }
        .ch-sub { font-size: 0.8rem; color: var(--text-muted, #8a8074); margin: 0.25rem 0 0; }

        .ch-quality { display: flex; border: 1px solid #2a2520; border-radius: 8px; overflow: hidden; }
        .ch-quality__btn { padding: 6px 16px; background: transparent; border: none; color: #6a6560; font-size: 0.75rem; font-weight: 700; cursor: pointer; letter-spacing: 0.05em; }
        .ch-quality__btn--active { background: #c8943e; color: #0f0f0d; }

        .ch-tabs { display: flex; gap: 0.25rem; margin-bottom: 1.5rem; border-bottom: 1px solid #2a2520; padding-bottom: 0; }
        .ch-tab { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1rem; background: transparent; border: none; border-bottom: 2px solid transparent; color: #6a6560; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.15s; }
        .ch-tab:hover { color: #8a8074; }
        .ch-tab--active { color: #c8943e; border-bottom-color: #c8943e; }
        .ch-tab__icon { font-weight: 800; font-size: 0.7rem; width: 22px; height: 22px; border-radius: 4px; display: flex; align-items: center; justify-content: center; background: rgba(200,148,62,0.08); }
        .ch-tab--active .ch-tab__icon { background: rgba(200,148,62,0.2); color: #c8943e; }

        .ch-content { min-height: 400px; }

        /* Shared component styles */
        .ch-section { margin-bottom: 2rem; }
        .ch-section-label { font-size: 0.65rem; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #6a6560; margin-bottom: 0.75rem; }

        .ch-presets { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
        .ch-preset { padding: 8px 16px; background: #1a1816; border: 1px solid #2a2520; border-radius: 8px; color: #8a8074; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.15s; }
        .ch-preset:hover { border-color: #c8943e40; color: #e8e0d4; }
        .ch-preset--active { background: rgba(200,148,62,0.1); border-color: #c8943e; color: #c8943e; }

        .ch-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem; }
        .ch-pill { padding: 6px 14px; background: transparent; border: 1px solid #2a2520; border-radius: 999px; color: #6a6560; font-size: 0.7rem; font-weight: 700; cursor: pointer; transition: all 0.15s; }
        .ch-pill:hover { border-color: #c8943e40; color: #8a8074; }
        .ch-pill--active { background: rgba(200,148,62,0.1); border-color: #c8943e; color: #c8943e; }

        .ch-prompt { width: 100%; padding: 0.75rem 1rem; background: #1a1816; border: 1px solid #2a2520; border-radius: 10px; color: #e8e0d4; font-size: 0.85rem; font-family: inherit; resize: vertical; margin-bottom: 1rem; box-sizing: border-box; }
        .ch-prompt:focus { outline: none; border-color: #c8943e; }

        .ch-generate { padding: 10px 24px; background: #c8943e; color: #0f0f0d; border: none; border-radius: 8px; font-size: 0.8rem; font-weight: 700; cursor: pointer; transition: all 0.15s; }
        .ch-generate:hover { box-shadow: 0 4px 20px rgba(200,148,62,0.3); }
        .ch-generate:disabled { opacity: 0.4; cursor: default; }

        .ch-preview { margin-top: 1.5rem; background: #1a1816; border: 1px solid #2a2520; border-radius: 10px; padding: 1.5rem; }
        .ch-preview img, .ch-preview video { width: 100%; max-width: 600px; border-radius: 8px; }

        .ch-external { display: inline-flex; align-items: center; gap: 0.5rem; padding: 8px 16px; background: transparent; border: 1px solid #2a2520; border-radius: 8px; color: #8a8074; font-size: 0.75rem; font-weight: 600; text-decoration: none; transition: all 0.15s; }
        .ch-external:hover { border-color: #c8943e; color: #c8943e; }
      `}</style>
    </>
  );
}
