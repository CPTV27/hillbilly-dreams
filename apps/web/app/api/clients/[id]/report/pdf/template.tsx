// apps/web/app/api/clients/[id]/report/pdf/template.tsx
// Branded PDF report template using @react-pdf/renderer
// Design: Gold accent, Playfair Display headers, DSD footer

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Brand colors
const GOLD = '#c8943e';
const DARK = '#1a1816';
const SURFACE = '#231f1c';
const TEXT_PRIMARY = '#f0ebe0';
const TEXT_MUTED = '#9d968a';
const WHITE = '#ffffff';
const LIGHT_BG = '#faf9f6';
const BORDER = '#e5e2dc';
const TEXT_DARK = '#2a2520';

const styles = StyleSheet.create({
  page: {
    padding: 48,
    backgroundColor: WHITE,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: TEXT_DARK,
  },
  // Header
  headerBar: {
    backgroundColor: DARK,
    padding: 24,
    marginBottom: 24,
    borderRadius: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: GOLD,
    marginBottom: 4,
  },
  headerSub: {
    fontSize: 11,
    color: TEXT_MUTED,
    letterSpacing: 0.5,
  },
  headerPeriod: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_PRIMARY,
    marginTop: 12,
  },
  // Metrics grid
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    backgroundColor: LIGHT_BG,
    border: `1 solid ${BORDER}`,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_DARK,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_MUTED,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  // Summary
  summarySection: {
    backgroundColor: LIGHT_BG,
    padding: 20,
    borderRadius: 4,
    borderLeft: `3 solid ${GOLD}`,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: GOLD,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.7,
    color: TEXT_DARK,
  },
  // Tier info
  tierSection: {
    padding: 16,
    border: `1 solid ${BORDER}`,
    borderRadius: 4,
    marginBottom: 24,
  },
  tierTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_MUTED,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  tierText: {
    fontSize: 10,
    color: TEXT_DARK,
    lineHeight: 1.5,
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 32,
    left: 48,
    right: 48,
    borderTop: `1 solid ${BORDER}`,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 8,
    color: TEXT_MUTED,
  },
  footerBrand: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: GOLD,
  },
});

interface ReportProps {
  clientName: string;
  businessType: string;
  city: string;
  state: string;
  period: string;
  postsPublished: number;
  reviewCount: number;
  avgRating: number;
  reviewsResponded: number;
  summary: string;
  tier: string;
}

const TIER_LABELS: Record<string, string> = {
  'front-porch': 'Front Porch (Free)',
  'route': 'The Listing ($20/mo)',
  'river-room': 'The Works ($49/mo)',
  'blues-room': 'The Engine ($99/mo)',
};

const TIER_DESCRIPTIONS: Record<string, string> = {
  'front-porch': 'Your business is listed in the Deep South Directory with basic information.',
  'route': 'Your listing includes enhanced details, review monitoring, and monthly reports.',
  'river-room': 'Full service: social media management, AI-powered review responses, content creation, and detailed analytics.',
  'blues-room': 'The complete engine: everything in The Works plus custom campaigns, priority support, and revenue attribution tracking.',
};

export function MonthlyReportDocument(props: ReportProps) {
  const {
    clientName, businessType, city, state, period,
    postsPublished, reviewCount, avgRating, reviewsResponded,
    summary, tier,
  } = props;

  const generatedDate = new Date().toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.headerBar}>
          <Text style={styles.headerTitle}>{clientName}</Text>
          <Text style={styles.headerSub}>
            {businessType} &bull; {city}, {state}
          </Text>
          <Text style={styles.headerPeriod}>
            Monthly Report &mdash; {period}
          </Text>
        </View>

        {/* Metrics */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{postsPublished}</Text>
            <Text style={styles.metricLabel}>Posts Published</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{reviewCount}</Text>
            <Text style={styles.metricLabel}>New Reviews</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{avgRating > 0 ? avgRating.toFixed(1) : 'N/A'}</Text>
            <Text style={styles.metricLabel}>Avg Rating</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{reviewsResponded}</Text>
            <Text style={styles.metricLabel}>Responded</Text>
          </View>
        </View>

        {/* AI Summary */}
        {summary ? (
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Monthly Summary</Text>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        ) : null}

        {/* Tier Info */}
        <View style={styles.tierSection}>
          <Text style={styles.tierTitle}>Your Plan</Text>
          <Text style={[styles.tierText, { fontFamily: 'Helvetica-Bold', marginBottom: 4 }]}>
            {TIER_LABELS[tier] || tier}
          </Text>
          <Text style={styles.tierText}>
            {TIER_DESCRIPTIONS[tier] || 'Contact us to learn about available plans.'}
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Generated {generatedDate}
          </Text>
          <Text style={styles.footerBrand}>
            Powered by Deep South Directory
          </Text>
        </View>
      </Page>
    </Document>
  );
}
