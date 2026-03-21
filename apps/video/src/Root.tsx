import React from 'react';
import { Composition } from 'remotion';
import { EquationReveal } from './compositions/EquationReveal';
import { StatCounter } from './compositions/StatCounter';
import { QuoteCard } from './compositions/QuoteCard';
import { STORIES, STATS, QUOTES } from './data/equations';
import { FORMATS } from './styles/theme';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ── Story videos — both formats ── */}
      {STORIES.map((story) => (
        <React.Fragment key={story.id}>
          <Composition
            id={`eq-${story.id}-yt`}
            component={EquationReveal as unknown as React.FC<Record<string, unknown>>}
            defaultProps={{ story }}
            width={FORMATS.youtube.width}
            height={FORMATS.youtube.height}
            fps={FORMATS.youtube.fps}
            durationInFrames={FORMATS.youtube.durationSec * FORMATS.youtube.fps}
          />
          <Composition
            id={`eq-${story.id}-shorts`}
            component={EquationReveal as unknown as React.FC<Record<string, unknown>>}
            defaultProps={{ story }}
            width={FORMATS.shorts.width}
            height={FORMATS.shorts.height}
            fps={FORMATS.shorts.fps}
            durationInFrames={FORMATS.shorts.durationSec * FORMATS.shorts.fps}
          />
        </React.Fragment>
      ))}

      {/* ── Stat counter videos ── */}
      {STATS.map((stat) => (
        <React.Fragment key={stat.id}>
          <Composition
            id={`${stat.id}-yt`}
            component={StatCounter as unknown as React.FC<Record<string, unknown>>}
            defaultProps={{
              target: stat.target,
              prefix: stat.prefix,
              suffix: stat.suffix,
              label: stat.label,
              source: stat.source,
              decimals: stat.decimals ?? 0,
            }}
            width={FORMATS.youtube.width}
            height={FORMATS.youtube.height}
            fps={FORMATS.youtube.fps}
            durationInFrames={FORMATS.youtube.durationSec * FORMATS.youtube.fps}
          />
          <Composition
            id={`${stat.id}-shorts`}
            component={StatCounter as unknown as React.FC<Record<string, unknown>>}
            defaultProps={{
              target: stat.target,
              prefix: stat.prefix,
              suffix: stat.suffix,
              label: stat.label,
              source: stat.source,
              decimals: stat.decimals ?? 0,
            }}
            width={FORMATS.shorts.width}
            height={FORMATS.shorts.height}
            fps={FORMATS.shorts.fps}
            durationInFrames={FORMATS.shorts.durationSec * FORMATS.shorts.fps}
          />
        </React.Fragment>
      ))}

      {/* ── Quote card videos ── */}
      {QUOTES.map((q) => (
        <React.Fragment key={q.id}>
          <Composition
            id={`${q.id}-yt`}
            component={QuoteCard as unknown as React.FC<Record<string, unknown>>}
            defaultProps={{
              quote: q.quote,
              attribution: q.attribution,
              chapterLabel: q.chapterLabel,
            }}
            width={FORMATS.youtube.width}
            height={FORMATS.youtube.height}
            fps={FORMATS.youtube.fps}
            durationInFrames={FORMATS.youtube.durationSec * FORMATS.youtube.fps}
          />
          <Composition
            id={`${q.id}-shorts`}
            component={QuoteCard as unknown as React.FC<Record<string, unknown>>}
            defaultProps={{
              quote: q.quote,
              attribution: q.attribution,
              chapterLabel: q.chapterLabel,
            }}
            width={FORMATS.shorts.width}
            height={FORMATS.shorts.height}
            fps={FORMATS.shorts.fps}
            durationInFrames={FORMATS.shorts.durationSec * FORMATS.shorts.fps}
          />
        </React.Fragment>
      ))}
    </>
  );
};
